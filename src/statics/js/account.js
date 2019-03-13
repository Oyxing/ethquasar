import { async } from 'q';

const path = require('path');


export default {
    async createAccount(data) {
        const pwd = data.pwd
            // 调用 web3 创建账户
        let account = await data._this.$web3js.eth.accounts.wallet.create(1)
        var result
        for (var i = 0; i < account.length; i++) {
            // encrypt 返回一个JSON 对象
            const keystoreJson = await account[i].encrypt(pwd)
                // 将 JSON 对象转为字符串
            const keystoreStr = JSON.stringify(keystoreJson)
                // 生成随机文件存储 keystore 的字符串
            const randFilename = "UTC--" + new Date().getTime() + "--" + account[i].address
                // 设置存储文件的目录
            const filePath = path.join(__dirname, "../keystore/" + randFilename)
                // 将 keystore 的内容写入文件中
            await data._this.$writeFile(filePath, keystoreStr)
                // 将 用户地址、私钥、keystore 数据返回
            result = { "account": account[i].address, "privateKey": account[i].privateKey, "keystore": filePath }
        }
        return result
    },
    async readAccount(data) {
        return new Promise(function(resolve, reject) {
            data._this.$readFile().then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        });
    },
    async Transaction(data, callback) {
        return new Promise(function(resolve, reject) {

            // 获取gas
            var wallet = data._this.$web3js.eth.accounts.wallet
            var Gasjson = {
                from: wallet[data.fromid].address,
                to: data.toaddress,
                value: data.value,
            }
            console.log(Gasjson)
            alert("estimateGas")
            console.log(data._this.$web3js)
                //  获取 gas
            data._this.$web3js.eth.estimateGas(Gasjson).then((gas) => {
                alert("Asdsad")
                    //  获取 GasPrice
                data._this.$web3js.eth.getGasPrice().then((GasPrice) => {
                    //  获取 nonce
                    data._this.$web3js.eth.getTransactionCount(wallet[data.fromid].address).then((nonce) => {
                        var stringify = JSON.stringify(data.josndata)
                        var datastr = data.josndata ? data._this.$web3js.utils.asciiToHex(stringify) : ""
                        const txData = {
                                // nonce每次++，以免覆盖之前pending中的交易
                                nonce: data._this.$web3js.utils.toHex(nonce++),
                                // 设置gasLimit和gasPrice
                                gasLimit: data._this.$web3js.utils.toHex(99000),
                                gasPrice: data._this.$web3js.utils.toHex(GasPrice),
                                // 要转账的哪个账号  
                                to: data.toaddress,
                                // 从哪个账号转
                                from: wallet[data.fromid].address,
                                // 0.001 以太币
                                value: data._this.$web3js.utils.toHex(data.value),
                                data: datastr
                            }
                            // 签名操作
                        wallet[data.fromid].signTransaction(txData, (err, tx) => {
                            if (tx) {
                                var raw = tx.rawTransaction;
                                // 交易
                                data._this.$web3js.eth.sendSignedTransaction(raw, (err, data) => {
                                    if (!err && err != null) {
                                        callback(data)
                                    } else {
                                        reject(err)
                                    }
                                })
                            }
                        })
                    }).catch((err) => {});
                }).catch((err) => {
                    console.log('err2')
                    console.log(err)
                    reject(err)
                });
            }).catch((err) => {
                console.log('err1')
                console.log(err)
                reject(err)
            });
        });
    },
    // 读出 区块 交易数据
    async transactionRecord(data) {
        var getBlockNumber = 0
        var err
            // 获取 块的高度
        await data._this.$web3js.eth.getBlockNumber().then((result) => {
            getBlockNumber = result
        }).catch((err) => {
            err = err
        });
        // 交易 哈希值
        var transactionsHexArr = []
        for (var i = 0; i < getBlockNumber; i++) {
            await data._this.$web3js.eth.getBlock(i).then((result) => {
                if (result.transactions.length > 0) {
                    for (var q = 0; q < result.transactions.length; q++) {
                        transactionsHexArr.push({ "transaction": result.transactions[q], "timestamp": result.timestamp })
                    }
                }
            }).catch((err) => {
                err = err
            });
        }
        var transactionsArr = []
        for (var i = 0; i < transactionsHexArr.length; i++) {
            await data._this.$web3js.eth.getTransaction(transactionsHexArr[i].transaction).then(async(result) => {
                if (result.input) {
                    var hexToAscii = await data._this.$web3js.utils.hexToAscii(result.input)
                }
                await transactionsArr.push({
                    timestamp: transactionsHexArr[i].timestamp,
                    from: result.from,
                    to: result.to,
                    value: result.value,
                    hash: result.hash,
                    data: hexToAscii ? JSON.parse(hexToAscii) : ""
                })
            }).catch((err) => {
                err = err
            });
        }
        return new Promise(function(resolve, reject) {
            resolve(transactionsArr)
        })
    }
}