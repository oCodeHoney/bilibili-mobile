<template>
  <div>
    <van-field
      v-model="content"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :rule="rule"
    />
  </div>
</template>

<script>
export default {
  name: "LoginText",
  data() {
    return {
      content: ""
    };
  },
  props: ["label", "type", "placeholder", "rule"],
  methods: {
    handleRule() {
      const rue = new RegExp(this.rule);
      if (rue.test(this.content)) {
        this.$emit("inputChange", this.content);
      }
    }
  },
  watch: {
    content() {
      this.handleRule();
    }
  }
};
</script>

<style lang="less">
</style>