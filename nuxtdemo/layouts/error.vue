<template>
	<div class="container">
		<h1 v-if="error.statusCode==404">页面不存在</h1>
		<h1 v-else>应用发生异常错误</h1>
		<nuxt-link to="/">首页</nuxt-link>
	</div>
</template>
<script type="text/javascript">
	export default {
		props:['error'],
		layout:'blog'
	}
</script>