<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 接收 id
    // 这样做的好处就是让这个 id  和路由尽可能地解耦
    // 不需要再写 this.$route.params.id 这样长的表达式
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        await this.$http.post("categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: `${this.id ? "修改" : "保存"}成功`,
      });
    },
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>
</style>