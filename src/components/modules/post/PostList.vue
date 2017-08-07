<template>
  <div>
    <div class="menu-bar">
      <el-date-picker v-model="timeRange" type="daterange" placeholder="选择日期范围">
      </el-date-picker>
      <el-select v-model="value" placeholder="请选择分类">
        <el-option v-for="item in dataList.optionsList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="content-state">
      <el-table :data="dataList.postList" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="author" label="作者">
        </el-table-column>
        <el-table-column prop="classification" label="分类目录">
        </el-table-column>
        <el-table-column prop="tag" label="标签">
        </el-table-column>
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'hello',
    data() {
      return {
        timeRange: '',
        testData: [],
        options: [],
        value: ''
      }
    },
    created() {
      this.getPost()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      async getPost() {
        await this.$store.dispatch('GET_POST_LIST')
      }
    },
    components: {},
    computed: {
      ...mapState({
        dataList: state => state.post.dataList
      })
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
</style>

