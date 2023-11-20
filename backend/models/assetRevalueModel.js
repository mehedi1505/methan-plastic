const {Schema,model,mongoose} = require('mongoose');

const assetRevalueSchema = new Schema({
    asset_id : {
        type:Schema.ObjectId,
        required:true
    },
    revalue_date : {
        type:Date,
        default: Date.now()
    }, 
    revalue_price: {
        type:Number,
        required:true
    },
    revalue_note: {
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

module.exports = model('assetRevalues',assetRevalueSchema);