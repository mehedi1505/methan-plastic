const {Schema,model,mongoose} = require('mongoose');

const assetClosureSchema = new Schema({
    asset_id : {
        type:Schema.ObjectId,
        required:true
    },
    closure_date : {
        type:Date,
        default: Date.now()
    }, 
    closure_reason: {
        type:String,
        required:true
    },
    closure_note: {
        type:String,
        default:null
    },
    entered_by : {
        type:String,
        default:null
    },
    entered_date :{
        type:String,
        default:null
    },
    updated_by : {
        type:String,
        default:null
    },
    updated_date :{
        type:String,
        default:null
    }

},{timestamps : true});

module.exports = model('assetClosures',assetClosureSchema);