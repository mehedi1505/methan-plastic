const {Schema,model,mongoose} = require('mongoose');

const assetRegisterSchema = new Schema({
    asset_name : {
        type:String,
        required:true,
    },
    asset_type_id : {
        type:Schema.ObjectId,
        required:true
    },
    purchase_date : {
        type:Date,
        default: Date.now()
    }, 
    asset_origin: {
        type:String,
        default:null
    },
    asset_price : {
        type:Number,
        required:true
    },
    asset_note: {
        type:String,
        default:null
    },
    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'active'
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
assetRegisterSchema.index({
    asset_name: 'text'
})

module.exports = model('assetregisters',assetRegisterSchema);
