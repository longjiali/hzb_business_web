<template>
  <div class='public-page-input'>
    <div class='page-input-name'>{{ infoData.name }}:</div>
    <div class='page-input-content' :class='{"page-input-content_a": infoData.type === "textarea"}'>
      <div class='input-content-item'>
        <el-input v-if='infoData.type === "input"' v-model='value' @blur='setModelValue' :placeholder="`请输入${infoData.name}`"></el-input>
        <el-input v-if='infoData.type === "number"' type='number' v-model='value' @blur='setModelValue' :placeholder="`请输入${infoData.name}`"></el-input>
        <el-input v-if='infoData.type === "textarea"' v-model='value' @blur='setModelValue' type='textarea' :placeholder="`请输入${infoData.name}`"></el-input>
        <div class='content-item-radio' v-if='infoData.type === "radio"'>
          <el-radio v-model='value' label="1" @change='setModelValue'>备选项</el-radio>
          <el-radio v-model='value' label="2" @change='setModelValue'>备选项</el-radio>
        </div>
        <el-select v-if='infoData.type === "select"' v-model='value' placeholder="请选择" @change='setModelValue'>
          <el-option v-for='(item, index) in infoData.options' :key='index' :label='item.label' :value='item.value'></el-option>
        </el-select>
        <el-date-picker v-if='infoData.type === "date" || infoData.type === "daterange"' v-model='value' @change='setModelValue' placeholder="请选择日期" :type='infoData.type' start-placeholder='开始日期' end-placeholder='开始日期'></el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoData: {
      type: Object,
      default: () => { return {} }
    },
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    setModelValue (item) {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang='scss' scoped>
.public-page-input {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .page-input-name {
    flex: 0 0 auto;
    margin-top: 8px;
    min-width: 100px;
    font-size: 13px;
    color: #333333;
    text-align: right;
    line-height: normal;
  }
  .page-input-content {
    flex: 0 0 auto;
    margin-left: 8px;
    width: 250px;
    .input-content-item {
      .content-item-radio {
        height: 36px;
        display: flex;
        align-items: center;
      }
    }
  }
  .page-input-content_a {
    flex: 1;
    width: 100%;
  }
}
.public-page-input /deep/ .el-select {
  width: 100%;
}
.public-page-input /deep/ .el-input__inner {
  width: 100%;
}
.public-page-input /deep/.el-input {
  width: 100%;
}
.el-textarea  {
  width: 700px;
}
.public-page-input /deep/ input[type=number] {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  -moz-appearance: textfield;
}
</style>