<template>
  <section class="container clearfix">
    <sideBar />
    <secondBar />
    <params />
  </section>
</template>

<script>
import sideBar from '~/components/g-sidebar'
import secondBar from '~/components/g-second-bar'
import params from '~/components/g-params'
export default {
  components: { sideBar, secondBar, params },
  provide() {
    return {
      $api: this
    }
  },
  asyncData() {
    return {
      // BASE_API: process.env.BASE_API
    }
  },
  data() {
    return {
      moduleObj: {},
      selectMo: '',
      selectController: '',
      cmdList: []
    }
  },
  beforeMount() {},
  watch: {
    selectMo() {
      this.selectController = ''
    },
    selectController(v) {
      if (v) {
        this.queryApiList()
      }
    }
  },
  methods: {
    changeMo(m) {
      this.selectMo = m
    },
    changeController(c) {
      this.selectController = c
    },
    queryApiList() {
      this.cmdList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}
</style>
