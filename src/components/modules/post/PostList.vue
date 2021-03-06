<template>
  <div v-loading="loading" element-loading-text="拼命加载中" class="post-root" ref="page">
    <div class="menu-bar">
      <el-date-picker
        v-model="start"
        type="datetime"
        size="small"
        placeholder="选择时间起点">
      </el-date-picker>
      <el-date-picker
        v-model="end"
        size="small"
        type="datetime"
        placeholder="选择时间终点">
      </el-date-picker>
      <!--<el-select v-model="categories" multiple placeholder="请选择分类" size="small">-->
        <!--<el-option v-for="category in term.categories" :key="category.id" :value="category.id" :label="category.name">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-select v-model="tags" multiple placeholder="请选择标签" size="small">
        <el-option v-for="tag in term.tags" :key="tag.id" :value="tag.id" :label="tag.name">
        </el-option>
      </el-select>
      <el-input class="menu-search" v-model="title" placeholder="标题" size="small"></el-input>
      <el-button size="small" @click="searchPosts">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
      <el-popover
        placement="top"
        width="160"
        trigger="click">
        <p>确定批量删除吗？</p>
        <div class="popover">
          <el-button size="mini" type="text" @click.native.prevent="$refs.page.click()">取消</el-button>
          <el-button type="primary" size="mini" @click.native.prevent="deletePosts()">确定</el-button>
        </div>
        <el-button type="danger" v-if="multipleSelection" slot="reference">批量删除</el-button>
      </el-popover>
    </div>
    <div class="content-state" style="padding: 10px">
      <el-table :data="post.postList" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="author" label="作者">
        </el-table-column>
        <!--<el-table-column label="分类目录">-->
          <!--<template scope="scope">-->
            <!--<div>{{(scope.row.categories || []).join(' , ')}}</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="标签">
          <template scope="scope">
            <div>{{(scope.row.tags || []).join(' , ')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small">编辑</el-button>
            <el-popover
              placement="top"
              width="160"
              trigger="click">
              <p>确定删除吗？</p>
              <div class="popover">
                <el-button size="mini" type="text" @click.native.prevent="$refs.page.click()">取消</el-button>
                <el-button type="primary" size="mini" @click="deletePost(scope.row.id)">确定</el-button>
              </div>
              <el-button size="small" type="danger" slot="reference">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="post.current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="post.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="post.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import moment from 'moment'
  import {
    FETCH_POST_LIST,
    FETCH_TAGS,
    DELETE_POST,
    FETCH_CATEGORY,
    UPDATE_PAGINATION,
    DELETE_POSTS
  } from '../../../store/actionTypes'
  import {UPDATE_QUERY} from '../../../store/mutationTypes'

  export default {
    data() {
      return {
        loading: true,
        multipleSelection: '',
      }
    },
    async created() {
      await this.FETCH_CATEGORY()
      await this.FETCH_POST_LIST()
      await this.FETCH_TAGS()
      this.loading = false
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      async fetchPostList() {
        this.loading = true
        await this.FETCH_POST_LIST()
        this.loading = false
      },
      async handleCurrentChange(val) {
        this.loading = true
        await this.UPDATE_PAGINATION({current: val})
        this.loading = false
      },
      async handleSizeChange(val) {
        this.loading = true
        await this.UPDATE_PAGINATION({pageSize: val})
        this.loading = false
      },
      async deletePost(id) {
        if (this.loading) return
        this.$refs.page.click()
        const code = await this.DELETE_POST(id)
        if (code === 200) {
          this.$notify.success({title: '删除成功', duration: 500})
          this.fetchPostList()
        }
      },
      async deletePosts() {
        if (this.loading) return
        this.$refs.page.click()
        this.loading = true
        const ids = this.multipleSelection.map(row => row.id)
        const code = await this.DELETE_POSTS(ids)
        this.loading = false
        if (code === 200) {
          this.$notify.success({title: '删除成功'})
          this.fetchPostList()
        }
      },
      async searchPosts() {
        this.loading = true
        await this.FETCH_POST_LIST()
        this.loading = false
      },
      reset() {
        this.UPDATE_QUERY({key: 'tags', value: []})
        this.UPDATE_QUERY({key: 'categories', value: []})
        this.UPDATE_QUERY({key: 'start', value: ''})
        this.UPDATE_QUERY({key: 'end', value: ''})
        this.UPDATE_QUERY({key: 'title', value: ''})
        this.fetchPostList()
      },
      ...mapActions([FETCH_POST_LIST, FETCH_TAGS, DELETE_POST, DELETE_POSTS, FETCH_CATEGORY, UPDATE_PAGINATION]),
      ...mapMutations([UPDATE_QUERY])
    },
    components: {},
    computed: {
      ...mapState(['post', 'term']),
      tags: {
        get() {
          return this.post.tags
        },
        set(value) {
          this.UPDATE_QUERY({key: 'tags', value})
        }
      },
      categories: {
        get() {
          return this.post.categories
        },
        set(value) {
          this.UPDATE_QUERY({key: 'categories', value})
        }
      },
      start: {
        get() {
          return this.post.start
        },
        set(value) {
          value = moment(value).format('YYYY-MM-DD HH:hh:ss')
          this.UPDATE_QUERY({key: 'start', value})
        }
      },
      end: {
        get() {
          return this.post.end
        },
        set(value) {
          value = moment(value).format('YYYY-MM-DD HH:hh:ss')
          this.UPDATE_QUERY({key: 'end', value})
        }
      },
      title: {
        get() {
          return this.post.title
        },
        set(value) {
          this.UPDATE_QUERY({key: 'title', value})
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .post-root {
    height: 100%;
  }

  .menu-bar {
    margin: 10px 0 0 10px;
  }

  .content-state {
    margin-top: 10px;
  }

  .menu-search {
    width: 15%;
    margin-top: 10px;
  }

  .paging {
    float: right;
    margin-top: 10px;
  }

  .popover {
    text-align: right;
    margin: 0
  }
</style>

