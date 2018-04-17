webpackJsonp([13],{bzpH:function(e,t){},oEwe:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("Xxa5"),r=s.n(a),n=s("exGp"),o=s.n(n),i=s("S2w5"),c={name:"authorize",data:function(){var e=this;return{modalLoading:!0,userId:"",storeId:"",showModal:!1,columns:[{title:"店铺名",key:"store__Name",width:130},{title:"店铺地区",key:"store__Market",width:130},{title:"用户姓名",key:"user__first_name",width:130},{title:"操作",key:"action",align:"center",render:function(t,s){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.deleteUserStore(s.row.user_id)}}},"删除授权")])}}],lists:[],userList:[],storeList:[]}},methods:{getUsers:function(){var e=this;return o()(r.a.mark(function t(){var s,a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.searchUser(null,!0);case 2:s=t.sent,a=s.data,e.$responseMessage(a,200,"",!0)||(n=[],a.msg.forEach(function(e){n.push({value:e.id,label:e.first_name})}),e.userList=n);case 5:case"end":return t.stop()}},t,e)}))()},getStores:function(){var e=this;return o()(r.a.mark(function t(){var s,a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.searchStores(!0);case 2:s=t.sent,a=s.data,e.$responseMessage(a,200,"",!0)||(n=[],a.msg.forEach(function(e){n.push({value:e.id,label:e.Name})}),e.storeList=n);case 5:case"end":return t.stop()}},t,e)}))()},searchAction:function(){var e=this;return o()(r.a.mark(function t(){var s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.searchUserStores(!0);case 2:s=t.sent,e.$responseMessage(s.data,200,"",!0)||(e.searchContent?e.lists=[s.data.msg]:e.lists=s.data.msg);case 4:case"end":return t.stop()}},t,e)}))()},deleteUserStore:function(e){var t=this;return o()(r.a.mark(function s(){var a;return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,i.a.deleteUserStore(e,!0);case 2:a=s.sent,t.$responseMessage(a.data,200),t.searchAction();case 5:case"end":return s.stop()}},s,t)}))()},openModel:function(){this.showModal=!0},modalLoadingAtion:function(){var e=this;this.showModal=!0,this.modalLoading=!1,window.setTimeout(function(){e.modalLoading=!0},100)},ok:function(){var e=this;window.setTimeout(o()(r.a.mark(function t(){var s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$requiredInVerify(e.userId,"用户")&&!e.$requiredInVerify(e.storeId,"店铺")){t.next=3;break}return e.modalLoadingAtion(),t.abrupt("return");case 3:return t.next=5,i.a.createNewUserStore({user_id:e.userId,store_id:e.storeId});case 5:s=t.sent,e.$responseMessage(s.data,201,"新增授权成功")||(e.showModal=!1,e.resetData(),e.searchAction());case 7:case"end":return t.stop()}},t,e)})))},resetData:function(){this.userId="",this.storeId=""},cancel:function(){this.resetData()},deleteStore:function(e){var t=this;return o()(r.a.mark(function s(){var a;return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,i.a.deleteStore(e);case 2:a=s.sent,t.$responseMessage(a.data,202,"删除成功")||t.searchAction();case 4:case"end":return s.stop()}},s,t)}))()}},created:function(){this.searchAction(),this.getUsers(),this.getStores()}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"manage-box"},[s("div",{staticClass:"cm-form"},[s("Button",{staticClass:"new-opa",attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.openModel(t)}}},[e._v("新增")])],1),e._v(" "),s("div",{staticClass:"cm-table user-store-table"},[s("Table",{attrs:{border:"",stripe:"",columns:e.columns,data:e.lists}})],1),e._v(" "),s("div",{},[s("Modal",{attrs:{title:"新建授权",okText:"授权",loading:e.modalLoading},on:{"on-ok":e.ok,"on-cancel":e.cancel},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[s("div",{staticClass:"modal-item user-mi"},[s("span",{staticClass:"vm"},[e._v("用户列表：")]),e._v(" "),s("Select",{staticStyle:{width:"130px"},model:{value:e.userId,callback:function(t){e.userId=t},expression:"userId"}},e._l(e.userList,function(t){return s("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}))],1),e._v(" "),s("div",{staticClass:"modal-item user-mi"},[s("span",{staticClass:"vm"},[e._v("店铺列表：")]),e._v(" "),s("Select",{staticStyle:{width:"130px"},model:{value:e.storeId,callback:function(t){e.storeId=t},expression:"storeId"}},e._l(e.storeList,function(t){return s("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}))],1)])],1)])},staticRenderFns:[]};var l=s("VU/8")(c,u,!1,function(e){s("bzpH")},null,null);t.default=l.exports}});
//# sourceMappingURL=13.1d680758741de321ab6f.js.map