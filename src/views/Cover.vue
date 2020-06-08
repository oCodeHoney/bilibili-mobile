<template>
  <div @click="pathPush" v-if="detailitem">
    <div class="detailItem">
      <div class="imgparent">
        <img :src="detailitem.img" alt style="width: 100%;" />
        <div class="bottom">
          <div class="icon-play2">
            <span class="video">1233</span>
          </div>
          <div class="icon-file-text">
            <span class="comment">{{!detailitem.commentlen ? 66 : detailitem.commentlen}}</span>
          </div>
        </div>
      </div>
      <p>{{detailitem.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["detailitem"],
  methods: {
    pathPush() {
      if (this.$route.path != `/article/${this.detailitem.id}`) {
        this.$router.push(`/article/${this.detailitem.id}`);
      }
    }
  }
};
</script>

<style scoped lang="less">
.detailItem {
  p {
    font-size: 3.333vw;
    padding: 0.833vw 0;
  }
  .imgparent {
    position: relative;
    .bottom {
      padding: 1.389vw 2.778vw;
      position: absolute;
      bottom: 0vw;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      color: #fff;
      display: flex;
      justify-content: space-between;
      left: 0;
      right: 0;
    }
  }
}
</style>