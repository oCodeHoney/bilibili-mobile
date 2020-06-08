<template>
  <div class="user-article">
    <div>
      <span>动态</span>
      <span>视频</span>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  name: "UserArticle"
};
</script>

<style lang="less">
.user-article {
  display: flex;
  height: 11.111vw;
  align-items: center;
  background-color: #fff;
  padding: 0 2.778vw;
  border-top: 0.278vw solid #ddd;
  span {
    margin: 0 1.944vw;
    color: #777;
  }
}
</style>