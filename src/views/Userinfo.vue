<template>
  <div class="userinfo">
    <nav-bar></nav-bar>
    <img src="@/assets/bannerTop_new.png" alt class="backImg" />
    <user-detail :userInfo="model"></user-detail>
    <user-article></user-article>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import UserDetail from "@/components/userComponent/UserDetail";
import UserArticle from "@/components/userComponent/UserArticle";

export default {
  name: "Userinfo",
  data() {
    return {
      model: {}
    };
  },
  components: {
    NavBar,
    UserDetail,
    UserArticle
  },
  methods: {
    async userInfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    }
  },
  created() {
    this.userInfoData();
  }
};
</script>

<style lang="less">
.userinfo {
  .backImg {
    width: 100%;
    height: 91px;
  }
}
</style>