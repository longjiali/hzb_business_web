(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0da682ed"],{"22c9":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"form",attrs:{model:e.baseForm,rules:e.rules}},[a("el-row",e._l(e.formList,(function(t){return a("el-col",{directives:[{name:"show",rawName:"v-show",value:"boolean"!==typeof t.hidden||t.hidden,expression:"typeof item.hidden === 'boolean' ? item.hidden : true"}],key:t.value,attrs:{span:t.span||24,offset:t.offset||0}},[a("el-form-item",{attrs:{label:t.label+"：",prop:t.value}},["radio"===t.type?[a("el-radio-group",{model:{value:e.baseForm[t.value],callback:function(a){e.$set(e.baseForm,t.value,a)},expression:"baseForm[item.value]"}},e._l(t.options,(function(t,i){return a("el-radio",{key:i,attrs:{label:t.value}},[e._v(e._s(t.label))])})),1)]:"textarea"===t.type?[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入"+t.label},model:{value:e.baseForm[t.value],callback:function(a){e.$set(e.baseForm,t.value,a)},expression:"baseForm[item.value]"}})]:"upload"===t.type?[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/business/file/upload",name:"file","show-file-list":!1,"on-success":function(a,i){e.handleAvatarSuccess(i,t.value)},headers:{token:e.getToken()||null},"before-upload":e.beforeAvatarUpload}},[e.baseForm[t.value]?a("img",{staticClass:"avatar",attrs:{src:e.baseForm[t.value]}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])]:"select"===t.type?[a("el-select",{attrs:{placeholder:"请选择"+t.label},model:{value:e.baseForm[t.value],callback:function(a){e.$set(e.baseForm,t.value,a)},expression:"baseForm[item.value]"}},e._l(t.options,(function(e){return a("el-option",{key:e.value,attrs:{label:t.optionSet?e[t.optionSet.label]:e.label,value:t.optionSet?e[t.optionSet.value]:e.label}})})),1)]:"number"===t.type?[a("el-input-number",{attrs:{placeholder:"请输入"+t.label,step:.01,"controls-position":"right"},model:{value:e.baseForm[t.value],callback:function(a){e.$set(e.baseForm,t.value,a)},expression:"baseForm[item.value]"}})]:[a("el-input",{attrs:{placeholder:"请输入"+t.label},model:{value:e.baseForm[t.value],callback:function(a){e.$set(e.baseForm,t.value,a)},expression:"baseForm[item.value]"}})]],2)],1)})),1)],1)},o=[],n=(a("7f7f"),a("5f87")),l={model:{prop:"baseForm",event:"baseFormUpdata"},props:{formList:{type:Array,default:function(){return[]}},baseForm:{type:Object,default:function(){return{}}}},data:function(){return{getToken:n["a"],rules:{},fileList:[]}},watch:{baseForm:{handler:function(){this.$emit("baseFormUpdata",this.baseForm)},deep:!0},formList:{handler:function(e){var t=this;e.map((function(e){t.$set(t.rules,e.value,[{required:"boolean"!==typeof e.required||e.required,message:"请输入".concat(e.label),trigger:"change"}])}))},deep:!0,immediate:!0}},methods:{validate:function(){var e=this;return new Promise((function(t){e.$refs.form.validate().then((function(e){e&&t()}))}))},handleAvatarSuccess:function(e,t){this.baseForm[t]=e.response.data},beforeAvatarUpload:function(e){var t=e.name,a=["png","jpg","jpeg","bmp","gif"],i=t.lastIndexOf("."),o=t.substr(i+1);return-1!==a.indexOf(o.toLowerCase())||(this.$message({type:"error",message:"请上传图片文件"}),!1)}}},r=l,s=(a("bca4"),a("2877")),u=Object(s["a"])(r,i,o,!1,null,"47a944af",null);t["default"]=u.exports},"28d9":function(e,t,a){},"2b43":function(e,t,a){"use strict";a.d(t,"c",(function(){return o})),a.d(t,"e",(function(){return n})),a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return r})),a.d(t,"f",(function(){return s})),a.d(t,"b",(function(){return u}));var i=a("b775"),o=function(e){return Object(i["a"])({url:"/product/query",method:"post",data:e})},n=function(e){return Object(i["a"])({url:" /product/save",method:"post",data:e})},l=function(e){return Object(i["a"])({url:"/product/detail/"+e,method:"get"})},r=function(e){return Object(i["a"])({url:"/programme/query",method:"post",data:e})},s=function(e){return Object(i["a"])({url:"/programme/insert",method:"post",data:e})},u=function(e){return Object(i["a"])({url:"/programme/detail/"+e,method:"get"})}},6630:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-table",{attrs:{data:e.tableData}},e._l(e.tableOpt,(function(t,i){return a("el-table-column",{key:i,attrs:{label:t.label},scopedSlots:e._u([{key:"default",fn:function(i){var o=i.row;return[t.input?[t.number?a("el-input-number",{attrs:{placeholder:"请输入"+t.label,min:.01,step:.01,"controls-position":"right"},model:{value:o[t.value],callback:function(a){e.$set(o,t.value,a)},expression:"row[item.value]"}}):a("el-input",{model:{value:o[t.value],callback:function(a){e.$set(o,t.value,a)},expression:"row[item.value]"}})]:[a("span",[e._v(e._s(o[t.value]))])]]}}],null,!0)})})),1)},o=[],n={model:{prop:"tableData",event:"tableDataUpdata"},props:{tableData:{type:Array,required:!0},tableOpt:{type:Array,required:!0}},watch:{tableData:{handler:function(e){this.$emit("tableDataUpdata",e)},deep:!0}}},l=n,r=a("2877"),s=Object(r["a"])(l,i,o,!1,null,null,null);t["default"]=s.exports},"72ed":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{directives:[{name:"loading",rawName:"v-loading",value:e.pageLoading,expression:"pageLoading"}]},[a("div",{staticClass:"page"},[a("div",{staticClass:"baseTitle"},[a("div",{staticClass:"baseTitle-left"},[a("span",[e._v("产品基本信息")])]),e._v(" "),a("div",{staticClass:"divider"})]),e._v(" "),a("FormList",{ref:"programme",attrs:{formList:e.formList,baseForm:e.programme}})],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.itemLoading,expression:"itemLoading"}],staticClass:"page"},[a("div",{staticClass:"baseTitle"},[a("div",{staticClass:"baseTitle-left"},[a("span",[e._v("赔偿项目")])]),e._v(" "),a("div",{staticClass:"divider"})]),e._v(" "),a("InputTable",{attrs:{tableData:e.indemnityList,tableOpt:e.indemnityOpt}})],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.itemLoading,expression:"itemLoading"}],staticClass:"page"},[a("div",{staticClass:"baseTitle"},[a("div",{staticClass:"baseTitle-left"},[a("span",[e._v("职业")])]),e._v(" "),a("div",{staticClass:"divider"})]),e._v(" "),a("InputTable",{attrs:{tableData:e.occupationList,tableOpt:e.occupationOpt}})],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.itemLoading,expression:"itemLoading"}],staticClass:"page"},[a("div",{staticClass:"baseTitle"},[a("div",{staticClass:"baseTitle-left"},[a("span",[e._v("升级方案")])]),e._v(" "),a("div",{staticClass:"divider"}),e._v(" "),a("div",{staticClass:"title-right"},[a("i",{staticClass:"el-icon-edit-outline"}),e._v(" "),a("el-button",{attrs:{type:"text",disabled:0===e.temp_occupationList.length},on:{click:function(t){return e.showAddTableData()}}},[e._v("\r\n            新增\r\n          ")])],1)]),e._v(" "),a("el-table",{attrs:{data:e.schemeTableData}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("InputTable",{attrs:{tableData:i.items,tableOpt:e.occupationOpt}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"additionalCode",label:"方案编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"additionalName",label:"方案名称"}})],1)],1),e._v(" "),a("div",{staticClass:"button"},[a("el-button",{on:{click:function(t){return e.$router.go(-1)}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.save()}}},[e._v("提交")])],1),e._v(" "),a("el-dialog",{attrs:{title:"新增方案",visible:e.dialog.show,width:"30%"},on:{"update:visible":function(t){return e.$set(e.dialog,"show",t)}}},[a("FormList",{ref:"formList_tableOpt",attrs:{formList:e.dialog.formList,baseForm:e.dialog.form}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialog.show=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addTable()}}},[e._v("确 定")])],1)],1)],1)],1)},o=[],n=(a("ac6a"),a("5df3"),a("2b43")),l=a("22c9"),r=a("6630"),s={components:{FormList:l["default"],InputTable:r["default"]},data:function(){return{formList:[{value:"programmeCode",label:"方案编号",span:7},{value:"programmeName",label:"方案名称",span:7,offset:1},{value:"productId",label:"关联产品",span:7,offset:1,type:"select",options:[],optionSet:{label:"productName",value:"productId"}},{value:"factor",label:"整单调整系数",type:"number",span:7},{value:"minFactor",label:"录单时最低调整系数",type:"number",span:7,offset:1},{value:"maxFactor",label:"录单时最高调整系数",type:"number",span:7,offset:1}],programme:{programmeCode:"",programmeName:"",factor:"",maxFactor:"",minFactor:"",productId:"",productPersonnelId:""},indemnityList:[],indemnityOpt:[{value:"indemnityCode",label:"编号"},{value:"indemnityName",label:"名称"},{value:"indemnityContent",label:"内容",input:!0}],occupationList:[],occupationOpt:[{value:"occupationCode",label:"编号"},{value:"occupationName",label:"名称"},{value:"occupationPrice",label:"单价",input:!0,number:!0}],temp_occupationList:[],schemeTableData:[],dialog:{show:!1,formList:[{value:"additionalCode",label:"方案编号",span:24,required:!1},{value:"additionalName",label:"方案名称",span:24}],form:{additionalCode:"",additionalName:"",items:[]}},programmeId:this.$route.query.programmeId,detail:!1,pageLoading:!1,itemLoading:!1}},watch:{"programme.productId":{handler:function(e){var t=this;e&&(this.itemLoading=!0,Object(n["a"])(e).then((function(e){var a=e.data,i=a.indemnity,o=a.occupation;if(t.temp_occupationList=JSON.parse(JSON.stringify(o)),t.detail)return t.detail=!1,void(t.itemLoading=!1);t.indemnityList=i,t.occupationList=o,t.itemLoading=!1})))},deep:!0}},created:function(){var e=this;Object(n["c"])({pageNum:1,pageSize:99999}).then((function(t){var a=t.data;e.formList.map((function(e){"productId"===e.value&&(e.options=a.records)}))})),this.programmeId&&(this.pageLoading=!0,Object(n["b"])(this.programmeId).then((function(t){var a=t.data;for(var i in e.indemnityList=a.indemnity,e.occupationList=a.occupation,e.schemeTableData=a.additional,e.detail=!0,e.programme)e.programme[i]=a.programme[i];e.programme.productProgrammeId=e.programmeId,e.pageLoading=!1})))},methods:{showAddTableData:function(){this.dialog.form.items=JSON.parse(JSON.stringify(this.temp_occupationList)),this.dialog.show=!0},addTable:function(){this.schemeTableData.push(this.dialog.form),this.dialog={show:!1,formList:[{value:"additionalCode",label:"方案编号",span:24,required:!1},{value:"additionalName",label:"方案名称",span:24}],form:{additionalCode:"",additionalName:"",items:[]}}},save:function(){var e=this,t=this.$refs.programme;Promise.all([t.validate()]).then((function(){var t=Object.assign({},{indemnity:e.indemnityList,occupation:e.occupationList,programme:e.programme,additional:e.schemeTableData});Object(n["f"])(t).then((function(t){t.data;e.$message({message:"".concat(e.programmeId?"编辑":"新增","成功"),type:"success"}),e.$router.go(-1)}))}))}}},u=s,d=(a("f028"),a("2877")),c=Object(d["a"])(u,i,o,!1,null,"5c2ff760",null);t["default"]=c.exports},bca4:function(e,t,a){"use strict";var i=a("f81f"),o=a.n(i);o.a},f028:function(e,t,a){"use strict";var i=a("28d9"),o=a.n(i);o.a},f81f:function(e,t,a){}}]);