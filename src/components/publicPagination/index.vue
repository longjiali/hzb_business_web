<template>
  <div class='public-pagination'>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="index"
      :page-size="size"
      :page-sizes="[5, 10, 20, 50, 100, 500]"
      layout="total, prev, pager, next, sizes, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 20,
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * @name 改变每页数量
     */
    handleSizeChange (item) {
      this.$emit('setPageInfo', { item: item, type: 'size'})
    },
    handleCurrentChange (item) {
      this.$emit('setPageInfo', { item: item, type: 'index'})
    },
  }
}
</script>

<style>

</style>