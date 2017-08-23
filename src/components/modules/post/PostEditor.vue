<template>
  <div class="edit-content">
    <el-input class="edit-title" v-model="title" placeholder="标题：夕阳下的奔跑,那是我逝去的青春"></el-input>
    <div class="classification">
      <el-select v-model="value1" placeholder="请选择分类">
        <el-option v-for="category in TERM_CATEGORY_LIST" :key="category.id" :value="category.id" :label="category.name">
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
      <el-button type="primary" @click="insertPost">发布文章</el-button>
    </div>

  </div>
</template>

<script>
import lodash from 'lodash'
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'
import { GET_CATEGORY_LIST, INSERT_NEW_POST } from '../../../store/actionTypes'
import { TERM_CATEGORY_LIST } from '../../../store/getterNames'
export default {
  name: 'hello',
  data() {
    return {
      input: '`PHP is the best language in the world`',
      value1: '',
      title: '',
      content: '',

    }
  },
  created() {
    this.getCategory()
  },
  computed: {
    compiledMarkdown: function() {
      console.log(marked(this.input))
      return marked(this.input, { sanitize: true })
    },
    ...mapGetters([TERM_CATEGORY_LIST])
  },
  methods: {
    update: _.debounce(function(e) {
      console.log(this.input)
      this.input = e.target.value
    }, 300),
    async getCategory() {
      const { code, data, message } = await this.GET_CATEGORY_LIST()
      console.log(data)
    },
    async insertPost() {
      const date = new Date()
      const payload = { title: this.title, content: this.input, categories: [this.value1], data: date }
      const { code } = await this.INSERT_NEW_POST(payload)
      if (code === 200) this.$message({ message: '发表成功', type: 'success' })
    },
    ...mapActions([GET_CATEGORY_LIST, INSERT_NEW_POST])
  },
  components: {},
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
