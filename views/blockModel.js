const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var blockSchema = new Schema({
    hash: {
        type: String,
        required: "Hash du block requis"
    },
    Created_base: {
        type: Date,
        default: Date.now
    },
    miner: {
        type: String,
        default: "Unknown"
    },
    size: {
        type: Number
    },
    prev_block: {
        type: String
    },
    next_block: {
        type: String
    },
    n_tx: {
        type: Number
    },
    version: {
        type: Number
    },
    main_chain: {
        type: Boolean
    }
});

module.exports = mongoose.model('Blocks', blockSchema);
