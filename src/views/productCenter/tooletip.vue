<template>
  <div class="tips">
    <el-tooltip class="item" effect="dark" :content="text" placement="top-start" v-if="text.length > textLength">
      <span>{{ text.substring(0, textLength) }}...</span>
    </el-tooltip>
    <span v-else>
      {{ text }}
    </span>
  </div>

</template>
<script>
export default {
  props:{
    textLength:{
      type: Number,
      default: 8
    },
    text:{
      type: String,
      default:''
    }
  }
}
</script>
<style lang="scss" scoped>
.tips{
  text-align: left;
  font-size: 16px;
  color: #333;
}
</style>