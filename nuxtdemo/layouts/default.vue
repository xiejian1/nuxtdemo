template>
  <div class="default" :style="`background-image: url(${websiteInfo.bgUrl || ''})`">
    <nuxt/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      websiteInfo: {
        bgUrl: ''
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
  }
}
</script>


<style scoped>
.default{
  height: auto;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
</style>
