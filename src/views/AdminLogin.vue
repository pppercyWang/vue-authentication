<template>
  <div class="admin-login-container">
    <div class="alert">ip管理员：ip_admin01 123456</div>
    <div class="alert">普通管理员: admin01 123456</div>
    <div class="alert">超级管理员: super_admin01 123456</div>
    <el-form
      class="login-form"
      auto-complete="on"
      label-position="left"
      :rules="form.rules"
      :model="form.loginModel"
    >
      <h3 class="title">后台登录</h3>
      <el-form-item prop="username">
        <el-input
          placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid"
          v-model="form.loginModel.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          prefix-icon="el-icon-lock"
          v-model="form.loginModel.password"
        ></el-input>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="login"
      >登 录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      accounts: [
        {
          username: "ip_admin01", // ip管理员
          password: "123456",
          role: "ip_admin"
        },
        {
          username: "admin01", // 普通管理员
          password: "123456",
          role: "admin"
        },
        {
          username: "super_admin01", // 超级管理员
          password: "123456",
          role: "super_admin"
        }
      ],
      form: {
        loginModel: {
          username: "super_admin01",
          password: "123456"
        },
        // 表单验证规则
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: "长度在 1 到 20 个字符",
              trigger: "blur"
            }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: "长度在 1 到 20 个字符",
              trigger: "blur"
            }
          ]
        }
      }
    };
  },
  mounted() {},
  methods: {
    async login() {
      // try{
      // const res = await this.$http.post(`${this.$api.ADMIN.login}`,this.form.loginModel)
      // todo...
      // }catch(e) {
      //   console.log(e);
      // }
      const USER = this.form.loginModel.username;
      const PWD = this.form.loginModel.password;
      const result = this.accounts.filter(
        account => account.username === USER && account.password === PWD
      );
      if (result.length !== 0) {
        sessionStorage.setItem("adminToken", "fakeToken");
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            username: result[0].username,
            role: result[0].role,
            ground: "back"
          })
        );
        switch (result[0].role) {
          case "ip_admin":
            this.$router.push("/admin/ip/index");
            break;
          case "admin":
            this.$router.push("/admin/user/index");
            break;
          case "super_admin":
            this.$router.push("/admin/user/index");
            break;
        }
      } else {
        this.$message.error("用户不存在");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.admin-login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #2d3a4b;
  .alert {
    text-align: center;
    margin-top: 30px;
    color: #ffffff;
  }
  .login-form {
    width: 420px;
    max-width: 100%;
    margin: 0 auto;
    margin-top: 70px;
    padding: 30px;
    border: 1px solid #232121;
    box-shadow: 2px 2px 16px;
    border-radius: 10px;
    background-color: #2f2c2c;
  }
  .title {
    font-size: 26px;
    color: #eee;
    text-align: center;
    font-weight: 700;
    margin: 60px 0;
  }
}
</style>


