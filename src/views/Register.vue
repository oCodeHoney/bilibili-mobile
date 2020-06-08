<template>
  <div>
    <login-top middleTop="注册 bilibili">
      <div slot="right" style="font-size: 3.611vw" @click="$router.push('./login')">前往登录</div>
    </login-top>

    <login-text
      label="姓名"
      style="margin: 4.167vw 0;"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="content => model.name = content"
    ></login-text>
    <login-text
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="content => model.username = content"
    ></login-text>
    <login-text
      label="密码"
      type="password"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      @inputChange="content => model.password = content"
    ></login-text>

    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop";
import LoginText from "@/components/common/LoginText";
import LoginBtn from "@/components/common/LoginBtn";

export default {
  name: "Register",
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: ""
      }
    };
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    async registerSubmit() {
      let rulg = /^.{6,16}$/;
      if (
        rulg.test(this.model.name) &&
        rulg.test(this.model.username) &&
        rulg.test(this.model.password)
      ) {
        const res = await this.$http.post("./register", this.model);
        this.$msg.fail(res.data.msg);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.objtoken);
        setTimeout(() => {
          this.$router.push("/userinfo");
        }, 1000);
      } else {
        this.$msg.fail("格式不正确，请重新输入");
      }
    }
  }
};
</script>

<style scoped>
</style>