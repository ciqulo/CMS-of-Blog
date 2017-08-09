<template>
  <div class="edit-content">
    <el-input class="edit-title" placeholder="标题：夕阳下的奔跑,那是我逝去的青春"></el-input>
    <div class="classification">
      <el-select v-model="value" placeholder="请选择分类">
        <el-option v-for="category in POST_CATEGORIES" :key="category" :label="category" :value="category">
        </el-option>
      </el-select>
    </div>
    <div class="edit-state">
      <div class="edit-tab"><textarea :value="input" @input="update"></textarea></div>
      <div class="show-tab" v-html="compiledMarkdown" v-highlight></div>
    </div>
    <div class="edit-submit">
      <el-button type="primary">发布文章</el-button>
    </div>

  </div>
</template>

<script>
  import lodash from 'lodash'
  import marked from 'marked'
  import {mapGetters} from 'vuex'
  import {POST_CATEGORIES} from '../../../store/getterNames'
  export default {
    name: 'hello',
    data () {
      return {
        input: '`PHP is the best language in the world`',
        value: ''
      }
    },
    mounted(){
      this.getReady();
    },
    computed: {
      compiledMarkdown: function () {
        console.log(marked(this.input))
        return marked(this.input)
      },
      ...mapGetters([POST_CATEGORIES])
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300),
      getReady(){
      }
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
      font-family: "Courier New";
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
