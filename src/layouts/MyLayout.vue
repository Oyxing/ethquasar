<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
        <!-- 任何内容 -->
        <q-item>
          <img src="/statics/userpot.png" alt="" srcset="">
          <q-item style="width: 100%;">
            <div class="q-pa-sm" style="width:100%" >
                <p style="margin:none"> 用户</p> 
                <div style="width: 85%;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;">
                  <small
                    v-clipboard:copy="usersite"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                   class="balance iconfont icon-cope">
                  </small>
                    {{usersite}}
                    
                </div>
            </div>
          </q-item>
          <router-link to="/user/login">登录</router-link>
        </q-item>
        <q-item class="list">
          <q-item class="list_1" to="/" v-bind:class="{ active: this.$router.currentRoute.path == '/'?true:false }">
            <q-item-side class="iconfont icon-wallet" />
            <q-item-main label="钱包" />
          </q-item>
          <q-item class="list_2" to="/userlist" v-bind:class="{ active: this.$router.currentRoute.path == '/userlist'?true:false }">
            <q-item-side class="iconfont icon-account" />
            <q-item-main label="账户" />
          </q-item>
        </q-item>
    </q-layout-header>
     <q-page-container>
        <router-view />
      </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MyLayout',
  data () {
    return {
      usersite:"用户钱包地址",
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  created(){
    console.log(this.$router)
    console.log(this.$router.currentRoute.path)
  },
  methods: {
    openURL,
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  }
}
</script>

<style>
.iconfont{
  font-size:30px;
  color: #000;
}
.setico{
  position: absolute;
  right: 0px;
  vertical-align:middle;
}
.q-item.active, .q-item.router-link-active, .q-item:focus{
  background: none;
}
.list .active{
  border-bottom: 1px solid #ccc;
}
.q-list-highlight > .q-item:hover, .q-item-highlight:hover, .q-list-link > .q-item:hover, .q-item-link:hover{
  background: none;
}
.list .list_1,.list .list_2{
  width: 50%;
  text-align: center;
}
.balance.iconfont{
  margin-left: 5px;
  font-size: 15px;
}
</style>
