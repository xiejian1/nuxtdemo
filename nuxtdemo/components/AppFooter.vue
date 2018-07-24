<template>
  <footer>
    <div class="unit-types">
      <div class="unit-type" v-for="(info, index) in sortedUnitTypes" :key="index">
        <div class="unit-type__content">
          <h6>{{info.name}}</h6>
          <p class="unit" v-for="(org, index) in info.unitItemRespVOList" :key="index">
            <span>{{org.name}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="firend-links">
      <div class="link-title">友情链接:</div>
      <ul class="link-content">
        <li v-for="(link, index) in sortedFriendLinks" :key="index" class="link-item"><a :href="link.url || '#'" target="blank">{{link.text || link.url}}</a></li>
      </ul>
    </div>
    <div class="copyright" v-show="false">
      <p>
        Powered by <a href="https://github.com/cdtft" target="blank">@cdtft</a>,<a href="https://github.com/lzq4047" target="blank">@lzq4047</a>,<a href="https://github.com/xiejian1" target="blank">@xiejian1</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    unit: {
      type: Array,
      default: () => []
    },
    friendLinks: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    sortedUnitTypes: function () {
      const sortedTypes = this.unit.sort((prev, cur) => prev.indexNum - cur.indexNum)
      const sortedUnitTypes = sortedTypes.map(type => {
        return Object.assign({}, type, {
          unitItemRespVOList: type.unitItemRespVOList.sort((prev, cur) => prev.indexNum - cur.indexNum)
        })
      })
      return sortedUnitTypes
    },
    sortedFriendLinks: function () {
      return this.friendLinks.sort((prev, cur) => prev.indexNum - cur.indexNum)
    }
  }
}
</script>

<style lang="scss" scoped>
footer{
  // background-color: #132ff2;
  // background-color: #1562bb;
  background: #464B57;
}
.unit-types{
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-size: 16px;
  color: #fff;
}
.unit-type{
  padding: 20px 60px;
  // flex: 1;
  text-align: center;
  height: 100%;
  h6{
    width: 150px;
    padding-bottom: 5px;
    margin: 0 0 10px;
    font-size: 26px;
    line-height: 30px;
    border-bottom: 2px solid #fff;
    font-family: 'STXingkai', 'Pacifico', cursive;
  }
}
.unit-type__content{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  .unit{
    margin: 5px 0;
  }
}
.firend-links{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  font-size: 13px;
}
.link-content{
  margin: 0;
  padding-left: 0;
}
.link-item{
  display: inline-block;
  padding: 0px 15px;
  color: #777;
  & + .link-item{
    border-left: 2px solid #ccc;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
}
.copyright{
  padding: 0 20px 10px;
  text-align: center;
  background-color: #fff;
  font-size: 13px;
  p{
    margin: 0;
  }
}
</style>


