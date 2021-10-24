<template>
  <el-form ref="form" :model="baseForm" :rules="rules">
    <el-row>
      <el-col v-for="item in formList" :key="item.value" :span="item.span || 24" :offset="item.offset || 0" v-show="typeof item.hidden === 'boolean' ? item.hidden : true">
        <el-form-item :label="`${item.label}：`" :prop="item.value">
          <template v-if="item.type === 'radio'">
            <el-radio-group v-model="baseForm[item.value]">
              <el-radio v-for="(opt,index) in item.options" :key="index" :label="opt.value">{{opt.label}}</el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.type === 'textarea'" >
            <el-input v-model="baseForm[item.value]" type="textarea" :rows="2" :placeholder="`请输入${item.label}`"></el-input>
          </template>
          <template v-else-if="item.type === 'upload'">
            <el-upload
              class="avatar-uploader"
              action="/business/file/upload"
              name="file"
              :show-file-list="false"
              :on-success="(res, file)=>{ handleAvatarSuccess(file,item.value ) }"
              :headers="{token: getToken() || null}"
              :before-upload="beforeAvatarUpload"
              >
              <img v-if="baseForm[item.value]" :src="baseForm[item.value]" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select v-model="baseForm[item.value]" :placeholder="`请选择${item.label}`">
              <el-option  
                v-for="opt in item.options"
                :key="opt.value"
                :label="item.optionSet ? opt[item.optionSet.label] : opt.label"
                :value="item.optionSet ? opt[item.optionSet.value] : opt.label"/>
            </el-select>
          </template>
          <template v-else-if="item.type === 'number'">
             <el-input-number v-model="baseForm[item.value]" :placeholder="`请输入${item.label}`" :step="0.01" controls-position="right"></el-input-number>
          </template>
          <template v-else>
            <el-input v-model="baseForm[item.value]" :placeholder="`请输入${item.label}`"></el-input>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { getToken } from '@/utils/auth'

export default {
  model: {
    prop: 'baseForm',
    // 随便命名事件，对应下面$emit即可
    event: 'baseFormUpdata'
  },
  props:{
    formList:{
      type: Array,
      default:()=>{
        return []
      }
    },
    baseForm:{
      type: Object,
      default:()=>{
        return {}
      }
    }
  },
  data(){
    return{
      getToken,
      rules:{},
      fileList:[],
    }
  },
  watch:{
    baseForm:{
      handler(){
        this.$emit('baseFormUpdata',this.baseForm)
      },
      deep: true
    },
    formList:{
      handler(val){
        val.map(i=>{
          this.$set(this.rules, i.value , 
          [ {required: typeof i.required === 'boolean' ? i.required : true , message:`请输入${i.label}`, trigger: 'change'} ])
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods:{
    validate(){
      return new Promise((resolve) => {
        this.$refs.form.validate().then((valid)=>{
          if (valid) {
            resolve()
          }
        })
      })
    },
    handleAvatarSuccess(file, value) {
      this.baseForm[value] = file.response.data
    },
    beforeAvatarUpload(file){
      // 图片格式
      const { name } = file
      const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
     //获取最后一个.的位置
      var index= name.lastIndexOf(".");
      //获取后缀
      var ext = name.substr(index+1);
      if (imglist.indexOf(ext.toLowerCase())  !== -1 ) {
        return true
      }else{
        this.$message({
          type:'error',
          message:'请上传图片文件'
        })
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form{
  ::v-deep .el-form-item{
    display: flex;
    .el-form-item__content{
      flex: 1;
      .el-input-number, .el-select{
        width: 100%;
      }
    }
  }
  .avatar-uploader{
    ::v-deep .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>