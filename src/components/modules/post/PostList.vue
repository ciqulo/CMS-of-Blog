<template>
  <div v-loading="loading" element-loading-text="拼命加载中" ref="page">
    <div class="menu-bar">
      <el-date-picker v-model="timeRange" type="daterange" placeholder="选择日期范围">
      </el-date-picker>
      <el-select v-model="selectedCategory" placeholder="请选择分类">
        <el-option v-for="category in term.categories" :key="category.id" :value="category.name">
        </el-option>
      </el-select>
      <el-input class="menu-search" placeholder="请输入关键字搜索"></el-input>
      <el-button type="primary" @click="searchPost">搜索</el-button>
      <el-popover
        placement="top"
        width="160"
        trigger="click">
        <p>确定批量删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click.native.prevent="$refs.page.click()">取消</el-button>
          <el-button type="primary" size="mini" @click.native.prevent="deletePosts()">确定</el-button>
        </div>
        <el-button type="danger" slot="reference">批量删除</el-button>
      </el-popover>
    </div>
    <div class="content-state">
      <el-table :data="post.postList" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="author" label="作者">
        </el-table-column>
        <el-table-column prop="category" label="分类目录">
        </el-table-column>
        <el-table-column prop="tag" label="标签">
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
              <div style="text-align: right; margin: 0">
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
      <el-pagination v-if="post.total"
                     layout="prev, pager, next"
                     :page-size="post.pageSize"
                     :total="post.total"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {FETCH_POST_LIST, DELETE_POST, FETCH_CATEGORY, UPDATE_CURRENT, DELETE_POSTS} from '../../../store/actionTypes'

  export default {
    name: 'hello',
    data() {
      return {
        loading: true,
        timeRange: '',
        multipleSelection: '',
        selectedCategory: '',
        searchVal: ''
      }
    },
    async created() {
      await this.FETCH_CATEGORY()
      await this.FETCH_POST_LIST()
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
        await this.UPDATE_CURRENT(val)
        this.loading = false
      },
      async deletePost(id) {
        if (this.loading) return
        this.$refs.page.click()
        this.loading = true
        const code = await this.DELETE_POST(id)
        this.loading = false
        if (code === 200) {
          this.$notify.success({title: '删除成功'})
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
      searchPost() {

      },
      ...mapActions([FETCH_POST_LIST, DELETE_POST, DELETE_POSTS, FETCH_CATEGORY, UPDATE_CURRENT]),
    },
    components: {},
    computed: {
      ...mapState(['post', 'term'])
    }
  }
</script>
<style lang="scss">
  .menu-bar {
    margin: 10px 0 0 10px;
  }

  .content-state {
    margin-top: 10px;
  }

  .menu-search {
    width: 23%;
    margin-top: 10px;
  }

  .paging {
    float: right;
    margin-top: 10px;
  }
</style>

