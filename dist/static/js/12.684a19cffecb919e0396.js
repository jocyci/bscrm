webpackJsonp([12],{"1vRR":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),s=a.n(n),i=a("exGp"),o=a.n(i),r=a("S2w5"),c={name:"supplier",data:function(){var e=this;return this.isUpdate=!1,this.updateId="",{showModal:!1,modalLoading:!0,name:"",code:"",columns:[{title:"供货商全称",key:"name",width:130},{title:"供货商缩写代号",key:"code",width:150},{title:"操作",key:"action",align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"primary",size:"small"},style:{"margin-right":"9px"},on:{click:function(){e.updateSupplieAction(a.row)}}},"更新"),t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.deleteSupplie(a.row.id)}}},"删除")])}}],lists:[]}},methods:{getSupplierList:function(){var e=this;return o()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.a.searchSuppliers(null,!0);case 2:a=t.sent,e.$responseMessage(a.data,200,"",!0)||(e.lists=a.data.msg);case 4:case"end":return t.stop()}},t,e)}))()},deleteSupplie:function(e){var t=this;return o()(s.a.mark(function a(){var n;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.deleteSupplie(e,!0);case 2:n=a.sent,t.$responseMessage(n.data,204)||t.getSupplierList();case 4:case"end":return a.stop()}},a,t)}))()},updateSupplieAction:function(e){this.isUpdate=!0,this.updateId=e.id,this.openModel(),this.name=e.name,this.code=e.code},openModel:function(){this.showModal=!0},modalLoadingAtion:function(){var e=this;this.showModal=!0,this.modalLoading=!1,window.setTimeout(function(){e.modalLoading=!0},100)},ok:function(){var e=this;window.setTimeout(o()(s.a.mark(function t(){var a,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$requiredInVerify(e.name,"供货商全称")&&!e.$requiredInVerify(e.code,"供货商缩写代号")){t.next=3;break}return e.modalLoadingAtion(),t.abrupt("return");case 3:if(a=null,n="",!e.isUpdate){t.next=13;break}return t.next=8,r.a.updateSupplie(e.updateId,{name:e.name,code:e.code},!0);case 8:a=t.sent,e.isUpdate=!1,n=202,t.next=17;break;case 13:return t.next=15,r.a.createNewSupplie({name:e.name,code:e.code},!0);case 15:a=t.sent,n=201;case 17:e.$responseMessage(a.data,n,"",!0)||(e.showModal=!1,e.reset(),e.getSupplierList());case 18:case"end":return t.stop()}},t,e)})))},cancel:function(){this.reset()},reset:function(){this.isUpdate=!1,this.name="",this.code=""}},created:function(){this.getSupplierList()}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"manage-box"},[a("div",{staticClass:"cm-form"},[a("Button",{staticClass:"new-opa",attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.openModel(t)}}},[e._v("新增")])],1),e._v(" "),a("div",{staticClass:"cm-table",staticStyle:{width:"42%"}},[a("Table",{attrs:{border:"",stripe:"",columns:e.columns,data:e.lists}})],1)]),e._v(" "),a("Modal",{attrs:{title:"新增供货商",loading:e.modalLoading},on:{"on-ok":e.ok,"on-cancel":e.cancel},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("div",{staticClass:"modal-item supplier-mi"},[a("span",{staticClass:"vm"},[e._v("供货商全称：")]),e._v(" "),a("Input",{staticClass:"vm",staticStyle:{width:"200px"},attrs:{placeholder:"请输入",maxlength:60,clearable:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),e._v(" "),a("div",{staticClass:"modal-item supplier-mi"},[a("span",{staticClass:"vm"},[e._v("供货商缩写代号：")]),e._v(" "),a("Input",{staticClass:"vm",staticStyle:{width:"200px"},attrs:{placeholder:"请输入",maxlength:60,clearable:""},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}})],1)])],1)},staticRenderFns:[]};var d=a("VU/8")(c,l,!1,function(e){a("ggDo")},null,null);t.default=d.exports},ggDo:function(e,t){}});
//# sourceMappingURL=12.684a19cffecb919e0396.js.map