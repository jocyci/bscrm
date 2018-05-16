<template>
  <div>
    <header class="header">
      <div class="header-left vm" :style="{'width': sidebarExpand ? maxValue : minValue}">
        <router-link to="/">
          <span class="mt10 vm" v-if="sidebarExpand">仓库管理</span>
          <span class="mt10 vm" v-else><Icon type="pie-graph"></Icon></span>
        </router-link>
      </div>
      <div class="header-right" :style="{'margin-left': sidebarExpand ? maxValue : minValue}">
        <span class="navicon-icon" @click="sidebarAction">
          <Icon type="navicon-round" class="sidebar-toggle"></Icon>
        </span>
        <div class="header-operate fr">
          <div class="download-report vm" v-if="!isUser">
            <span class="vm" @click="download">下载库存报表</span>
          </div>
          <div class="operate-select vm">
            <span class="operate-font vm">切换店铺</span>
            <Select v-model="storeId" style="width:100px">
                <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="line vm"></div>
          <div class="header-user vm">
            <Icon type="person" class="vm"></Icon>
            <span class="vm">{{username}}</span>
            <span class="vm quit" @click="quit">退出系统</span>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Util from '@/common/util'
import {mapActions, mapGetters} from 'vuex'
import multiDownload from '@/common/js/download'

export default {
  name: 'headerComponent',
  props: ['sidebarExpand', 'username', 'maxValue', 'minValue', 'storeList', 'sidebarToggle'],
  data () {
    return {
      storeId: '',
      isUser: false
    }
  },
  watch: {
    storeId (val) {
      this.updateStoreId({id: val})
    },
    storeList: {
      handler: function (val) {
        if (val.length) {
          this.storeId = val[0].value
        } else {
          this.storeId = null
        }
      },
      deep: true
    },
    afterLoginGetter (val) {
      if (val && val.view && val.view[0].route === 'user-controll') {
        this.isUser = true
      }
    }
  },
  computed: mapGetters(['afterLoginGetter']),
  methods: {
    ...mapActions(['updateStoreId']),
    sidebarAction () {
      this.$emit('sidebarToggle')
    },
    quit () {
      Util.clearCookie('token')
      this.$router.push('/login')
    },
    download () {
      multiDownload(['/api/warehouse-inventory/'], '库存报表.csv')
    }
  }
}
</script>

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #3c8dbc;
  z-index: 10;
}
.header-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 230px;
  height: 50px;
  background-color: #367fa9;
  color: #fff;
  border-bottom: 0 solid transparent;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-weight: 600;
  font-size: 20px;
}
.header-left a {
  color: #fff;
}
.header-left span {
  overflow: hidden;
  height: 30px;
}
.quit {
  font-size: 16px!important;
  font-weight: bolder;
  margin-left: 10px;
  cursor: pointer;
}
.quit:hover {
  color: #e08e0b;
  font-weight: bolder;
  text-decoration: underline;
}
.header-right {
  height: 100%;
}

.header-operate {
  padding-top: 10px;
  padding-right: 15px;
}
.operate-font {
  font-size: 12px;
  color: #fff;
  margin-top: 3px;
  margin-right: 7px;
}
.header-user i {
  margin-right: 5px;
}
.header-user i,
.header-user span{
  font-size: 15px;
  color: #fff;
}
.line {
  height: 20px;
  width: 2px;
  background-color: #fff;
  margin: 0 15px;
}
.download-report {
  color: #fff;
  font-weight: bolder;
  cursor: pointer;
  margin-right: 10px;
}
.download-report>span {
  font-size: 15px;
  color:coral;
}
.download-report>span:hover {
  text-decoration: underline;
  color: #ffb59a;
}
</style>
