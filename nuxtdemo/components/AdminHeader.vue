<template>
  <header class="justify-between">
    <nuxt-link to="/" class="logo">
      <img :src="websiteInfo.logoUrl" height="40" alt="">
      <h1>
        <span>{{websiteInfo.titleName}}</span>
      </h1>
    </nuxt-link>
    <div class="profile">
      <user-profile class="user-profile"></user-profile>
    </div>
  </header>
</template>

<script>
import UserProfile from './UserProfile.vue'
export default {
  props: {
    websiteInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    UserProfile
  }
}
</script>

<style lang="scss" scoped>
header{
  background-image: linear-gradient(0deg,#325eae,#0a3780);
}
.logo{
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  font-family: 'STXingkai', 'Pacifico', cursive;
  img{
    height: 40px;
  }
  h1{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 15px;
    height: 40px;
    line-height: 40px;
    
    font-size: 28px;
    text-align: center;
    color: rgb(65,184,131);
  }
}
.user-profile{
  margin-right: 30px;
  color: #fff;
}
</style>

