<template>
  <div class="sidebar">
    <el-menu class="menu">
      <template v-for="menu in menus">
        <el-submenu :index="menu.id"  :key="menu.id"  v-if="menu.childMenu instanceof Array && menu.childMenu.length">
          <template slot="title">{{menu.name}}</template>
          <el-menu-item v-for="menu in menu.childMenu" :key="menu.id" :index="menu.id" @click="changeArticle(menu.articleId)">{{menu.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="menu.id" :key="menu.id" @click="changeArticle(menu.articleId)" v-else>{{menu.name}}</el-menu-item>
      </template>
    </el-menu>
    <div class="tips">
      <div class="qrcode">
          <img :src="websiteInfo.qrcode.url" :alt="websiteInfo.qrcode.title">
          <p>{{websiteInfo.qrcode.title}}</p>
        </div>
        <div class="important-date">
          <h3>重要日期</h3>
          <div class="date-item" v-for="item in websiteInfo.importantDate" :key="item.name">
            <div class="date">
              <p class="year-month" :style="{'background-color': item.color || '#01edad'}">
                {{moment(item.date).format('YYYY年M月')}}
              </p>
              <p class="day">
                {{moment(item.date).format('D日')}}
              </p>
            </div>
            <div class="title"  :style="{'color': item.color || '#ccc'}">{{item.title}}</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
export default {
  data () {
    return {
      module: '',
      menus: [],
      websiteInfo: null
    }
  },
  methods: {
    moment: Moment,
    fetchMenu (module) {
      let menus = [
        {
          id: '1',
          name: '第一届',
          articleId: null,
          childMenu: [
            {
              id: '11',
              name: '开幕式',
              articleId: 'a1',
              childMenu: null
            }
          ]
        },
        {
          id: '2',
          name: '第二届',
          articleId: 'a2',
          childMenu: null
        }
      ]
      this.menus = menus
    },
    fetchWebsiteInfo () {
      this.websiteInfo = {
        qrcode: {
          url: require('../assets/qrcode.jpg'),
          title: '微信公众号：第四届青年地学论坛'
        },
        importantDate: [{
          name: 'open',
          date: '2017-05-01',
          title: '注册通道开放',
          color: '#01edad'
        }, {
          name: 'close',
          date: '2017-05-01',
          title: '网上注册通道关闭',
          color: '#ffc474'
        }]
      }
    },
    changeArticle (articleId) {
      this.$emit('menu-selected', articleId)
    }
  },
  created () {
    this.module = this.$route.query.module
    this.fetchMenu(this.module)
    this.fetchWebsiteInfo()
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
  background: #fff;
  padding: 30px 20px;
}
.menu{
  min-height: 200px;
  background-color: #fff;
}
.tips{
  text-align: center;
}
.qrcode{
  color: rgb(30, 146, 203);
  font-size: 12px;
  img{
    width: 130px;
  }
  p {
    margin-top: 5px;
  }
}
.important-date{
  width: 130px;
  margin: 20px auto 0;
  h3{
    height: 40px;
    line-height: 40px;
    color: #ff4949;
    font-size: 20px;
  }
}
.date-item .title{
  margin-top: 5px;
}
.date-item + .date-item{
  margin-top: 20px;
}
.year-month{
  padding: 10px 0;
  border-radius: 4px 4px 0 0;
  font-size: 22px;
  color: #fff;
}
.day{
  padding: 10px 0;
  font-size: 35px;
  background-color: #ccc;
  border-radius: 0 0 4px 4px;
}
</style>

