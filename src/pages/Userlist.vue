<template>
  <q-page class="flex ">


    <q-scroll-area style="width: 100%; height:cacl(100vh - 130px); background:#ccc;" 
        :thumb-style="{
            right: '3px',
            borderRadius: '2px',
            background: '#ccc',
            width: '5px',
            opacity: 0.6
          }"
      :delay="1500">
      <div style="padding:10px 10px;">
          <q-item style="background:#fff;margin:10px 0px;" v-for="(itme,key) in accounts" :key="key">
              <img src="/statics/userpot.png" alt="" srcset="">
              <div class="user q-pa-sm">
                  <p>{{itme.name}}</p>
                  <small>{{itme.site}}</small>
              </div>
               <div class="balance q-pa-sm">
                  <p>余额</p>
                  <small>{{itme.balance}}</small>
              </div>
          </q-item>
      </div>
      </q-scroll-area>

    <q-layout-footer>
      <!-- 任何内容 -->
       <q-item class="list">
          <q-btn class="list_1 no-shadow" @click="creatopened = true">
            <q-item-main label="创建账户" />
          </q-btn>
          <q-btn class="list_2 no-shadow" @click="leadopened = true">
            <q-item-main label="导入账户" />
          </q-btn>
        </q-item>
    </q-layout-footer>
      <q-modal v-model="creatopened">
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
              :error="$v.form.email.$error"
              placeholder="绑定邮箱" />
          </q-field>
          <q-field
            :label-width="5"
            label="绑定手机"
          >
            <q-input class="inputsize" v-model.trim="form.phone"
              @blur="$v.form.phone.$touch"
              :error="$v.form.phone.$error"
              placeholder="设置手机号" />
          </q-field>
          <q-item style="padding:0px;">
             <q-field
              label="手机验证码"
            >
              <q-input class="inputsize" v-model="form.phonecode"
              @blur="$v.form.phonecode.$touch"
              :error="$v.form.phonecode.$error"
               placeholder="手机验证码" />
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
            <q-input class="inputsize" v-model="form.wallet" 
              @blur="$v.form.wallet.$touch"
              :error="$v.form.wallet.$error"
              placeholder="设置钱包名称" />
          </q-field>
        <q-field
            :label-width="5"
            label="输入密码"
          >
          <q-input class="inputsize" v-model="form.pwd" 
              @blur="$v.form.pwd.$touch"
              :error="$v.form.pwd.$error"
           type="password" no-pass-toggle placeholder="由字符和数字组成 不少于8个字符" />
          </q-field>
          <q-field
            :label-width="5"
            label="重新输入密码"
          > <q-input class="inputsize" v-model="form.anewpwd" @blur="$v.form.anewpwd.$touch"
           type="password" :error="!$v.form.anewpwd.samepwd" no-pass-toggle placeholder="重新输入密码" />
          </q-field>
       </div>
        <q-btn
            class="no-shadow float-right"
            style="margin-right:20px;"
            @click="submit"
            label="创建账户"
          />
      </q-modal>
      <q-modal v-model="leadopened">
            <q-btn
              class="no-shadow float-right"
              @click="leadopened = false"
              label="关闭"
            />
               <div class="modelform">
                  <q-field
                    :label-width="5"
                    label="绑定手机"
                  >
                    <q-input class="inputsize" v-model="formlead.phone" 
                      @blur="$v.formlead.phone.$touch"
                      :error="$v.formlead.phone.$error"
                    placeholder="设置手机号" />
                  </q-field>
                  <q-item style="padding:0px;">
                    <q-field
                      label="手机验证码"
                    >
                    <q-input class="inputsize" v-model="formlead.phonecode" 
                        @blur="$v.formlead.phonecode.$touch"
                        :error="$v.formlead.phonecode.$error"
                        placeholder="手机验证码" />
                    </q-field>
                    <q-field
                      >  
                    <q-btn
                          flat
                          label="发送验证码"
                        />
                    </q-field>
                  </q-item>
                </div>
            <q-btn
            class="no-shadow float-right"
            style="margin-right:20px;"
            @click="submitlead"
            label="导入账户"
          />
      </q-modal>
  </q-page>
</template>
<style>
</style>

<script>
import { required, email,sameAs, minLength } from 'vuelidate/lib/validators'
import { regex } from "vuelidate/lib/validators/common.js"
var phone = regex('phone', /^1(3|4|5|7|8)\d{9}$/);
export default {
  name: 'Userlist',
  data(){
      return {
        accounts:[ 
          {
            name:"oyx",
            site:"11222211", 
            balance:0.2,
          },
          {
            name:"oyx",
            site:"11222211", 
            balance:56,
          }
        ],
        form:{},
        formlead:{},
        leadopened:false,
        creatopened:false
      }
  },
  validations: {
    form: {
      // email: { required, email  },
      // phone: {
      //     required,phone
      // },
      // phonecode: {
      //     required,
      // },
      wallet: {
          required,
      },
      pwd: {
          required,
      },
      anewpwd: {
        samepwd: sameAs('pwd')
      },
    },
    formlead:{
      phone: {
          required,phone
      },
      phonecode: {
          required,
      },
    }
  },
  created(){
  },
  methods:{
    submit(){
      
      this.$web3js.eth.accounts.create(this.$web3js.utils.randomHex(this.form.anewpwd)).then((data)=>{
          console.log('data')
          console.log(data)
      })




      // this.$v.form.$touch()
      // if(this.$v.form.$error){
      //   this.$q.notify('请再次查看字段.')
      //   return
      // }
      // console.log("this.form")
      // console.log(this.form)
      // const web3 = this.$store.state.example.web3
      // // console.log("this.form")
      // // console.log(this.form)
      // // console.log(web3) personal newAccount 
      // console.log("web3.personal.newAccount('')")
      // console.log(web3.eth)
      // console.log(web3.eth.accounts)

      // var personalsite = web3.personal.newAccount(this.form.anewpwd)
      
      // console.log(personalsite)
     
      // var unlock = web3.personal.unlockAccount(personalsite,this.form.anewpwd)
      // console.log('unlock')
      // console.log(unlock)
      // var toHex = web3.toHex('oyxing');
      // console.log(toHex)
      // var sine = web3.personal.sign(
      //     toHex,personalsite,this.form.anewpwd
      // )
      // console.log('sine')
      // console.log(sine)


    },
    submitlead(){
      // // 导入
      // const web3 = this.$store.state.example.web3
      // var toHex = web3.toHex('oyxing');
      // console.log('toHex')
      // console.log(toHex)
      // var ecRecover = web3.personal.ecRecover(toHex, '0xe5254ea1df0bd3be74074c88cc1e847db0ec1359f30ce279afa8469a2e12768a5ec217bfa6215cdf65be9bbc64aae85f2719aed9ee8d4b688cdb3f06e10e8d941c')
      // console.log('ecRecover')
      // console.log(ecRecover)
      // //   this.$v.formlead.$touch()
      // //   if(this.$v.formlead.$error){
      // //   this.$q.notify('请再次查看字段.')
      // //   return
      // // }
      // //   console.log("this.formlead")
      // //   console.log(this.formlead)
    }
  }
}
</script>
<style>
  .inputsize{
    font-size:13px;
  }
  .q-field-label{
    color:#000;
    font-weight:600;
  }
  .modelform{
    margin:100px 0px 30px 0px;
    padding:10px 9px;
  }
  .user{
    width:65%;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .balance{
    text-align: center;
  }
</style>
