webpackJsonp([9],{fFTO:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),s=a("exGp"),o=a.n(s),c=a("Dd8w"),i=a.n(c),u=a("S2w5"),d=a("NYxO"),l={name:"",data:function(){return{storeId:"",searchContent:"",companyName:"",columns:[{title:"品名",key:"name",width:180},{title:"SKU名",key:"sku",width:160},{title:"图片",key:"img_url",render:function(e,t){return e("img",{attrs:{src:t.row.img_url}})}},{title:"操作",key:"action",align:"center",render:function(e,t){return e("div",[e("a",{class:{"num-tag":!0},attrs:{href:"printtag:fnsku/"+t.row.barcode+"/"+t.row.product_name+"/2"}},"2"),e("a",{class:{"num-tag":!0},attrs:{href:"printtag:fnsku/"+t.row.barcode+"/"+t.row.product_name+"/10"}},"10"),e("a",{class:{"num-tag":!0},attrs:{href:"printtag:fnsku/"+t.row.barcode+"/"+t.row.product_name+"/20"}},"20"),e("a",{class:{"num-tag":!0},attrs:{href:"printtag:fnsku/"+t.row.barcode+"/"+t.row.product_name+"/50"}},"50"),e("a",{class:{"num-tag":!0},attrs:{href:"printtag:fnsku/"+t.row.barcode+"/"+t.row.product_name+"/100"}},"100")])}}],lists:[]}},computed:i()({},Object(d.c)(["globalStoreIdGr"])),watch:{globalStoreIdGr:function(){this._getStoreId()}},methods:i()({},Object(d.b)(["getStoreId","fetchAfterLoginData"]),{searchAcion:function(){var e=this;return o()(n.a.mark(function t(){var a,r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.searchSKU({search:e.searchContent,store_id:e.storeId},!0);case 2:a=t.sent,e.$responseMessage(a.data,200,"",!0)||(r=[],a.data.msg.forEach(function(e){e.warehouse_sku.barcode=e.barcode,e.warehouse_sku.product_name=e.product_name.split(" ").join("_"),e.warehouse_sku.skuname=e.skuname,r.push(e.warehouse_sku)}),e.lists=r);case 4:case"end":return t.stop()}},t,e)}))()},deleteCompany:function(e){var t=this;return o()(n.a.mark(function a(){var r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,u.a.deleteCompany(e,!0);case 2:r=a.sent,t.$responseMessage(r.data,200);case 4:case"end":return a.stop()}},a,t)}))()},ok:function(){var e=this;window.setTimeout(o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$requiredInVerify(e.companyName,"公司名")){t.next=3;break}return e.modalLoadingAtion(),t.abrupt("return");case 3:return t.next=5,u.a.createNewCompany({company_name:e.companyName});case 5:a=t.sent,e.companyName="",e.$responseMessage(a.data,201,"",!0)?e.modalLoadingAtion():(e.showModal=!1,e.successTip(a.data.msg));case 8:case"end":return t.stop()}},t,e)})))},_getStoreId:function(){var e=this;return o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getStoreId();case 2:if(e.storeId=t.sent,!e.storeId){t.next=6;break}t.next=14;break;case 6:return t.next=8,e.fetchAfterLoginData();case 8:if(!(a=t.sent)||!a.data.msg.store_list){t.next=14;break}return t.next=12,e.getStoreId();case 12:e.storeId=t.sent,e.storeId||e.$Message.warning("请选择店铺！");case 14:case"end":return t.stop()}},t,e)}))()}}),created:function(){this._getStoreId()}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"manage-box"},[a("div",{staticClass:"cm-form"},[a("Input",{staticStyle:{width:"120px"},attrs:{placeholder:"请输入SKU",clearable:""},model:{value:e.searchContent,callback:function(t){e.searchContent=t},expression:"searchContent"}}),e._v(" "),a("Button",{staticClass:"search",attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.searchAcion(t)}}},[e._v("搜索")])],1),e._v(" "),a("div",{staticClass:"cm-table tag-table"},[a("Table",{attrs:{border:"",stripe:"",columns:e.columns,data:e.lists}})],1)])},staticRenderFns:[]};var f=a("VU/8")(l,m,!1,function(e){a("iG0Y")},null,null);t.default=f.exports},iG0Y:function(e,t){}});
//# sourceMappingURL=9.6920b68627d4dc0a666e.js.map