<template>
 <div class="wid100">
   <el-divider content-position="left">填写跟进信息</el-divider>

   <el-row >
     <el-col :span="11">
       <el-form-item  label="跟进人：">
         <el-select
           placeholder="请选择跟进人"
           clearable
           size="small"
           style="width: 240px"
         >
           <el-option :value="1">请选择跟进人</el-option>
           <el-option>张三</el-option>
           <el-option>李四</el-option>
         </el-select>
       </el-form-item>
     </el-col>
   </el-row>

   <el-row >
     <el-col :span="11">
       <el-form-item label="跟进主题：">
         <el-input v-model="form.name"></el-input>
       </el-form-item>
     </el-col>
   </el-row>

   <el-row >
     <el-col :span="11">
       <el-form-item label="跟进时间：">
         <el-col :span="11">
           <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
         </el-col>
       </el-form-item>
     </el-col>
   </el-row>

   <el-row >
     <el-col :span="11">
       <el-form-item label="跟进内容：">
         <el-input type="textarea" v-model="form.desc"></el-input>
       </el-form-item>
     </el-col>
   </el-row>

   <el-form-item label="备注：">
     <el-input type="textarea" v-model="form.desc"></el-input>
   </el-form-item>
   <el-row >
     <el-col :span="11">
       <el-form-item label="相关资料：">
         <el-upload
           class="upload-demo"
           action="https://jsonplaceholder.typicode.com/posts/"
           :on-preview="handlePreview"
           :on-remove="handleRemove"
           :before-remove="beforeRemove"
           multiple
           :limit="3"
           :on-exceed="handleExceed"
           :file-list="fileList">
           <el-button size="small" type="primary">点击上传</el-button>
         </el-upload>
       </el-form-item>
     </el-col>
   </el-row>

   <div v-if="title=='新增跟进'">
     <el-divider content-position="left">添加跟进问题</el-divider>
     <el-row :gutter="10" class="mb8" style="margin: 20px 10px">
       <el-col :span="1.5">
         <el-button
           type="primary"
           icon="el-icon-plus"
           size="small"
           @click="dialogVisibleaa = true"
           v-hasPermi="['system:role:add']"
         >添加跟进问题</el-button
         >
       </el-col>
     </el-row>
   </div>
<!--添加问题-->
   <el-collapse style="display: flex;flex-flow: row;justify-content: space-around" v-model="activeNames" @change="handleChange">
     <el-collapse-item title="跟进问题（1）" name="1" style="width: 45%">
       <el-form ref="form" :model="form" label-width="120px">
         <el-form-item label="问题主题：">
           <el-input type="textarea" v-model="form.desc"></el-input>
         </el-form-item>
         <el-form-item label="问题内容(1)：">
           <el-input type="textarea" v-model="form.desc"></el-input>
         </el-form-item>
         <el-form-item label="指定咨询人：">
           <el-select
             placeholder="咨询人"
             clearable
             size="small"
             style="width: 240px"
           >
             <el-option :value="1">请选择咨询人</el-option>
             <el-option>xxx</el-option>
             <el-option>xxx</el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="解决状态:">
           <el-radio v-model="radio1" label="1" border>已解决</el-radio>
           <el-radio v-model="radio1" label="2" border>解决中</el-radio>
           <el-radio v-model="radio1" label="4" border>未解决</el-radio>
         </el-form-item>
         <el-form-item label="备注：">
           <el-input type="textarea" v-model="form.desc"></el-input>
         </el-form-item>
       </el-form>
     </el-collapse-item>
     <el-collapse-item  title="跟进问题（2）" name="2" style="width: 45%">
       <el-form ref="form" :model="form" label-width="120px">
         <el-form-item label="问题主题：">
           <el-input type="textarea" v-model="form.desc"></el-input>
         </el-form-item>
         <el-form-item label="问题内容(1)：">
           <el-input type="textarea" v-model="form.desc"></el-input>
         </el-form-item>
         <el-form-item label="指定咨询人：">
           <el-select
             placeholder="咨询人"
             clearable
             size="small"
             style="width: 240px"
           >
             <el-option :value="1">请选择咨询人</el-option>
             <el-option>xxx</el-option>
             <el-option>xxx</el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="解决状态:">
           <el-radio v-model="radio1" label="1" border>已解决</el-radio>
           <el-radio v-model="radio1" label="2" border>解决中</el-radio>
           <el-radio v-model="radio1" label="4" border>未解决</el-radio>
         </el-form-item>
         <el-form-item label="备注：">
           <el-input type="textarea" v-model="form.desc"></el-input>
         </el-form-item>
       </el-form>
     </el-collapse-item>
   </el-collapse>

   <div style="display:flex;justify-content:center;padding: 50px">
     <el-button size="small"  type="primary">保存</el-button>
     <el-button size="small" @click="$router.go(-1)" >返回</el-button>
   </div>
 </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
