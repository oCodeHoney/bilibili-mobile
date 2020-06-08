<template>
  <div v-if="model" class="editviews">
    <div style="margin-bottom: 2.778vw;">
      <nav-bar></nav-bar>
    </div>

    <div class="uploadfile">
      <van-uploader class="uploadimg" preview-size="100vw" :after-read="afterRead" />
      <edit-banner left="头像">
        <img v-if="model.user_img" :src="model.user_img" alt slot="right" />
        <img v-else src="@/assets/default_img.jpg" alt slot="right" />
      </edit-banner>
    </div>

    <edit-banner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </edit-banner>

    <edit-banner left="账号">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </edit-banner>

    <edit-banner left="性别" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">{{model.gender == 0 ? '男' : '女'}}</a>
    </edit-banner>

    <edit-banner left="个性签名" @bannerClick="textshow = true">
      <a href="javascript:;" slot="right">{{model.user_desc}}</a>
    </edit-banner>

    <div class="editback" @click="$router.push('/userinfo')">返回个人中心</div>

    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="text = ''"
    >
      <van-field autofocus v-model="text" />
    </van-dialog>

    <van-dialog
      v-model="textshow"
      title="个性签名"
      show-cancel-button
      @confirm="textareaClick"
      @cancel="text = ''"
    >
      <van-field autofocus type="textarea" v-model="text" />
    </van-dialog>

    <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import EditBanner from "@/components/common/EditBanner";

export default {
  name: "Edit",
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      text: "",
      gendershow: false,
      actions: [
        { name: "男", value: 0 },
        { name: "女", value: 1 }
      ]
    };
  },
  components: {
    NavBar,
    EditBanner
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
      const formdata = new FormData();
      formdata.append("file", file.file);
      const res = await this.$http.post("/upload", formdata);
      this.model.user_img = res.data.url;
      this.UserUpdata();
    },
    async UserUpdata() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code == 200) {
        this.$msg.fail("修改成功");
      }
    },
    confirmClick() {
      this.model.name = this.text;
      this.UserUpdata();
      this.text = "";
    },
    textareaClick() {
      this.model.user_desc = this.text;
      this.UserUpdata();
      this.text = "";
    },
    onSelect(data) {
      this.model.gender = data.value;
      this.UserUpdata();
      this.gendershow = false;
    }
  },
  created() {
    this.selectUser();
  }
};
</script>

<style lang="less">
.editviews a {
  color: #333;
}

.editviews img {
  width: 46px;
  border-radius: 50%;
}

.uploadfile {
  position: relative;
  overflow: hidden;
  .uploadimg {
    opacity: 0;
    position: absolute;
  }
}

.editback {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 4vw;
  padding: 4.167vw 0;
  margin-top: 5.556vw;
}
</style>