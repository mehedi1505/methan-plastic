const {Schema,model,mongoose} = require('mongoose');

const assetDepreciationSchema = new Schema({
    asset_id : {
        type:Schema.ObjectId,
        required:true
    },
    depreciation_date : {
        type:Date,
        default: Date.now()
    }, 
    depreciation_price: {
        type:Number,
        required:true
    },
    depreciation_note: {
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

module.exports = model('assetDepreciations',assetDepreciationSchema);