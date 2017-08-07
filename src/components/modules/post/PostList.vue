<template>
  <div>
    <div class="menu-bar">
      <el-date-picker v-model="timeRange" type="daterange" placeholder="选择日期范围">
      </el-date-picker>
      <el-select v-model="value" placeholder="请选择分类">
        <el-option v-for="category in POST_CATEGORIES" :key="category" :label="category" :value="category">
        </el-option>
      </el-select>
    </div>
    <div class="content-state">
      <el-table :data="POST_LISTS" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="postTitle" label="标题">
        </el-table-column>
        <el-table-column prop="postAuthor" label="作者">
        </el-table-column>
        <el-table-column prop="postCategory" label="分类目录">
        </el-table-column>
        <el-table-column prop="postTag" label="标签">
        </el-table-column>
        <el-table-column prop="postDate" label="日期">
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
  import {mapActions, mapGetters} from 'vuex'
  import {GET_POST_LIST} from '../../../store/actionTypes'
  import {POST_LISTS, POST_CATEGORIES} from '../../../store/getterNames'

  export default {
    name: 'hello',
    data() {
      return {
        timeRange: '',
        value: ''
      }
    },
    async created() {
      const {code, message} = await this.GET_POST_LIST() || {}
      if (code != 200) this.$message.error({message})
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      ...mapActions([GET_POST_LIST]),
    },
    components: {},
    computed: {
      ...mapGetters([POST_LISTS, POST_CATEGORIES])
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

