<template>
  <div class="view" :style="`background-image: url(${websiteInfo.bgUrl || ''})`">
    <app-header class="app-header" :website-info="websiteInfo"></app-header>
    <div class="app-content">
      <nuxt></nuxt>
    </div>
    <app-footer :unit="websiteInfo.unitRespVOList" :friendLinks="websiteInfo.friendLinkVOList" class="app-footer"></app-footer>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
export default {
  data () {
    return {
      websiteInfo: {
        unitRespVOList: [],
        friendLinkVOList: []
      }
    }
  },
  methods: {
    async fetchWebsiteInfo () {
      const result = await this.$http.get('/api/websiteInfo')
      if (result.data.code >= 200 && result.data.code < 300) {
        this.websiteInfo = result.data.data
      } else {
        this.$message.error(result.data.msg)
      }
    }
  },
  created () {
    this.fetchWebsiteInfo()
  },
  mounted () {
    console.log('%cPowered By: \n%c@cdtft\t\t<https://github.com/cdtft>,\n@lzq4047\t<https://github.com/lzq4047>, \n@xiejian1\t<https://github.com/xiejian1>', 'color: #ccc;font-size: 30px;', 'color: #409eff;;font-size: 20px;')
  },
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss" scoped>
.view{
  height: auto;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.app-header{
  background-color: rgba(255,255,255,0.5);
}
</style>


