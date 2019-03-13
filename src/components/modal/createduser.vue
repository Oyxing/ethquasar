<template>
    <div>
         <q-btn
            class="no-shadow float-right"
            @click="creatopened = false"
            label="关闭"
          />
       <div class="modelform">
          <!-- <q-field
            :label-width="5"
            label="绑定邮箱"
          >
            <q-input class="inputsize" v-model="form.email"
              @blur="$v.form.email.$touch"
              @keyup.enter="submit"
              :error="$v.form.email.$error"
              placeholder="绑定邮箱" />
          </q-field> -->
          <!-- <q-field
            :label-width="5"
            label="绑定手机"
          >
            <q-input class="inputsize" v-model="form.phone" placeholder="设置手机号" />
          </q-field> -->
          <!-- <q-item style="padding:0px;">
             <q-field
              label="手机验证码"
            >
              <q-input class="inputsize" v-model="form.wallet" placeholder="设置钱包名称" />
            </q-field>
             <q-field
              >  
            <q-btn
                  flat
                  label="发送验证码"
                />
            </q-field>
          </q-item> -->
          <q-field
            :label-width="5"
            label="钱包名称"
          >
            <q-input class="inputsize" v-model="form.wallet" placeholder="设置钱包名称" />
          </q-field>
        <q-field
            :label-width="5"
            label="输入密码"
          >
          <q-input class="inputsize" v-model="form.pwd" type="password" no-pass-toggle placeholder="由字符和数字组成 不少于8个字符" />
          </q-field>
          <q-field
            :label-width="5"
            label="重新输入密码"
          > <q-input class="inputsize" v-model="form.anewpwd" type="password" :error="form.pwd != form.anewpwd" no-pass-toggle placeholder="重新输入密码" />
          </q-field>
       </div>
        <q-btn
            class="no-shadow float-right"
            style="margin-right:20px;"
            @click="submit"
            label="创建账户"
          />
    </div>
</template>
<script>
export default {
    data(){
      return {
            form:{
                phone:"",
                wallet:"",
                pwd:"",
                anewpwd:"",
                email:""
            },
      }
    } 
}
</script>