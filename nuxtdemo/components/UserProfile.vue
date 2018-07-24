<template>
  <div>
    <el-dropdown @command="handleCommand">
      <el-button type="text" class="dropdown-link">
        <i class="fa fa-user-circle-o"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="modPassword">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="密码修改" :visible.sync="modPasswordDialogVisible">
      <el-form ref="modPasswordForm" :model="modPasswordForm" :rules="rules" label-width="100px">
        <el-form-item prop="oldPassword" label="当前密码">
          <el-input type="password" v-model.trim="modPasswordForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input type="password" v-model.trim="modPasswordForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="repeatNewPassword" label="重复新密码">
          <el-input type="password" v-model.trim="modPasswordForm.repeatNewPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="justify-end">
        <el-button type="primary" @click="validate">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256'
export default {
  data () {
    const validateRepeatPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modPasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      modPasswordDialogVisible: false,
      modPasswordForm: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入当前密码', trigger: 'blur'},
          {min: 6, max: 18, message: '密码长度必须是6到18个字符', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 6, max: 18, message: '密码长度必须是6到18个字符', trigger: 'blur'}
        ],
        repeatNewPassword: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: validateRepeatPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    logout () {
      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.$http.delete('/api/session')
        if (result.data.code >= 200 && result.data.code < 300) {
          // 删除TOKEN
          localStorage.removeItem('YSFES_TOKEN')
          this.$message('退出成功')
          window.location.reload()
        }
      }).catch(err => {
        console.error(err)
        window.location.reload()
      })
    },
    validate () {
      this.$refs.modPasswordForm.validate(valid => {
        if (valid) {
          this.modPassword()
        } else {
          return false
        }
      })
    },
    async modPassword () {
      // 修改密码
      const result = await this.$http.put('/api/user', {
        oldPassword: SHA256(this.modPasswordForm.oldPassword).toString(),
        newPassword: SHA256(this.modPasswordForm.newPassword).toString()
      })
      if (result.data.code >= 200 && result.data.code < 300) {
        this.$message('密码修改成功,即将跳转到登陆页面')
        setTimeout(() => {
          this.$router.push({
            path: '/login'
          })
        }, 1000)
      }
    },
    handleCommand (command) {
      switch (command) {
        case 'modPassword':
          this.modPasswordDialogVisible = true
          break
        case 'logout':
          this.logout()
          break
        default: break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-link{
  font-size: 35px;
  color: #fff;
}
</style>

