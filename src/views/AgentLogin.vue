<template>
  <div class="agent-login-container">
    <div class="alert">二级代理：second_agent01 123456</div>
    <div class="alert">总代理: super_agent01 123456</div>
    <el-form
      class="login-form"
      auto-complete="on"
      label-position="left"
      :rules="form.rules"
      :model="form.loginModel"
    >
      <h3 class="title">中台登录</h3>
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
          username: "second_agent01",
          password: "123456",
          role: "second_agent"
        },
        {
          username: "super_agent01",
          password: "123456",
          role: "super_agent"
        }
      ],
      form: {
        loginModel: {
          username: "super_agent01",
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
      // const res = await this.$http.post(`${this.$api.AGENT.login}`,this.form.loginModel)
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
        sessionStorage.setItem("agentToken", "fakeToken");
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            username: result[0].username,
            role: result[0].role,
            ground: "mid"
          })
        );
        switch (result[0].role) {
          case "second_agent":
            this.$router.push("/agent/member/index");
            break;
          case "super_agent":
            this.$router.push("/agent/member/index");
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
.agent-login-container {
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
    margin-top: 100px;
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


