(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1502740e"],{"119d":function(t,e,a){},"161b":function(t,e,a){"use strict";a.d(e,"d",(function(){return s})),a.d(e,"e",(function(){return n})),a.d(e,"f",(function(){return l})),a.d(e,"c",(function(){return r})),a.d(e,"b",(function(){return o})),a.d(e,"a",(function(){return c}));var i=a("b775");function s(t){return Object(i["a"])({url:"/attConf/carConfig/".concat(t),method:"get"})}function n(){return Object(i["a"])({url:"/attConf/policyConfig",method:"get"})}function l(t){return Object(i["a"])({url:"/attConf/save/label",method:"post",data:t})}function r(t){return Object(i["a"])({url:"/attConf/delete/label",method:"post",data:t})}function o(t){return Object(i["a"])({url:"/attConf/delete/item",method:"post",data:t})}function c(t){return Object(i["a"])({url:"/attConf/upsert/item",method:"post",data:t})}},2696:function(t,e,a){},"370c":function(t,e,a){"use strict";var i=a("2696"),s=a.n(i);s.a},3752:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"data-collection"},[[t._t("collectionTitle")],t._v(" "),a("transition",{attrs:{name:"draw"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.boxSata,expression:"boxSata"}],staticClass:"data-collection-item"},[t._t("collectionCentent")],2)])],2)])},s=[],n={props:{boxSata:{type:Boolean,default:!1}}},l=n,r=a("2877"),o=Object(r["a"])(l,i,s,!1,null,null,null);e["default"]=o.exports},"4e66":function(t,e,a){"use strict";var i=a("119d"),s=a.n(i);s.a},5077:function(t,e,a){"use strict";a.d(e,"d",(function(){return s})),a.d(e,"a",(function(){return n})),a.d(e,"c",(function(){return l})),a.d(e,"b",(function(){return r})),a.d(e,"e",(function(){return o})),a.d(e,"k",(function(){return c})),a.d(e,"g",(function(){return u})),a.d(e,"h",(function(){return d})),a.d(e,"i",(function(){return m})),a.d(e,"m",(function(){return p})),a.d(e,"f",(function(){return f})),a.d(e,"l",(function(){return h})),a.d(e,"j",(function(){return v}));var i=a("b775");function s(t){return Object(i["a"])({url:"/carClaims/query",method:"post",data:t})}function n(t){return Object(i["a"])({url:"/carClaims/detail/".concat(t),method:"get"})}function l(t){return Object(i["a"])({url:"/carClaims/follow/query/".concat(t),method:"post"})}function r(t){return Object(i["a"])({url:"/carClaims/follow/commit",method:"post",data:t})}function o(t,e){return Object(i["a"])({url:"/odscar/material/detail/".concat(t,"/").concat(e||0),method:"get"})}function c(t){return Object(i["a"])({url:"/odscar/material/save",method:"post",data:t})}function u(t){return Object(i["a"])({url:"/nonCarClaims/query",method:"post",data:t})}function d(t){return Object(i["a"])({url:"/nonCarClaims/detail/".concat(t),method:"get"})}function m(t){return Object(i["a"])({url:"/ods/material/detail/".concat(t,"/0"),method:"post"})}function p(t){return Object(i["a"])({url:"/ods/material/save",method:"post",data:t})}function f(t){return Object(i["a"])({url:"/nonCarClaims/follow/query/".concat(t),method:"post"})}function h(t){return Object(i["a"])({url:"/nonCarClaims/follow/commit",method:"post",data:t})}function v(t){return Object(i["a"])({url:"/file/upload",method:"post",data:t})}},"512d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-reveal"},t._l(t.listData.children,(function(e,i){return a("div",{key:i,staticClass:"details-content-item"},[e.name?a("div",{staticClass:"content-item-header"},[a("div",{staticClass:"item-header-icon"}),t._v("\n        "+t._s(e.name)+"\n      ")]):t._e(),t._v(" "),a("div",{staticClass:"content-item-bar"},["browse"===e.type?t._l(e.children,(function(i,s){return a("el-row",{key:s},t._l(i,(function(i,s){return a("el-col",{key:s,attrs:{span:i.span||8}},[a("el-descriptions",[a("el-descriptions-item",{attrs:{label:i.name}},["images"===i.type?[a("img",{staticClass:"item-bar-images",attrs:{src:t.listDetailsData[e.model]?t.listDetailsData[e.model][i.model]:"",alt:""}})]:"date"===i.type?[t._v("\n                    "+t._s(t.listDetailsData[e.model]?t.transformationDate(t.listDetailsData[e.model][i.model]):"")+"\n                  ")]:"address"===i.type?[t._v("\n                    "+t._s(t.listDetailsData[e.model]?""+t.listDetailsData[e.model][i.model1]+t.listDetailsData[e.model][i.model2]+t.listDetailsData[e.model][i.model3]+t.listDetailsData[e.model][i.model4]:"")+"\n                  ")]:[a("span",[t._v("\n                      "+t._s(t.listDetailsData[e.model]?t.listDetailsData[e.model][i.model]:"")+"\n                    ")])]],2)],1)],1)})),1)})):t._e(),t._v(" "),"Array"===e.type?t._l(t.listDetailsData[e.model],(function(i,s){return a("el-row",{key:s},t._l(e.children,(function(e,s){return a("el-col",{key:s,attrs:{span:8}},[a("el-descriptions",[a("el-descriptions-item",{attrs:{label:e.name}},[t._v("\n                  "+t._s(i[e.model])+"\n                ")])],1)],1)})),1)})):t._e(),t._v(" "),"table"===e.type?[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.listDetailsData[e.model],border:"","header-cell-style":t.pageTableHead}},t._l(e.children,(function(t,e){return a("el-table-column",{key:e,attrs:{prop:t.model,fixed:t.fixed,label:t.name}})})),1)]:t._e(),t._v(" "),"text"===e.type?[a("el-row",t._l(t.listDetailsData[e.model],(function(i,s){return a("el-col",{key:s,attrs:{span:24}},[a("div",{staticClass:"item-bar-text"},[t._v(t._s(i[e.val]))])])})),1)]:t._e(),t._v(" "),"collapse"===e.type?[a("div",{staticClass:"page-collapse-item"},[t.listDetailsData[e.model]&&t.listDetailsData[e.model].length?a("el-collapse",t._l(t.listDetailsData[e.model],(function(s,n){return a("el-collapse-item",{key:n,attrs:{title:""+e.name+(i+1),name:n}},t._l(e.children,(function(e,i){return a("el-row",{key:i},t._l(e,(function(i,n){return a("el-col",{key:n,attrs:{span:8}},[a("el-descriptions",[a("el-descriptions-item",{attrs:{label:i.name}},["images"===e.type?[a("img",{staticClass:"item-bar-images",attrs:{src:s[i.model],alt:""}})]:"date"===e.type?[t._v("\n                          "+t._s(t.transformationDate(s[i.model]))+"\n                        ")]:"address"===e.type?[t._v("\n                          "+t._s(s[i.model])+"\n                        ")]:[a("span",[t._v("\n                            "+t._s(s[i.model])+"\n                          ")])]],2)],1)],1)})),1)})),1)})),1):t._e()],1)]:t._e()],2)])})),0)},s=[],n=a("dce3"),l={props:{listData:{type:Object,default:function(){return{}}},listDetailsData:{type:Object,default:function(){return{}}}},methods:{transformationDate:function(t){return n["a"](t)},pageTableHead:function(){return"text-align: center; background: #F6F7F9; color: #222222; font-size: 13px; font-weight: bold; padding: 0;"}}},r=l,o=(a("4e66"),a("2877")),c=Object(o["a"])(r,i,s,!1,null,"c89ee16c",null);e["default"]=c.exports},7514:function(t,e,a){"use strict";var i=a("5ca1"),s=a("0a49")(5),n="find",l=!0;n in[]&&Array(1)[n]((function(){l=!1})),i(i.P+i.F*l,"Array",{find:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(n)},"8a06":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingState,expression:"loadingState"}],staticClass:"compensate-details"},[a("div",{staticClass:"compensate-details-subject"},[a("div",{staticClass:"details-subject-header"},[a("div",{staticClass:"subject-header-title"},[a("div",{staticClass:"header-title-name"},[t._v("资料收集")]),t._v(" "),a("div",{staticClass:"header-title-name",on:{click:t.addThreeInfo}},[t._v("新增三者")])]),t._v(" "),a("div",{staticClass:"subject-header-from"},t._l(t.materialDetail,(function(e,i){return a("div",{key:i,staticClass:"item"},["ADD"===e.status?a("dataCollection",{attrs:{boxSata:e.choose}},[a("template",{slot:"collectionTitle"},[a("div",{staticClass:"page-collapse-title"},[a("div",{staticClass:"collapse-title-left",on:{click:function(a){return t.openCollapse(e,i)}}},[a("div",{staticClass:"title-left-icon",class:{"title-left-icon_a":e.choose}}),t._v("\n                  "+t._s("Subject"===e.materialType?"标的":"三者")+"\n                ")]),t._v(" "),a("div",{staticClass:"collapse-title-right"},[a("div",{staticClass:"title-right-name",on:{click:function(a){return t.copyUploadUrl(e)}}},[t._v("复制上传链接")]),t._v(" "),a("div",{staticClass:"title-right-name",on:{click:function(a){return t.addDataType(e.materialType)}}},[t._v("新增资料类型")]),t._v(" "),"Subject"!==e.materialType?a("div",{staticClass:"title-right-name",on:{click:function(e){return t.deleteDataType(i)}}},[t._v("删除三者")]):t._e()])])]),t._v(" "),a("template",{slot:"collectionCentent"},t._l(e.types,(function(i,s){return a("div",{key:s,staticClass:"header-from-item"},["ADD"===i.status?a("dataCollection",{attrs:{boxSata:i.choose}},[a("template",{slot:"collectionTitle"},[a("div",{staticClass:"page-collapse-title"},[a("div",{staticClass:"collapse-title-left",on:{click:function(a){return t.openTwoStage(e,s)}}},[a("div",{staticClass:"title-left-icon",class:{"title-left-icon_a":i.choose}}),t._v("\n                        "+t._s(i.labelName)+"\n                      ")]),t._v(" "),"物损资料"===i.labelName||"人伤资料"===i.labelName?a("div",{staticClass:"collapse-title-right"},[a("div",{staticClass:"title-right-name",on:{click:function(a){return t.addMeans(e,s)}}},[t._v(t._s("新增"+i.labelName))])]):t._e(),t._v(" "),"车损资料"!==i.labelName&&"物损资料"!==i.labelName&&"人伤资料"!==i.labelName?a("div",{staticClass:"collapse-title-right"},[a("div",{staticClass:"title-right-name",on:{click:function(a){return t.cutOutMeans(e,s)}}},[t._v(t._s("删除资料"))])]):t._e()])]),t._v(" "),a("template",{slot:"collectionCentent"},["车损资料"===i.labelName||"物损资料"===i.labelName||"人伤资料"===i.labelName?t._l(i.items,(function(s,n){return a("div",{key:n,staticClass:"header-from-item"},["ADD"===s.status?a("dataCollection",{attrs:{boxSata:s.choose}},[a("template",{slot:"collectionTitle"},[a("div",{staticClass:"page-collapse-title"},[a("div",{staticClass:"collapse-title-left"},[a("div",{staticClass:"title-left-icon",class:{"title-left-icon_a":s.choose},on:{click:function(a){return t.openTertiary(e,n)}}}),t._v(" "),a("div",{staticClass:"title-left-input"},["车损资料"===i.labelName?a("input",{directives:[{name:"model",rawName:"v-model",value:s.numberPlate,expression:"Sitem.numberPlate"}],attrs:{type:"text",placeholder:"请输入车牌号"},domProps:{value:s.numberPlate},on:{input:function(e){e.target.composing||t.$set(s,"numberPlate",e.target.value)}}}):t._e(),t._v(" "),"物损资料"===i.labelName?a("input",{directives:[{name:"model",rawName:"v-model",value:s.thingName,expression:"Sitem.thingName"}],attrs:{type:"text",placeholder:"请输入物损名称"},domProps:{value:s.thingName},on:{input:function(e){e.target.composing||t.$set(s,"thingName",e.target.value)}}}):t._e(),t._v(" "),"人伤资料"===i.labelName?a("input",{directives:[{name:"model",rawName:"v-model",value:s.personName,expression:"Sitem.personName"}],attrs:{type:"text",placeholder:"请输入伤者姓名"},domProps:{value:s.personName},on:{input:function(e){e.target.composing||t.$set(s,"personName",e.target.value)}}}):t._e()])]),t._v(" "),"Subject"===e.materialType?["车损资料"!==i.labelName?a("div",{staticClass:"collapse-title-right"},[a("div",{staticClass:"title-right-name",on:{click:function(a){return t.deleteMeans(e,n)}}},[t._v(t._s("删除"+i.labelName))])]):t._e()]:[a("div",{staticClass:"collapse-title-right"},[a("div",{staticClass:"title-right-name",on:{click:function(a){return t.deleteMeans(e,n)}}},[t._v(t._s("删除"+i.labelName))])])]],2)]),t._v(" "),a("template",{slot:"collectionCentent"},[a("div",{staticClass:"header-from-item"},t._l(s.remarks,(function(n,l){return a("div",{directives:[{name:"show",rawName:"v-show",value:"ADD"===n.status,expression:'Citem.status === "ADD"'}],key:l,staticClass:"header-from-tag"},[a("div",{staticClass:"from-tag-header"},[a("div",{staticClass:"tag-header-input"},[a("el-input",{attrs:{placeholder:"请输入附件名称"},model:{value:n.attName,callback:function(e){t.$set(n,"attName",e)},expression:"Citem.attName"}})],1),t._v(" "),a("div",{staticClass:"tag-header-input"},[a("el-input",{attrs:{placeholder:"请输入备注"},model:{value:n.attRemark,callback:function(e){t.$set(n,"attRemark",e)},expression:"Citem.attRemark"}})],1),t._v(" "),a("div",{staticClass:"tag-header-check"},[a("el-checkbox",{attrs:{"true-label":"Y"},model:{value:n.required,callback:function(e){t.$set(n,"required",e)},expression:"Citem.required"}},[t._v("必填")])],1),t._v(" "),(i.labelName,[1!==t.getReduceButtonState(s.remarks)?a("div",{staticClass:"tag-header-reduce",on:{click:function(a){return t.deleteEnclosure("children",e,l)}}}):t._e()]),t._v(" "),a("div",{staticClass:"tag-header-add",on:{click:function(a){return t.addEnclosure("children",e)}}}),t._v(" "),a("div",{staticClass:"tag-header-upload"},[a("div",{staticClass:"header-upload-tab"},[a("i",{staticClass:"el-icon-upload2"}),t._v(" "),a("input",{attrs:{type:"file",accept:"image/*"},on:{change:function(a){return t.uploadFile(a,e,l)}}})])])],2),t._v(" "),a("div",{staticClass:"from-tag-base"},t._l(n.atts,(function(i,s){return a("div",{key:s,staticClass:"tag-base-list"},[i.attPath&&"ADD"===i.status?a("div",{staticClass:"base-list-item"},[a("i",{staticClass:"el-icon-paperclip"}),t._v(" "),a("div",{staticClass:"list-item-name"},[t._v(t._s("这是一份"+n.attName+"的附件_"+(s+1)))]),t._v(" "),a("i",{staticClass:"el-icon-close",on:{click:function(a){return t.deleteUploadFile(e,l,i.attPath)}}})]):t._e()])})),0)])})),0)])],2):t._e()],1)})):[a("div",{staticClass:"header-from-item"},t._l(i.items[0].remarks,(function(i,s){return a("div",{key:s,staticClass:"header-from-tag"},["ADD"===i.status?[a("div",{staticClass:"from-tag-header"},[a("div",{staticClass:"tag-header-input"},[a("el-input",{attrs:{placeholder:"请输入附件名称"},model:{value:i.attName,callback:function(e){t.$set(i,"attName",e)},expression:"Sitem.attName"}})],1),t._v(" "),a("div",{staticClass:"tag-header-input"},[a("el-input",{attrs:{placeholder:"请输入备注"},model:{value:i.attRemark,callback:function(e){t.$set(i,"attRemark",e)},expression:"Sitem.attRemark"}})],1),t._v(" "),a("div",{staticClass:"tag-header-check"},[a("el-checkbox",{attrs:{"true-label":"Y"},model:{value:i.required,callback:function(e){t.$set(i,"required",e)},expression:"Sitem.required"}},[t._v("必填")])],1),t._v(" "),a("div",{staticClass:"tag-header-reduce",on:{click:function(a){return t.deleteEnclosure("items",e,s)}}}),t._v(" "),a("div",{staticClass:"tag-header-add",on:{click:function(a){return t.addEnclosure("items",e)}}}),t._v(" "),a("div",{staticClass:"tag-header-upload"},[a("div",{staticClass:"header-upload-tab"},[a("i",{staticClass:"el-icon-upload2"}),t._v(" "),a("input",{attrs:{type:"file",accept:"image/*"},on:{change:function(a){return t.uploadFile(a,e,s,"items")}}})])])]),t._v(" "),a("div",{staticClass:"from-tag-base"},t._l(i.atts,(function(n,l){return a("div",{key:l,staticClass:"tag-base-list"},[n.attPath&&"ADD"===n.status?a("div",{staticClass:"base-list-item"},[a("i",{staticClass:"el-icon-paperclip"}),t._v(" "),a("div",{staticClass:"list-item-name"},[t._v(t._s("这是一份"+i.attName+"的照片附件_"+(l+1)))]),t._v(" "),a("i",{staticClass:"el-icon-close",on:{click:function(a){return t.deleteUploadFile(e,s,n.attPath,"items")}}})]):t._e()])})),0)]:t._e()],2)})),0)]],2)],2):t._e()],1)})),0)],2):t._e()],1)})),0),t._v(" "),a("div",{staticClass:"subject-header-button"},[a("div",{staticClass:"header-button-item",on:{click:t.setMaterialSave}},[t._v("保存")])])]),t._v(" "),a("div",{staticClass:"details-subject-base"},[a("div",{staticClass:"subject-base-head"},t._l(t.headList,(function(e,i){return a("div",{key:i,staticClass:"base-head-item",class:{"base-head-item_a":e.choose},on:{click:function(a){return t.changeHeadItem(e)}}},[t._v(t._s(e.name))])})),0),t._v(" "),a("div",{staticClass:"subject-base-content"},[a("div",{staticClass:"base-content-item"},[a("pageReveal",{attrs:{listData:t.getPageReveallList(),listDetailsData:t.carClaimsDetailList}})],1)])])]),t._v(" "),a("div",{staticClass:"compensate-details-step"},[a("div",{staticClass:"details-step-header"},[a("div",{staticClass:"step-header-name"},[t._v("跟踪情况")]),t._v(" "),a("div",{staticClass:"step-header-button",on:{click:function(e){t.trackInfoState=!0}}},[a("div",{staticClass:"header-button-icon"}),t._v("\n        新增跟踪\n      ")])]),t._v(" "),a("div",{staticClass:"details-step-list"},[t.carClaimsFollow.length>0?a("el-timeline",t._l(t.carClaimsFollow,(function(e,i){return a("el-timeline-item",{key:i},[a("div",{staticClass:"step-list-head"},[a("div",{staticClass:"list-head-name"},[t._v(t._s(t.transformationDate(e.createTime)))]),t._v("\n            "+t._s(e.createUser)+"\n          ")]),t._v(" "),a("div",{staticClass:"step-list-item"},[t._v(t._s(e.content))])])})),1):a("div",{staticClass:"step-list-item_no"},[t._v("当前案件暂无进展")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"新增资料类型",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-input",{attrs:{placeholder:"请输入资料类型名称"},model:{value:t.addDataTypeName,callback:function(e){t.addDataTypeName=e},expression:"addDataTypeName"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmAdd}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.addThreeState,expression:"addThreeState"}],attrs:{title:"新增跟踪情况",visible:t.trackInfoState,width:"30%"},on:{"update:visible":function(e){t.trackInfoState=e}}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入新增跟踪情况"},model:{value:t.trackInfoContent,callback:function(e){t.trackInfoContent=e},expression:"trackInfoContent"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.getCarClaimsFollowCommit}},[t._v("确 定")])],1)],1)],1)},s=[],n=(a("7f7f"),a("5530")),l=(a("7514"),a("ac6a"),a("512d")),r=a("3752"),o=a("e2c1"),c=a("dce3"),u=a("5077"),d=a("161b"),m={data:function(){return{headList:[{name:"保单信息",model:"",choose:!0},{name:"报案信息",model:""},{name:"立案信息",model:""},{name:"定损信息",model:""},{name:"理算信息",model:""},{name:"结案信息",model:""}],materialDetail:[],defaultDetail:[],carClaimsFollow:[],carClaimsDetailList:{},loadingState:!1,dialogVisible:!1,addThreeState:!1,trackInfoState:!1,addDataTypeStat:"",addDataTypeName:"",trackInfoContent:""}},components:{pageReveal:l["default"],dataCollection:r["default"]},created:function(){this.getCarClaimsDetail(),this.getMaterialDetail(),this.getCarClaimsFollowQuery()},methods:{addThreeInfo:function(){var t=this;this.defaultDetail.forEach((function(e){"three"===e.materialType&&t.materialDetail.push(e)}))},copyUploadUrl:function(t){var e=this;this.loadingState=!0,u["k"](this.materialDetail).then((function(a){e.loadingState=!1;var i="hash"===e.$router.mode?"http://".concat(window.location.host,"/business_web/#/"):"http://".concat(window.location.host,"/business_web/"),s="".concat(i,"uploadFile?pageType=carInsurance&shoeType=").concat(t.materialType,"&registNo=").concat(e.$route.query.registNo,"&accidentNo=").concat(e.$route.query.accidentNo,"&modeId=").concat(t.id),n=document.createElement("input");n.value=s,document.body.appendChild(n),n.select(),document.execCommand("Copy"),n.className="oInput",n.style.display="none",e.$message.success("复制成功")})).catch((function(){e.loadingState=!1}))},addDataType:function(t){this.dialogVisible=!0,this.addDataTypeStat=t},deleteDataType:function(t){this.materialDetail=this.materialDetail.map((function(e,a){return a===t&&(e.status="DELETE"),e}))},confirmAdd:function(){var t=this;if("车损资料"!==this.addDataTypeName&&"物损资料"!==this.addDataTypeName&&"人伤资料"!==this.addDataTypeName){var e={id:"",items:[{id:"",numberPlate:"",personAge:"",personCardNo:"",personName:"",personSex:"",status:"ADD",thingName:"",remarks:[{attName:"",attRemark:"",atts:[],id:"",status:"ADD"}]}],labelName:this.addDataTypeName,status:"ADD"};this.materialDetail=this.materialDetail.map((function(a){return a.materialType===t.addDataTypeStat&&a.types.push(e),a})),this.dialogVisible=!1,this.$message.success("新增成功")}else this.$message.error("".concat(this.addDataTypeName,"已存在,无法新增"))},openCollapse:function(t,e){this.materialDetail=this.materialDetail.map((function(a,i){return a.choose?a.choose=!1:a.choose=t.materialType===a.materialType&&i===e,a}))},openTwoStage:function(t,e){this.materialDetail=this.materialDetail.map((function(t){return t.choose&&(t.types=t.types.map((function(t,a){return t.choose?t.choose=!1:t.choose=a===e,t}))),t}))},openTertiary:function(t,e){this.materialDetail=this.materialDetail.map((function(t){return t.choose&&(t.types=t.types.map((function(t){return t.choose&&(t.items=t.items.map((function(t,a){return t.choose?t.choose=!1:t.choose=a===e,t}))),t}))),t}))},addMeans:function(t,e){var a=this;this.materialDetail=this.materialDetail.map((function(i){return i.choose&&(i.types=i.types.map((function(i,s){return s===e&&i.choose&&a.defaultDetail.forEach((function(e){e.materialType===t.materialType&&e.types.forEach((function(t){t.labelName===i.labelName&&i.items.push({id:"",numberPlate:"",personAge:"",personCardNo:"",personName:"",personSex:"",thingName:"",status:"ADD",remarks:t.items[0].remarks})}))})),i}))),i}))},cutOutMeans:function(t,e){this.materialDetail=this.materialDetail.map((function(t){return t.choose&&(t.types=t.types.map((function(t,a){return a===e&&(t.status="DELETE"),t}))),t}))},deleteMeans:function(t,e){this.materialDetail=this.materialDetail.map((function(t){return t.choose&&(t.types=t.types.map((function(t){return t.choose&&(t.items=t.items.map((function(t,a){return a===e&&(t.status="DELETE"),t}))),t}))),t}))},deleteEnclosure:function(t,e,a){this.materialDetail=this.materialDetail.map((function(i){return i.materialType===e.materialType&&(i.types=i.types.map((function(e){return e.choose&&("children"===t?e.items=e.items.map((function(t){return t.choose&&(t.remarks=t.remarks.map((function(t,e){return e===a&&(t.status="DELETE"),t}))),t})):"items"===t&&(e.items[0].remarks=e.items[0].remarks.map((function(t,e){return e===a&&(t.status="DELETE"),t})))),e}))),i}))},addEnclosure:function(t,e){this.materialDetail=this.materialDetail.map((function(a){return a.materialType===e.materialType&&(a.types=a.types.map((function(e){return e.choose&&("children"===t?e.items=e.items.map((function(t){return t.choose&&t.remarks.push({attName:"",attRemark:"",atts:[],id:"",required:"",status:"ADD"}),t})):"items"===t&&e.items[0].remarks.push({attName:"",attRemark:"",atts:[],id:"",required:"",status:"ADD"})),e}))),a}))},setMaterialSave:function(){for(var t=this,e=0;e<this.materialDetail.length;e++){var a=this.materialDetail[e];if("ADD"===a.status)for(var i=0;i<a.types.length;i++){var s=a.types[i];if("物损资料"===s.labelName||"人伤资料"===s.labelName||"车损资料"===s.labelName)for(var n=s.items.filter((function(t){return"ADD"===t.status})),l=0;l<n.length;l++){var r=n[l];if("车损资料"===s.labelName&&0!==n.length){if(!r.numberPlate)return void this.$message.error("".concat("Subject"===a.materialType?"标的":"三者","车损资料车牌号不能为空"));var o=r.remarks.find((function(t){return!t.attName&&"ADD"===t.status}));if(o)return void this.$message.error("请完善".concat("Subject"===a.materialType?"标的":"三者","车损资料").concat(r.numberPlate,"附件名称, 或删除"))}if("物损资料"===s.labelName&&0!==n.length){if(!r.thingName)return void this.$message.error("".concat("Subject"===a.materialType?"标的":"三者","物损资料物损名称不能为空"));var c=r.remarks.find((function(t){return!t.attName&&"ADD"===t.status}));if(c)return void this.$message.error("请完善".concat("Subject"===a.materialType?"标的":"三者","物损资料").concat(r.thingName,"附件名称, 或删除"))}if("人伤资料"===s.labelName&&0!==n.length){if(!r.personName)return void this.$message.error("".concat("Subject"===eelement.materialType?"标的":"三者","人伤资料伤者姓名不能为空"));var d=r.remarks.find((function(t){return!t.attName&&"ADD"===t.status}));if(d)return void this.$message.error("请完善".concat("Subject"===a.materialType?"标的":"三者","人伤资料").concat(r.personName,"附件名称, 或删除"))}}else if("ADD"===s.status){var m=s.items[0].remarks,p=m.find((function(t){return!t.attName&&"ADD"===t.status}));if(p)return void this.$message.error("请完善".concat("Subject"===a.materialType?"标的":"三者").concat(s.labelName,"附件名称, 或删除"))}}}this.loadingState=!0,u["k"](this.materialDetail).then((function(e){t.loadingState=!1,t.$message.success("资料保存成功")})).catch((function(){t.loadingState=!1}))},getReduceButtonState:function(t){var e=t.filter((function(t){return"ADD"===t.status}));return e.length},transformationDate:function(t){return c["a"](t)},changeHeadItem:function(t){this.headList=this.headList.map((function(e){return Object(n["a"])(Object(n["a"])({},e),{},{choose:t.name===e.name})}))},deleteUploadFile:function(t,e,a,i){this.materialDetail=this.materialDetail.map((function(s){return s.materialType===t.materialType&&(s.types=s.types.map((function(t){return t.choose&&("items"===i?t.items[0].remarks=t.items[0].remarks.map((function(t,i){return i===e&&(t.atts=t.atts.map((function(t){return t.attPath===a&&(t.status="DELETE"),t}))),t})):t.items=t.items.map((function(t){return t.choose&&(t.remarks=t.remarks.map((function(t,i){return i===e&&(t.atts=t.atts.map((function(t){return t.attPath===a&&(t.status="DELETE"),t}))),t}))),t}))),t}))),s}))},uploadFile:function(t,e,a,i){var s=this,n=t.target.files,l=new FormData;l.append("file",n[0]),this.loadingState=!0,u["j"](l).then((function(t){s.loadingState=!1,s.materialDetail=s.materialDetail.map((function(s){return s.materialType===e.materialType&&(s.types=s.types.map((function(e){return e.choose&&("items"===i?e.items[0].remarks=e.items[0].remarks.map((function(e,i){return i===a&&e.atts.push({attPath:t.data,id:"",status:"ADD"}),e})):e.items=e.items.map((function(e){return e.choose&&(e.remarks=e.remarks.map((function(e,i){return i===a&&e.atts.push({attPath:t.data,id:"",status:"ADD"}),e}))),e}))),e}))),s}))})).catch((function(){s.loadingState=!1}))},getPageReveallList:function(){var t=(new o["a"]).getCarInsuranceDetailsArray(),e=this.headList.find((function(t){return t.choose})),a=t.find((function(t){return t.name===e.name}));return a},getCarClaimsDetail:function(){var t=this;u["a"](this.$route.query.registNo).then((function(e){t.carClaimsDetailList=e.data}))},getCarClaimsFollowQuery:function(){var t=this;u["c"](this.$route.query.registNo).then((function(e){e.data&&(t.carClaimsFollow=e.data)}))},getCarClaimsFollowCommit:function(){var t=this;this.trackInfoContent?(this.addThreeState=!0,u["b"]({accidentNo:this.$route.query.registNo,content:this.trackInfoContent}).then((function(e){t.addThreeState=!1,t.trackInfoState=!1,"Success"===e.msg&&t.getCarClaimsFollowQuery()})).catch((function(){t.addThreeState=!1}))):this.$message.error("请输入跟踪详情")},getMaterialDetail:function(){var t=this;this.loadingState=!0,u["e"](this.$route.query.accidentNo).then((function(e){0===e.data.length?Object(d["d"])("all").then((function(e){t.loadingState=!1,t.defaultDetail=t.handleMaterialDetail(e.data),t.materialDetail=t.handleMaterialDetail(e.data)})).catch((function(){t.loadingState=!1})):(Object(d["d"])("all").then((function(e){t.defaultDetail=t.handleMaterialDetail(e.data)})),t.loadingState=!1,t.materialDetail=e.data,t.materialDetail=t.materialDetail.map((function(t,e){return t.types=t.types.map((function(t,e){return t.items=t.items.map((function(t,e){return Object(n["a"])(Object(n["a"])({},t),{},{choose:0===e})})),Object(n["a"])(Object(n["a"])({},t),{},{choose:0===e})})),Object(n["a"])(Object(n["a"])({},t),{},{choose:0===e})})))})).catch((function(){t.loadingState=!1}))},handleMaterialDetail:function(t){var e=this,a=[];return t.forEach((function(t){var i={},s=[];t.config.forEach((function(t){var e=[],a=[];t.items.forEach((function(t){var e=[{id:"",attPath:"",status:"ADD"}];a.push({atts:e,status:"ADD",id:"",attName:t.attachmentName,attRemark:t.attachmentRemark})})),e.push({id:"",numberPlate:"",personAge:"",personCardNo:"",personName:"",personSex:"",thingName:"",status:"ADD",remarks:a}),s.push({id:"",labelName:t.labelName,status:"ADD",items:e})})),i.materialType=t.type,i.accidentNo=e.$route.query.accidentNo,i.id="",i.types=s,i.status="ADD",a.push(i)})),a=a.map((function(t,e){return t.types=t.types.map((function(t,e){return t.items=t.items.map((function(t,e){return Object(n["a"])(Object(n["a"])({},t),{},{choose:0===e})})),Object(n["a"])(Object(n["a"])({},t),{},{choose:0===e})})),Object(n["a"])(Object(n["a"])({},t),{},{choose:0===e})})),a}}},p=m,f=(a("370c"),a("2877")),h=Object(f["a"])(p,i,s,!1,null,"557fd777",null);e["default"]=h.exports},bee2:function(t,e,a){"use strict";function i(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,a){return e&&i(t.prototype,e),a&&i(t,a),t}a.d(e,"a",(function(){return s}))},d4ec:function(t,e,a){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}a.d(e,"a",(function(){return i}))}}]);