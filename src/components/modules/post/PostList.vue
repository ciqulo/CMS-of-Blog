<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="menu-bar">
      <el-date-picker v-model="timeRange" type="daterange" placeholder="选择日期范围">
      </el-date-picker>
      <el-select v-model="value" placeholder="请选择分类">
        <el-option v-for="category in TERM_CATEGORY_LIST" :key="category.id"  :value="category.name">
        </el-option>
      </el-select>
      <el-input class="menu-search" placeholder="请输入关键字搜索"></el-input>
      <el-button type="primary" @click="searchPoist">搜索</el-button>
      <el-button type="danger" v-if="multipleSelection.length > 0" @click="batchDelePost">批量删除</el-button>
    </div>
    <div class="content-state">
      <el-table :data="POST_LISTS" @selection-change="handleSelectionChange">
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
            <el-button size="small" type="danger" @click="deletePost(scope.$index,POST_LISTS)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination v-if="total" layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { GET_POST_LIST, DELETE_POST_LIST, GET_CATEGORY_LIST } from '../../../store/actionTypes'
import { POST_LISTS, POST_CATEGORIES, TERM_CATEGORY_LIST } from '../../../store/getterNames'

export default {
  name: 'hello',
  data() {
    return {
      timeRange: '',
      value: '',
      multipleSelection: '',
      loading: true,
      isAableDelete: true,
      pageSize: '',
      total: '',
      searchVal: ''
    }
  },
  beforeCreated() {
    Loading.service();
  },
  created() {
    this.getInfo()
    this.getCategory()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.loading = true
      const payload = { pageSize: 10, current: val }
      this.getInfo(payload)
    },
    async getInfo(payload) {
      const { pageSize, total, code, message } = await this.GET_POST_LIST(payload) || {}
      if (code !== 200) return this.$message.error({ message })
      this.total = total
      this.pageSize = pageSize
      this.loading = false
    },
    async deletePost(index, post) {
      if (this.isAableDelete) {
        this.isAableDelete = false
        const { code } = await this.DELETE_POST_LIST([post[index].id])
        this.isAableDelete = true
        if (code === 200) {
          post.splice(index, 1)
          this.$message({ message: '删除成功', type: 'success' })
        }
      }
    },
    async getCategory() {
      const { code, data, message } = await this.GET_CATEGORY_LIST()
    },
    async batchDelePost() {
      const list = this.multipleSelection
      console.log(list)
      let arrayId = []
      list.forEach(item => { arrayId.push(item.id) })
      const { code } = await this.DELETE_POST_LIST(arrayId)
      if (code === 200) {
        this.getInfo()
        this.$message({ message: '删除成功', type: 'success' })
      }
    },
    searchPoist() {

    },
    ...mapActions([GET_POST_LIST, DELETE_POST_LIST, GET_CATEGORY_LIST]),
  },
  components: {},
  computed: {
    ...mapGetters([POST_LISTS, POST_CATEGORIES,TERM_CATEGORY_LIST])
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

