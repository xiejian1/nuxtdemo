<template>
  
    <div class="container"> 
      <h1 class="title">
        nuxtdemo
      </h1>
      <div class="links">
        <a href="https://nuxtjs.org/"  class="button--green">nuxt官方文档</a>
        <span>可以参考github</span>
        <a href="https://github.com/nuxt/nuxt.js"  class="button--grey">GitHub</a>
      </div>
    </div>
</template>

<script>
export default {
  layout:'blog',
}
</script>

<style>
.container {
  min-height: auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #abc;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

