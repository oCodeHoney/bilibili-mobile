<template>
  <div class="navbar">
    <div class="logo">
      <img @click="$router.push('/')" src="@/assets/logo.png" alt />
    </div>
    <div>
      <p>
        请输入搜索内容
        <van-icon class="ipt-icon" name="search" />
      </p>
    </div>
    <div>
      <img v-if="imgUrl" :src="imgUrl" alt @click="$router.push('/userinfo')" />
      <img v-else src="@/assets/default_img.jpg" alt @click="$router.push('/login')" />
      <p>下载APP</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      imgUrl: ""
    };
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.imgUrl = res.data[0].user_img;
    }
  }
};
</script>

<style lang="less">
.navbar {
  height: 12.5vw;
  background-color: #fff;
  display: flex;
  .logo {
    width: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 1.389vw;
    p {
      position: relative;
      background-color: #f4f4f4;
      font-size: 3.333vw;
      line-height: 6.389vw;
      height: 6.389vw;
      width: 100%;
      border-radius: 3.611vw;
      color: #aaa;
      padding-left: 30px;
      .ipt-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translate(0, -50%);
        color: #aaa;
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 6.667vw;
      height: 6.667vw;
    }
    p {
      padding: 1.389vw 2.778vw;
      margin: 0 1.389vw;
      border-radius: 0.833vw;
      background-color: #fb7299;
      color: #fff;
      font-size: 3.611vw;
    }
  }
}
</style>