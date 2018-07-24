<template>
  <div>
    <header>
      <div @click="$router.push('/')" class="logo">
        <img :src="websiteInfo.logoUrl" height="150" alt="">
        <div class="title">
          <h1>
            <span>{{websiteInfo.titleName}}</span>
            <small>
              <span>{{websiteInfo.location}}</span>
              <span>{{websiteInfo.time}}</span>
            </small>
          </h1>
          <p>{{websiteInfo.subTitle}}</p>
        </div>
      </div> 
      <div class="profile">
        <template v-if="isLogin">
          <user-profile></user-profile>
        </template>
        <template v-else>
            <el-button @click="$router.push('/login')" class="hvr-sink header-btn" type="primary">登录</el-button>
            <el-button @click="$router.push('/register')" class="hvr-sink header-btn" type="primary">注册</el-button>
        </template>
      </div>
    </header>
    <nav>
      <el-menu :default-active="activeIndex" class="menu" mode="horizontal" router>
        <el-menu-item class="menu-item" key="index" index="/">首页</el-menu-item>
        <el-menu-item class="menu-item" v-for="menu in sortedMenus" :key="menu.id" :index="`/channels?id=${menu.id}`">{{menu.name}}</el-menu-item>
         <!-- <el-menu-item class="menu-item" key="admin" index="/gather"><span @click.stop="gotoGatherInfo">平台注册</span></el-menu-item>  -->
        <el-menu-item class="menu-item" key="admin" index="/admin/sidenavContent" v-if="userRole === 'admin'">系统管理</el-menu-item>
      </el-menu>
    </nav>
  </div>
</template>

<script>
import UserProfile from './UserProfile.vue'
export default {
  data () {
    return {
      isLogin: false,
      userRole: 'normal',
      activeIndex: '',
      menus: []
    }
  },
  computed: {
    sortedMenus () {
      return this.menus.sort((prev, cur) => prev.indexNum - cur.indexNum)
    }
  },
  props: {
    websiteInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    async checkLoginStatus () {
      const result = await this.$http.get('/api/token')
      if (result.data.code >= 200 && result.data.code < 300) {
        this.isLogin = true
        this.userRole = result.data.data[0]
      }
    },
    async fetchMenus () {
      const result = await this.$http.get('/api/menu/oneLevel')
      if (result.data.code >= 200 && result.data.code < 300) {
        this.menus = result.data.data
      }
    },
    gotoGatherInfo () {
      if (!this.websiteInfo.enableRegister) {
        this.$message.info('您好，会议注册时间已截至，注册通道已经关闭')
      } else if (!this.isLogin) {
        this.$message.warning('您还未登录，请先登陆')
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      } else {
        this.$router.push('/gather')
      }
    }
  },
  created () {
    this.fetchMenus()
  },
  mounted () {
    this.checkLoginStatus()
  },
  components: {
    UserProfile
  }
}
</script>

<style lang="scss" scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}
.logo{
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  img{
    height: 80px;
  }
  .title{
    margin-left: 15px;
    
    text-align: left;
    color: #3c3ca3;
    p{
      margin: 0;
      padding-left: 10px;
      font-size: 16px;
    }
  }
  h1{
    margin: 0;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 36px;
    color: #aa1d2a;
    font-family: 'STXingkai', 'Pacifico', cursive;
    small{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin: 22px 0 0px 20px;
      text-align: center;
      font-size: 19px;
      color: #1e71ba;
      font-weight: bold;
      line-height: 33px;
      display: inline;
      margin-right: 10px;
      font-family: SimHei;
      span{
        line-height: 1;
        margin-right: 10px;
      }
    }
  }
}
.header-btn{
  border-radius: 0;
  padding: 8px 20px;
  margin-right: 10px;
}
.menu{
  padding: 0 20px;
  background-color: rgb(34, 69, 153);
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.50);
  border-radius: 0;
  border-bottom: 0;
}
.menu-item{
  height: 45px;
  line-height: 45px;
  font-size: 20px;
}
.menu /deep/ .el-menu-item, .menu /deep/ .el-submenu__title,
.menu /deep/ .el-menu--horizontal .el-submenu .el-menu-item.is-active, .menu /deep/ .el-menu-item.is-active{
  color: #fff;
}
.menu /deep/ .el-menu--horizontal .el-submenu .el-menu-item.is-active,
.menu /deep/ .el-menu-item.is-active{
  background-color: rgb(51, 124, 177);
}
.menu.el-menu--horizontal .el-menu-item:hover, .menu.el-menu--horizontal .el-submenu__title:hover{
  background-color: rgb(51, 124, 177);
}
</style>
