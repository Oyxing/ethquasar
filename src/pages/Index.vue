<template>
  <q-page class="flex" style="width: 100%;">
     <q-layout-footer>
      <!-- 任何内容 -->
       <q-item class="list">
          <q-btn class="list_1 no-shadow" @click="transferopened = true">
            <q-item-main label="转账" />
          </q-btn>
          <q-btn class="list_2 no-shadow">
            <q-item-main label="收款" />
          </q-btn>
        </q-item>
    </q-layout-footer>
    <q-scroll-area style="width: 100%; height:cacl(100vh - 130px);background:#ccc;" 
    :thumb-style="{
        right: '3px',
        borderRadius: '2px',
        background: '#ccc',
        width: '5px',
        opacity: 0.6
      }"
  :delay="1500">
          <q-item>
            交易记录 
            <q-btn class="float-right no-shadow" icon="refresh" style="font-size:16px;cursor: pointer;" @click="loaded"></q-btn>
          </q-item>
          <q-item style="margin:10px 0px;" v-for="(item,key) in record" :key="key">
              <span class="iconfont " :class="{'icon-shiftto':item.dropup,'icon-rollout':!item.dropup}"></span>
              <div style="margin:0px 10px;width:70%">
                <p style="margin:0px;">{{item.site}}</p>
                <small>{{item.starttime}}</small>
              </div>
              <span>
                {{item.dropup?'-':'+'}}{{item.sum}}
              </span>
          </q-item>
      </q-scroll-area>
       <q-modal v-model="transferopened">
            <q-btn
              class="no-shadow float-right"
              @click="transferopened = false"
              label="关闭"
            />
               <div class="modelform">
           <q-field
              :label-width="5"
              label="钱包地址"
            >
              <q-input class="inputsize" v-model="form.address" 
              @blur="$v.form.address.$touch"
              :error="$v.form.address.$error"
              placeholder="请输入钱包 地址" />
            </q-field>
            <q-field
              :label-width="5"
              label="钱包金额"
            >
              <q-input class="inputsize" v-model="form.sum" 
              @blur="$v.form.sum.$touch"
              :error="$v.form.sum.$error"
              placeholder="请输入转账 金额" />
            </q-field>
            <q-field
              :label-width="5"
              label="绑定手机"
            >
              <q-input class="inputsize" v-model="form.phone" 
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
            </q-item>
            <q-field
                >  
                <small>
                  可用余额：22
                </small>
                <small class="float-right">
                  费用 ：0.1
                </small>
            </q-field>
            <q-field
                >  
               <q-input class="inputsize" v-model="form.remark" placeholder="转账 备注" />
            </q-field>
          </div>
            <q-btn
            class="no-shadow float-right"
            style="margin-right:20px;"
            @click="submitlead"
            label="转账"
          />
      </q-modal>
  </q-page>
</template>

<style>
</style>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { regex } from "vuelidate/lib/validators/common.js"
var phone = regex('phone', /^1(3|4|5|7|8)\d{9}$/);
export default {
  name: 'PageIndex',
  
  data(){
    return {
      form:{},
      transferopened:false,
      record:[
        {
            site:"123456a45a4a5a5",
            starttime:"starttime",
            dropup:true,
            sum:"5"
        },
        {
            site:"123456a45a4a5a5",
            starttime:"starttime",
            dropup:false,
            sum:6
        },
        {
            site:"123456a45a4a5a5",
            dropup:false,
            starttime:"starttime",
            sum:8
        },{
            site:"123456a45a4a5a5",
            dropup:true,
            starttime:"starttime",
            sum:0.5
        }

      ],
      coinbase:"sssss",
      balance:[],
      useraccount:""
    }
  },
   validations: {
    form: {
      address: {
          required,
      },
      sum: {
          required,
      },
      phone: {
          required,phone
      },
      phonecode: {
          required,
      }
    }
  },
  created() {
    var seft = this
  //  async function bugDemo(){
        seft.getCoinbase()
        seft.getAccounts()
        seft.getBalance()
        // console.log('clear the loading~')
    // }
    // bugDemo()
    // this.transaction()
  },
  methods:{
    getAccounts(){
        this.$web3js.eth.getAccounts()
          .then((data)=>{
              console.log('getAccounts')
              console.log(data)
              this.accounts = data
          })
          .catch((err)=>{
            console.log(err)
          })

    },
    getCoinbase(){
      this.$web3js.eth.getCoinbase()
      .then((data)=>{
          console.log('data')
          console.log(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getBalance(){
      var balance = []
      // for(var i = 0 ; i < this.accounts.length ; i++){
        console.log('this.accounts')
        this.$web3js.eth.getBalance("0x66260eBF56526145F237859734b26DE3Dd1DA022")
          .then((data)=>{
            console.log('getBalance')
            console.log(data)
        })
      // }
    },
    queryaccounts(){
      // console.log(this.web3)
      // for (var key in this.web3.eth.accounts){
      //   if(this.web3.eth.accounts[key] == this.coinbase){
      //     this.useraccount = "是"
      //   }
      // }
      // 0x519ca9f6cbef2e0269a773fc4027f5ceb59a0bd7
    },
    transaction(){
      
      // var Accounts = this.web3.personal.listAccounts
      // // console.log('this.web3.eth.coinbase')
      // // console.log(this.web3.eth.coinbase)
      // var unlock = this.web3.personal.unlockAccount(this.web3.eth.accounts,"67468915c4a")
      //  console.log('unlock')
      //  console.log(unlock)
      // var signTransaction = this.web3.eth.sendTransaction({
      //     from:this.web3.eth.accounts,
      //   //  gasPrice: "20000000000",
      //    // gas: "21000",
      //     to: Accounts[1],
      //     value: this.web3.toWei("50"),
      //    // data: ""
      // })
      // console.log("signTransaction")
      // console.log(signTransaction)
     
    },
    // 转账
    submitlead(){
      // console.log(this.form)
      //  this.$v.form.$touch()
      //   if(this.$v.form.$error){
      //     this.$q.notify('请再次查看字段.')
      //     return
      //   }
      //   console.log("this.form")
      //   console.log(this.form)
    },
    loaded(){
      // console.log("刷新")
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