<template>
  <div>
    <div class="menu-bar">
      <el-button @click="dialogAddTags = true" type="primary">新增标签</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <div class="content-state">
      <el-table
        :data="term.tags"
        style="width: 100%">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标签">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="新增标签" :visible.sync="dialogAddTags">
        <el-form :model="addTags">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addTags.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="addTags.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddTags = false">取 消</el-button>
          <el-button type="primary" @click="createTags">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {FETCH_TAGS, CREATE_TAGS} from '../../../store/actionTypes'
  export default {
    data() {
      return {
        dialogAddTags: false,
        formLabelWidth: '40px',
        addTags: {
          name: '',
          description: ''
        }
      }
    },
    async created(){
      await this.FETCH_TAGS()
    },
    methods: {
      async createTags(){
        const payload = this.addTags
        const code = await this.CREATE_TAGS(payload)
        if (code === 200) {
          this.$notify.success({title: '新增成功', duration: 500})
          await this.FETCH_TAGS()
          this.dialogAddTags = false
        }
      },
      ...mapActions([FETCH_TAGS, CREATE_TAGS])
    },
    components: {},
    computed: {
      ...mapState(['term'])
    }
  }
</script>
<style lang="scss" scoped>
  .menu-bar {
    margin: 10px 0 0 10px;
  }

  .content-state {
    margin-top: 10px;
  }
</style>
