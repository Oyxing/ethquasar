<template>
  <q-page class="flex ">
      <div class="modelform">
            <q-field
              :label-width="5"
              label="支付密码"
            >
            <q-input class="inputsize" type="password" 
            v-model="form.pwd" placeholder="请输入钱包 地址" />
            </q-field> 
              <q-btn
                class="no-shadow "
                style="margin-right:20px;"
                @click="submitcreate"
                label="创建"
              />
              <q-btn
                class="no-shadow "
                style="margin-right:20px;"
                @click="readAccount"
                label="读取"
              />
              <!-- <q-btn
                class="no-shadow "
                style="margin-right:20px;"
                @click="submitremove"
                label="清除"
              /> -->
               <q-btn
                class="no-shadow"
                style="margin-right:20px;"
                @click="submdecode"
                label="解密"
              />
               <q-btn
                class="no-shadow"
                style="margin-right:20px;"
                @click="submdewallet"
                label="查询 钱包账户"
              />
              <q-btn
                class="no-shadow"
                style="margin-right:20px;"
                @click="submdeBalance" 
                label="查询 账户 余额"
              />
               <q-btn
                class="no-shadow"
                style="margin-right:20px;"
                @click="submdecoinbase" 
                label="查询 coinbase"
              />
               <q-btn
                class="no-shadow"
                style="margin-right:20px;"
                @click="submdeTransaction" 
                label="交易"
              />
              <q-btn
                class="no-shadow"
                style="margin-right:20px;"
                @click="submdeLogs" 
                label="Logs"
              />
              <q-btn
                class="no-shadow"
                style="margin-right:20px;"
                @click="gitnet" 
                label="net"
              />
            <q-btn
                class="no-shadow"
                style="margin-right:20px;"
                @click="removeFile" 
                label="removeFile"
              />
              <div v-for="(item,index) in decrypt" style="width:100%" :key="index">
                  {{item.address}}
              </div>
              {{BalanceArr}}
              <div v-for="(item,index) in BalanceArr" style="width:100%" :key="index">
                  {{item.address}}
                  {{item.ethNum}}
              </div>

      </div>
  </q-page>
</template>

<style>
</style>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import account from '../statics/js/account.js'
import {Net} from 'web3-net';
import { setTimeout } from 'timers';
const Tx = require('ethereumjs-tx');
export default {
  name: 'login',
  data() {
    return {
       form:{},
       encrypt:[],
       decrypt:[],
       BalanceArr:[],
       privateKey:''
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
    }
  },
  created() {
  },
  methods: {
    removeFile(){
      console.log('$removeFile')
      this.$removeFile()
    },
    gitnet(){
      this.$web3js.eth.getTransaction("0xa4e4da0e72d560ab1942677274d170412fcd85b5752481746f85f2afc4134b46").then(async(result) => {
                console.log('result')
                console.log(result)
            }).catch((err) => {
                err = err
            });
    },
    // 记录
    submdeLogs(){
          account.transactionRecord({_this:this}).then((result) => {
            console.log('result')
            console.log(result)
          }).catch((err) => {
            
          });
    },
    //  直接 创建 
    submitcreate(){
      var createAccount = account.createAccount({pwd:'oyxing',_this:this}).then((data)=>{
        console.log(data)
        this.decrypt = data
      })
    },
    readAccount(){
      account.readAccount({_this:this}).then((read)=>{
        console.log('read')
        console.log(read)
        var decrypt = this.$web3js.eth.accounts.wallet.decrypt(read,'oyxing');
        console.log('decrypt')
        console.log(decrypt)
      })
    },
    submitremove(){
        var walletaccount = this.$web3js.eth.accounts.wallet 
        var walletcreate = this.$web3js.eth.accounts.wallet.remove(walletaccount[2].address);
        console.log('walletcreate')
        console.log(walletcreate)
    },
    // 解密
    submdecode(){
      var decrypt = this.$web3js.eth.accounts.wallet.decrypt(this.encrypt,'oyxing');
      console.log('this.decrypt')
      console.log(decrypt)
    },
    // 查询 钱包账户
    submdewallet(){
      var account = this.$web3js.eth.accounts.wallet
      console.log('account')
      console.log(account)
      this.decrypt = account
    },
    submdeBalance(){
      // console.log('submdeBalance')
      // var walletaccount = this.$web3js.eth.accounts.wallet
      // console.log('walletaccount')
      // console.log(walletaccount)
      //   if(walletaccount){
      //     for(var i = 0 ; i < walletaccount.length;i++){
      //            var walletaccountaddress = walletaccount[i].address

              // this.$web3js.eth.getBalance("0x6bCFE5D473D246fC87314f639443b3dc9066b7f6").then((Balance) => {
              //   alert("0x6bCFE5D473D246fC87314f639443b3dc9066b7f6")
              //   console.log('Balance')
              //   console.log(Balance)
              //   const ethNum = this.$web3js.utils.fromWei(Balance, 'ether')
              //   console.log('ethNum')
              //   console.log(ethNum) 
              //     this.BalanceArr = {"ethNum":ethNum,"address":"0x6bCFE5D473D246fC87314f639443b3dc9066b7f6"}
              // }).catch((err) => {
              //     alert('err')
              //     alert(err)
              //   console.log('err')
              //   console.log(err)

              // });

          //     }
          // }
            const Tx = require('ethereumjs-tx');
              var wallet = this.$web3js.eth.accounts.wallet 
              // 0x
              console.log(wallet[0].privateKey)
              const privateKey = new Buffer('11b18e84636b495b0a9633c11e7c587a2f61a8c880a91ee5e190d0da95ed34a7', 'hex')
              const rawTx = {
                nonce: this.$web3js.utils.toHex(1),
                gasLimit: this.$web3js.utils.toHex(40000),
                gasPrice: "0x3b9aca00",
                to: "0x397702470c5a4861f0984f526531f91f1784c235",         
                value: this.$web3js.utils.toHex(100000000000000000),
                data:'0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
              } 
              console.log("rawTx")
              console.log(rawTx)
            const tx = new Tx(rawTx);
              tx.sign(privateKey);
            console.log("2")

              const serializedTx = tx.serialize();
                     var serializedTxstr = serializedTx.toString('hex')
                     console.log('serializedTxstr')
                     console.log(serializedTxstr)


                    cordovaHTTP.post("http://10.1.1.152:8545", 
                       {
                        "jsonrpc":"2.0",
                        "method":"eth_sendRawTransaction",
                        "params":['0x'+serializedTxstr],
                        "id":67
                     }, 
                      {}, function(response){
                          if(response.status == 200){
                              response.data = JSON.parse(response.data);
                          }else{
                              console_log('load data server error');
                          }            
                      }, function(response) {
                          console.error('response.error');
                          console.error(response);
                          console.error(response.error);
                      });

                        

                  // cordovaHTTP.post("http://10.1.1.152:8545", {
                  //       "jsonrpc":"2.0",
                  //       "method":"eth_sendRawTransaction",
                  //       "params":['0x'+serializedTxstr],
                  //       "id":67
                  //    }, {"Content-Type": "application/json"}, function(entry) {
                  //         // prints the filename
                  //         console.log('entry.name');
                  //         console.log(entry);
                  //     }, function(response) {
                  //         console.error('response.error');
                  //         console.error(response);
                  //         console.error(response.error);
                  //     });




                //  var axioscreate =   this.$axios.create({
                //       baseURL: 'http://10.1.1.152:8545',
                //       timeout: 1000,
                //       headers: {'Content-Type': 'application/json'}
                //     });
                //     axioscreate.post("/",{
                //         jsonrpc:"2.0",
                //         method:"eth_sendRawTransaction",
                //         params:['0x'+serializedTx.toString('hex')],
                //         id:67
                //      })
                //       .then(function (response) {
                //         console.log('response');
                //         console.log(response);
                //       })
                //       .catch(function (error) {
                //         console.log('error');
                //         console.log(error);
                //       });



                  // console.log('wallet')
                  // console.log(wallet)
                  //   console.log(wallet[0].signTransaction)
                  //   console.log(wallet[1].signTransaction)
                  //       const txData = {
                  //               // nonce每次++，以免覆盖之前pending中的交易
                  //               nonce: this.$web3js.utils.toHex(0),
                  //               // 设置gasLimit和gasPrice
                  //               gasLimit: this.$web3js.utils.toHex(99000),
                  //               gasPrice: this.$web3js.utils.toHex(2000),
                  //               // 要转账的哪个账号  
                  //               to: wallet[1].address,
                  //               // 从哪个账号转
                  //               from: wallet[0].address,
                  //               // 0.001 以太币
                  //               value: this.$web3js.utils.toHex(1000000000000),
                  //           }
                  //           console.log('txData')
                  //           console.log(txData)
                  //           // 签名操作
                  //       wallet[0].signTransaction()




    },
    submdecoinbase(){
      console.log("Asdas")
      console.log(this.$web3js)
      this.$web3js.eth.getBalance("0x46431b98d1c23909a8ef3a4f586cc680eac7af10").then((Balance) => {
          alert("asdsadsad")
          const ethNum = this.$web3js.utils.fromWei(Balance, 'ether')
          console.log('ethNum')
          console.log(ethNum) 
        }).catch((err) => {
          alert('err')
          alert(err)
          alert(JSON.stringify(err))
        });
 
    },
    submdeTransaction(){
      var walletaccount = this.$web3js.eth.accounts.wallet 
        // 获取gas   0x19025ca77351859Cd1bF23D1D496714457fe870c  0x836d53890eD62cD917fABd9eb4d74D6E16C117e4
        console.log('walletaccount')
        console.log(walletaccount)
      var json ={
        _this:this,
        fromid:walletaccount[0].address,
        toaddress:walletaccount[1].address, 
        value:this.$web3js.utils.toWei('10', 'ether'),
        josndata:{data:{name:'0x19025ca77351859Cd1bF23D1D496714457fe870c'}}
      }
      console.log(json)
      account.Transaction(json,(data)=>{
          console.log("aaa====")
          console.log(data)
      }).catch((err) => {
        console.log("errTransaction")
          console.log(err)
      });
    }
  },
}
</script>
