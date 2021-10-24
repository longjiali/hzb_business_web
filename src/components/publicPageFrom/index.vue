<template>
  <el-form ref="form" :rules="rules">
    <el-row v-for="(item, index) in infoData" :key="index">
      <el-col v-for="(Titem, Tindex) in item" :key="Tindex" :span="Titem.span || 8">
        <el-form-item :label="`${Titem.name}：`">
          <template v-if='Titem.type === "number" || Titem.type === "input" || Titem.type === "textarea"' >
            <el-input :disabled='Titem.disabled' v-model='Titem.model' :clearable='Titem.clearable' :type='Titem.type' :placeholder='`请输入${Titem.name}`'></el-input>
          </template>
          <template v-if='Titem.type === "date" || Titem.type === "daterange"'>
            <el-date-picker v-model='Titem.model' :placeholder='`请选择${Titem.name}`' :type='Titem.type' start-placeholder='开始日期' end-placeholder='开始日期'></el-date-picker>
          </template>
          <template v-if='Titem.type === "select"'>
            <el-select :placeholder="`请选择${Titem.name}`" v-model='Titem.model'>
              <el-option v-for='(Sitem, Sindex) in Titem.options' :key='Sindex' :label='Sitem.label' :value='Sitem.value'></el-option>
            </el-select>
          </template>
          <template v-if='Titem.type === "radio"'>
            <el-radio v-model='Titem.model' v-for='(Sitem, Sindex) in Titem.options' :key='Sindex' :label='Sitem.value'>{{ Sitem.label }}</el-radio>
          </template>
          <template v-if='Titem.type === "address"'>
            <div class='address-item'>
              <div class='address-item-select'>
                <el-cascader v-model="Titem.model" :options='addressOptions' placeholder='请选择省市区'></el-cascader>
              </div>
              <div class='address-item-input'>
                <el-input :disabled='Titem.disabled' v-model='Titem.model2' type='input' :placeholder='`请输入详细地址`'></el-input>
              </div>
            </div>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import options from "@/utils/address.json"
export default {
  model: {
    prop: 'infoData',
    event: 'upDateInfoData'
  },
  props:{
    infoData:{
      type: Array,
      default:()=>{
        return []
      }
    }
  },
  watch: {
    infoData: {
      handler () {
        this.$emit('upDateInfoData',this.infoData)
      },
      deep: true
    }
  },
  data(){
    return{
      rules:{},
      addressOptions: options
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form{
  ::v-deep .el-form-item{
    display: flex;
    .el-form-item__label {
      min-width: 125px;
      padding: 0;
    }
    .el-form-item__content{
      flex: 1;
      min-width: 250px;
      .el-input-number, .el-select{
        width: 100%;
      }
    }
  }
  .address-item {
    display: flex;
    align-items: center;
    .address-item-select {
      width: 305px;
    }
    .address-item-input {
      margin-left: 10px;
      width: 305px;
    }
  }
  ::v-deep input[type=number] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    -moz-appearance: textfield;
  }
  ::v-deep .el-date-editor {
    width: 100%;
  }
  ::v-deep .el-cascader {
    width: 100%;
  }
}
</style>