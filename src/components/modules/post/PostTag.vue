<template>
  <div v-loading="loading" element-loading-text="拼命加载中" ref="page">
    <div class="menu-bar">
      <el-button @click="openDialogAddTags" type="primary">新增标签</el-button>
    </div>
    <div class="content-state">
      <el-table :data="term.tags">
        <el-table-column prop="name" label="标签"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary" size="small"
                       @click="openUpdate(scope.row.id,scope.row.name,scope.row.description)">编辑
            </el-button>
            <el-popover
              placement="top"
              width="160"
              trigger="click">
              <p>确定删除吗？</p>
              <div class="popover">
                <el-button size="mini" type="text" @click.native.prevent="$refs.page.click()">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteTag(scope.row.id)">确定</el-button>
              </div>
              <el-button size="small" type="danger" slot="reference">删除</el-button>
            </el-popover>
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
    <div>
      <el-dialog title="修改标签" :visible.sync="dialogUpdateTags">
        <el-form :model="updateTags">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="updateTags.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="updateTags.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateTags = false">取 消</el-button>
          <el-button type="primary" @click="updateTag">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {FETCH_TAGS, CREATE_TAGS, DELETE_TAGS, UPDATE_TAGS} from '../../../store/actionTypes'
  export default {
    data() {
      return {
        dialogAddTags: false,
        dialogUpdateTags: false,
        formLabelWidth: '40px',
        loading: true,
        addTags: {
          name: '',
          description: ''
        },
        updateTags: {
          name: '',
          description: '',
          id: ''
        }
      }
    },
    async created(){
      await this.FETCH_TAGS()
      this.loading = false
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
      async deleteTag(id){
        this.loading = true
        this.$refs.page.click()
        const code = await this.DELETE_TAGS({id: id})
        this.loading = false
        if (code === 200) {
          this.$notify.success({title: '删除成功', duration: 500})
          await this.FETCH_TAGS()
        }
      },
      openUpdate(id, name, desc){
        this.dialogUpdateTags = true
        this.updateTags.id = id
        this.updateTags.name = name
        this.updateTags.description = desc
      },
      openDialogAddTags(){
        this.addTags.name = ''
        this.addTags.description = ''
        this.dialogAddTags = true
      },
      async updateTag(){
        const payload = this.updateTags
        const code = await this.UPDATE_TAGS(payload)
        this.dialogUpdateTags = false
        if (code === 200) {
          this.$notify.success({title: '修改成功', duration: 500})
          await this.FETCH_TAGS()
        }
      },
      ...mapActions([FETCH_TAGS, CREATE_TAGS, DELETE_TAGS, UPDATE_TAGS])
    },
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
