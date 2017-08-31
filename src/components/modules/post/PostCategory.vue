<template>
  <div class="main-state">
    <div class="tree-state">
      <el-button class="create-btn" type="primary">新建父标签</el-button>
      <el-tree
        class="filter-tree"
        :data='categoryList'
        default-expand-all
        @node-click="handleNodeClick"
        ref="tree2">
      </el-tree>
    </div>
    <div class="info_state"></div>
  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {FETCH_CATEGORY} from '../../../store/actionTypes'
  export default {
    data () {
      return {
        categoryList: [],
      }
    },
    mounted(){
      this.fetchCategory()
    },
    methods: {
      async fetchCategory(){
        const {code, data} = await this.FETCH_CATEGORY()
        console.log(data)
        if (code === 200) return this.categoryList = data
        console.log(data)
      },
      handleNodeClick(data){
        console.log(data)
      },
      createCategory(){

      },
      ...mapActions([FETCH_CATEGORY])
    },
    components: {},
    computed: {
      ...mapState(['term'])
    }
  }
</script>
<style lang="scss" scoped>
  .main-state {
    width: 100%;
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    .tree-state {
      flex: 1;
      height: 100%;
      border-right: 1px solid #e4e8f1;
    }
    .info_state {
      flex: 2;
    }
  }

  .filter-tree {
    border: none;
  }

  .create-btn {
    margin: 10px 0 0 10px;
  }
</style>
