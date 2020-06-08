<template>
  <div class="home" v-if="category">
    <nav-bar></nav-bar>
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editcategory')">
        <van-icon name="setting-o" />
      </div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(item, index) in category" :key="index" :title="item.title">
          <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="detailparent">
              <cover
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem, categoryindex) in item.list"
                :key="categoryindex"
              ></cover>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Cover from "./Cover";

export default {
  name: "Home",
  data() {
    return {
      category: [],
      active: 0
    };
  },
  components: {
    NavBar,
    Cover
  },
  activated() {
    if (localStorage.getItem("newCat")) {
      let newCat = JSON.parse(localStorage.getItem("newCat"));
      this.category = this.changeCategory(newCat);
      this.selectArticle();
    }
  },
  methods: {
    async selectCategory() {
      if (localStorage.getItem("newCat")) {
        return;
      }
      const res = await this.$http.get("/category");
      this.category = this.changeCategory(res.data);
      this.selectArticle();
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.finished = false;
        item.loading = false;
        item.pagesize = 10;
        return item;
      });
      return category1;
      // this.category = category1;
      // this.selectArticle();
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    }
  },
  watch: {
    active() {
      this.selectArticle();
    }
  },
  created() {
    this.selectCategory();
  }
};
</script>

<style scoped lang="less">
.home {
  background-color: #fff;
}

.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}

.categorytab {
  position: relative;
  .category-ico {
    position: absolute;
    right: 0;
    top: 2.778vw;
    z-index: 5;
    padding: 1.389vw 2.778vw;
    background-color: #fff;
  }
}
</style>