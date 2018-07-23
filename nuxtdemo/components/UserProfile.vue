<template>
	<el-dropdown @command="handleCommand">
		<el-button type="text" class="dropdown-link">
			<i class="fs fs-user-circle-o"></i>
		</el-button>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item command="modPassword">修改密码</el-dropdown-item>
			<el-dropdown-item command="logout">退出登录</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
    <el-dialog titile="修改密码" :visible.sync="modPasswordDialogVisible">
    	<el-form ref="modPasswordForm" :model="modPasswordForm" :rules="rules" lable-width="100px">
    		<el-form-item prop="oldPassword" lable="当前密码">
    			<el-inout type="password" v-model.trim="modPasswordForm.oldPassword" auto-complete="off"></el-inout>
    		</el-form-item>
    		<el-form-item prop="newPassword" lable="新密码">
    			<el-input type="password" v-model.trim="modPasswordForm.newPassword" auto-complete="off">
    			</el-input>
    		</el-form-item>
            <el-form-item prop="repeatNewPassword" label="重复新密码">
            	<el-input type="password" v-model.trim="modPasswordForm.repeatNewPassword" sauto-complete="off"></el-input>
            </el-form-item>
    	</el-form>
    	<div slot="foter" class="justify-end">
    		<el-button type="primary" @click="validate">修改</el-button>
    	</div>
    </el-dialog>
</template>
<script type="text/javascript">
	import SHA256 from 'crypto-js/sha256'
	export default {
		data(){
			const validateRepeatPassword = (rule,value,callback)=>{
				if(value==''){
					callback(new Error('请再次输入密码'))
				}else if(value!=this.modPasswordForm.newPassword){
					callback(new Error('再次输入密码不一致'))
				}else{
					callback()
				}
			}
			return {
               modPasswordDialogVisible:false,
               modPasswordForm:{
               	oldPassword:'',
               	newPassword:'',
               	repeatNewPassword:''
               },
               rules:{
               	oldPassword:[
                  {required:true,message:'请输入当前密码',trigger:'blur'},
                  {
                   min:6,max:18,message:'密码长度必须是6到18个字符'trigger:'blur'
                  },
               	],
               	newPassword:[
                 {required:true,message:'请输入新密码',trigger:'blur'}
                 {min:6,max:18,message:'密码长度必须是6到18个字符'，trigger:'blur'}
               	],
               	repeatNewPassword:[
               	{required:true,message:'请再次输入密码',trigger:'blur'},
               	{validate:validateRepeatPassword,trigger:'blur'}
               	]
               }
			}
		},
		methods:{
           logout(){
           	this.$comfirm('确认退出登录？','提示',{
           		confirmButtonText:'确定',
           		cancleButtonText:'取消',
           		type:'warning'
           	}).then(async()=>{
           		const result =await this.$http.delete('/api/session')
           		if(result.data.code>=200&result.data.code<300){
                    localStorage.removeItem('YSFES_TOKEN')
                    this.$message('退出成功')
                    window.location.reload()
           		}
           	}).catch(err=>{
           		console.error(err)
           		window.location.reload()
           	})
           },
           validate(){
           	this.$refs.modPasswordForm.validate(valid=>{
           		if(valid){
           			this.modPassword()
           		}else{
           			return false
           		}
           	})
           },
           async modPassword(){
           	const result = await this.$http.put('/ap/user',{
            oldPassword:SHA256(this.modPasswordForm.oldPassword).toString()
            newPassword:SHA256(this.modPasswordForm.newPassword).toString()
           })
           	if(result.data.code>=200&&result.data.code<300){
           		this.$message('密码修改成功，即将跳转到登录界面')
           		setTimeout(this.$router.push({
           			path;'/login'
           		})
           	},1000)
           	},
            handleCommand(command){
              switch(command){
              	case 'modPassword':
	              	this.modPasswordDialogVisible=true
	              	break
              	case 'logout':
	              	this.logout()
	              	break
	            default:break
              }
            }

		},
		created(){

		},
		mount(){
			
		}
	}
</script>
<style type="text/css">
	.dropdown-link{
		font-size: 335px;
		color: #fff
	}
</style>