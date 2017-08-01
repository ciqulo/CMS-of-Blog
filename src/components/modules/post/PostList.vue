<template>
  <div>
    <el-table :data="testData" @selection-change="handleSelectionChange">
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
</template>

<script>

  export default {
    name: 'hello',
    data () {
      return {
        testData: [{
          title: 'CMS',
          author: 'ycwalker',
          classification: '技术',
          tag: 'vue',
          date: '2017-08-01'
        }],
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    components: {}
  }
</script>
