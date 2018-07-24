<template>
	<div class="admin">
		<admin-headr class="admin-headr" :website-info="websiteInfo"></admin-headr>
		<main class="admin-main">
			<admin-sidenav class="admin-sidenav"></admin-sidenav>
			<div class="admin-content">
				<nuxt></nuxt>
			</div>
		</main>
	</div>
</template>
<style type="text/css">
	.admin{
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #efefef;
	}
	.admin-header{
		height: 60px;
	}
	.admin-main{
		flex: 1;
		display: flex;
	}
	.admin-sidenav{
		width: 220px;
		overflow-y: auto;
		background-color: #343257;
	}
	.admin-content{
		flex: 1;
		margin:10px 0 0 10px;
		padding: 20px;
		overflow: auto;
		background-color: #fff;
		box-shadow: -1px -1px 8px 2px rgba(0,0,0,0.1)
	}
</style>
<script type="text/javascript">
	import AdminHeader from '../components/AdminHeader.vue'
	import AdminSidenav from '../components/AdminSidenav.vue'

	export default {
		data() {
			return {
               websiteInfo:{},
			}
		},
		middleware:'auth',
		methods:{
           async fetchWebsiteInfo(){
              const result = await this.$http.get('/api/websiteInfo')
              if(result.data.code>=200&&result.data.code<300){
              	this.websiteInfo = result.data.data
              }else{
              	this.$message.error(result.data.msg)
              }
           },
           async checkAuth(){
           	try{
           		const result = await this.$http.get('/api/token')
           		if(result.data.code>=200&&result.data.code<300){
           			if(result.data.data[0]==='admin'){
                        return true;
           			}
           		}
           		this.$router.push('/login')
           	}catch(error){
                console.log(error)
                this.$router.push('/login')
           	}
           }
		},
		created(){
           this.fetchWebsiteInfo()
		},
		mounted(){
           this.checkAuth()
		},
		components:{
			AdminHeader,
			AdminSidenav
		}
	}
</script>