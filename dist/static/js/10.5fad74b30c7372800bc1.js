webpackJsonp([10],{"3dCu":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Xxa5"),s=n.n(a),i=n("woOf"),r=n.n(i),u=n("exGp"),c=n.n(u),l=n("S2w5"),o={name:"inboundDetail",data:function(){return{header:{},content:[],columns:[{title:"品名",key:"name"},{title:"SKU名",key:"sku"},{title:"数量",key:"quantity_received",width:90}],lists:[]}},methods:{getInboundDetail:function(e){var t=this;return c()(s.a.mark(function n(){var a,i,u;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.a.getInboundDetail(e,!0);case 2:a=n.sent,i=a.data,t.$responseMessage(i,200,"",!0)||(u=[],t.header=i.msg.header,u=i.msg.content.map(function(e){return r()({},{quantity_received:e.quantity_received},e.sku)}),t.lists=u);case 5:case"end":return n.stop()}},n,t)}))()}},created:function(){this.getInboundDetail(this.$route.params.id)}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"manage-box ind-box"},[e._m(0),e._v(" "),n("ul",[n("li",[n("span",[e._v("入库单号：")]),n("span",[e._v(e._s(e.header.id))])]),e._v(" "),n("li",[n("span",[e._v("入库日期：")]),n("span",[e._v(e._s(e.header.time))])]),e._v(" "),n("li",[n("span",[e._v("容器数：")]),n("span",[e._v(e._s(e.header.container_count))])]),e._v(" "),n("li",[n("span",[e._v("物流信息：")]),n("span",[e._v(e._s(e.header.tracknumber))])]),e._v(" "),n("li",[n("span",[e._v("货件数量：")]),e._v(" "),n("span",{staticStyle:{width:"85%"}},[n("Table",{attrs:{columns:e.columns,data:e.lists}})],1)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"cm-form"},[t("header",{},[t("h1",[this._v("入库单详情")])])])}]};var _=n("VU/8")(o,d,!1,function(e){n("lhfq")},null,null);t.default=_.exports},lhfq:function(e,t){}});
//# sourceMappingURL=10.5fad74b30c7372800bc1.js.map