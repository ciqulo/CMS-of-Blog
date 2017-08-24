<template>
  <div class="edit-content">
    <el-input class="edit-title" v-model="title" placeholder="标题：夕阳下的奔跑,那是我逝去的青春"></el-input>
    <div class="classification">
      <el-select v-model="categoryValue" multiple placeholder="请选择分类">
        <el-option v-for="type in term.categories" :key="type.id" :value="type.id"
                   :label="type.name">
        </el-option>
      </el-select>
      <el-select v-model="tagsValue" multiple placeholder="请选择标签">
        <el-option v-for="tags in term.tags" :key="tags.id" :value="tags.id"
                   :label="tags.name">
        </el-option>
      </el-select>
    </div>
    <div class="edit-state">
      <div class="edit-tab">
        <textarea :value="input" @input="update"></textarea>
      </div>
      <div class="show-tab" v-html="compiledMarkdown" v-highlight></div>
    </div>
    <div class="edit-submit">
      <el-button type="primary" @click="createPost">发布文章</el-button>
    </div>

  </div>
</template>

<script>
  import lodash from 'lodash'
  import marked from 'marked'
  import {mapState, mapActions} from 'vuex'
  import {FETCH_CATEGORY, FETCH_TAGS, CREATE_POST} from '../../../store/actionTypes'
  export default {
    name: 'hello',
    data() {
      return {
        input: '`PHP is the best language in the world`',
        categoryValue: '',
        tagsValue: '',
        title: '',
      }
    },
    async created() {
      await this.FETCH_CATEGORY()
      await this.FETCH_TAGS()
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, {sanitize: true})
      },
      ...mapState(['term'])
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300),
      async createPost() {
        const date = new Date()
        const payload = {
          title: this.title, content: this.input, tags: this.tagsValue, categories: this.categoryValue, data: date
        }
        const code = await this.CREATE_POST(payload)
        if (code === 200) this.$notify.success({title: '发表成功'})
      },
      ...mapActions([FETCH_CATEGORY, FETCH_TAGS, CREATE_POST])
    },
  }
</script>
<style lang="scss">
  .edit-content {
    position: absolute;
    top: 10px;
    bottom: 0;
    width: 96%;
    margin: 10px 0 0 2%;
  }

  .edit-state {
    position: absolute;
    top: 80px;
    bottom: 100px;
    display: flex;
    margin: 10px 0 0 0;
    border-radius: 3px;
    width: 100%;
    div {
      flex: 1;
    }
  }

  .edit-tab {
    border: 1px solid rgb(191, 203, 217);
    border-right: none;
    textarea {
      width: 100%;
      height: 100%;
      font-size: 16px;
      outline: none;
      border: none;
    }
  }

  .show-tab {
    border: 1px solid rgb(191, 203, 217);
    background: rgba(191, 203, 217, .1);
  }

  .classification {
    margin: 10px 0 0 0;
  }

  .edit-submit {
    position: absolute;
    bottom: 40px;
  }
</style>
