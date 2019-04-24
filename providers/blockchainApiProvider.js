const request = require('request');
const baseUrl = 'https://blockchain.info';

exports.getBlockInfo = function(hash){
    return new Promise((resolve, reject) => {
        request(baseUrl + '/rawblock/'+hash, function(error, response, body){
            try{
                body = JSON.parse(body);
                var blockInfo = {
                    "size" : body.size,
                    "prev_block": body.prev_block,
                    "next_block": body.next_block,
                }
                resolve(blockInfo);
            }catch(e){
                console.log(e);
                reject(false);
            }
        })
    });
};

exports.getBlockCount = function(req, res){
    request(baseUrl + '/q/getblockcount', function(error, response, body){
        if(error) res.send(error);
        res.json({"Current block number":body});
    })
};

exports.getInterval = function(req, res){
    request(baseUrl + '/q/interval', function(error, response, body){
        if(error) res.send(error);
        res.json({"Average interval between blocks ":body});
    })
};

exports.getBitcoinInfo = function(req, res){
    request(baseUrl + '/stats?format=json', function(error, response, body){
        if(error) res.send(error);
        res.json(body);
    })
};