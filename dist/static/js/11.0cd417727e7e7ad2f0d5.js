webpackJsonp([11],{"+oyk":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("Xxa5"),a=s.n(n),o=s("exGp"),r=s.n(o),i=s("Dd8w"),c=s.n(i),u=s("E9eC"),d=s.n(u),l=s("NYxO"),f={name:"",data:function(){return this.storeList=[],{storeId:"",host:window.location.host,storeName:""}},computed:c()({},Object(l.c)(["globalStoreIdGr"])),watch:{globalStoreIdGr:function(){this._getStoreId()},storeId:function(t){if(t){var e=this.storeList.filter(function(e){return+t==+e.id});e.length&&(this.storeName=e[0].Name)}}},methods:c()({},Object(l.b)(["getStoreId","fetchAfterLoginData"]),{_getStoreId:function(){var t=this;return r()(a.a.mark(function e(){var s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getStoreId();case 2:if(t.storeId=e.sent,t.storeId){e.next=12;break}return e.next=6,t.fetchAfterLoginData();case 6:if(!(s=e.sent)||!s.data.msg.store_list){e.next=12;break}return e.next=10,t.getStoreId();case 10:t.storeId=e.sent,t.storeId||t.$Message.warning("请选择店铺！");case 12:case"end":return e.stop()}},e,t)}))()},sucessLoad:function(){this.$Message.success("上传成功")},download:function(t,e){d()([t],e)},getStoreList:function(){var t=this;return r()(a.a.mark(function e(){var s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.fetchAfterLoginData();case 2:(s=e.sent)&&s.data&&(t.storeList=s.data.msg.store_list),t._getStoreId();case 5:case"end":return e.stop()}},e,t)}))()}}),created:function(){this.getStoreList()}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"manage-box"},[s("div",{staticClass:"as-btn"},[s("Upload",{attrs:{action:"/api/myi-file/?store_id="+t.storeId},on:{"on-success":t.sucessLoad}},[s("Button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"}},[t._v("上传“管理亚马逊库存”报告文件")])],1)],1),t._v(" "),s("div",{staticClass:"as-btn"},[s("Upload",{attrs:{action:"/api/warehouse-sku-file/"}},[s("Button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"}},[t._v('上传"本地库存商品信息"文件')])],1)],1),t._v(" "),s("div",{staticClass:"as-btn"},[s("Upload",{attrs:{action:"/api/amz-sku-mapping-file/?store_id="+t.storeId}},[s("Button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"}},[t._v('上传"店铺-本地商品映射"文件')])],1)],1),t._v(" "),s("div",{staticClass:"as-btn"},[s("Button",{attrs:{type:"primary"},nativeOn:{click:function(e){t.download("/api/warehouse-sku-file/","本地库存商品信息文件模板.txt")}}},[t._v('\n        下载"本地库存商品信息文件"模板\n      ')])],1),t._v(" "),s("div",{staticClass:"as-btn"},[s("Button",{attrs:{type:"primary"},nativeOn:{click:function(e){t.download("/api/amz-sku-mapping-file/?store_id="+t.storeId,"映射模板"+t.storeName+".xls")}}},[t._v('\n        下载"店铺-本地商品映射"模板\n      ')])],1)])])},staticRenderFns:[]};var v=s("VU/8")(f,p,!1,function(t){s("VrLK")},null,null);e.default=v.exports},VrLK:function(t,e){}});
//# sourceMappingURL=11.0cd417727e7e7ad2f0d5.js.map