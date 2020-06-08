<template>
  <div class="commentitems">
    <div class="commentItem" v-for="(item, index) in commentChild" :key="index">
      <div class="oneComment">
        <div class="userImg">
          <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt />
          <img v-else src="@/assets/default_img.jpg" alt />
        </div>

        <div class="commentContent">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>匿名用户</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div v-if="!temp">
            {{item.comment_content}}
            <span
              class="publish"
              @click="postItemComment(item.comment_id)"
            >回复</span>
          </div>
          <div v-else>
            回复
            <span style="color: #478ef0">@{{item.parent_user_info.name}}</span>
            ：{{item.comment_content}}
            <span
              class="publish"
              @click="postItemComment(item.comment_id)"
            >回复</span>
          </div>
        </div>
      </div>

      <commentchild-item @postChild="postChild" :commentChild="item.child" :temp="true"></commentchild-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchildItem",
  props: ["commentChild", "temp"],
  methods: {
    postItemComment(id) {
      this.$emit("postChild", id);
      this.$emit("postPublish", id);
    },
    postChild(id) {
      this.postItemComment(id);
      this.$emit("postPublish", id);
    }
  }
};
</script>

<style lang="less" scoped>
.commentitems {
  .commentItem {
    display: flex;
    flex-direction: column;
    .oneComment {
      display: flex;
      padding: 2.778vw 8.333vw 2.778vw 0;
      .userImg {
        margin-right: 2.778vw;
        img {
          width: 9.722vw;
          height: 9.722vw;
          border-radius: 50%;
        }
      }
      .commentContent {
        flex: 1;
        position: relative;
        p {
          font-size: 3.611vw;
          color: #999;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.389vw;
        }
        div {
          font-size: 3.611vw;
        }
        .publish {
          color: #478ef0;
          position: absolute;
          right: 4.167vw;
        }
      }
    }
  }
}
</style>