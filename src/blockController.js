
Block = require('../views/blockModel');
const blockchainApiProvider = require('../providers/blockchainApiProvider');

exports.list_all_blocks = function(req, res){
    Block.find({},function(err, block){
        if(err) res.send(err);
        res.json(block);
    })
};

exports.create_a_block = function(req, res){
    var new_block = new Block(req.body);
    const promise = blockchainApiProvider.getBlockInfo(req.body.hash);


    promise.then(response => {
        new_block['size'] = JSON.stringify(response.size);
        new_block['prev_block'] = JSON.stringify(response.prev_block);
        new_block['next_block'] = JSON.stringify(response.next_block);
        new_block['n_tx'] = JSON.stringify(response.n_tx);
        new_block['version'] = JSON.stringify(response.version);
        new_block['main_chain'] = JSON.stringify(response.main_chain);
    }, error => {
        console.log("Hash error !");
    }).then( send => {
        Block.findOne({hash:new_block.hash},function(err, exist){
           if(exist){
               console.log("Block already created");
               res.json(exist);
           }else{
               new_block.save(function(err,block){
                   if(err) res.send(err);
                   res.json(block);
               })
           }
        });

    });
};

exports.read_a_block = function(req, res){
    Block.find({_id:req.params.blockId},function(err,block){
        if(err) res.send(err);
        res.json(block);
    })
};

exports.update_a_block = function(req, res){
    Block.findOneAndUpdate({_id:req.params.blockId},req.body,function(err,block){
        if(err) res.send(err);
        res.json(block);
    })
};

exports.delete_a_block = function(req, res){
    Block.deleteOne({id:req.params.id},function(err,block){
        if(err) res.send(err);
        res.json(block);
    })
};