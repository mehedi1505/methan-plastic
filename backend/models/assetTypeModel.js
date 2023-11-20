const {Schema,model} = require('mongoose');

const assetTypeSchema = new Schema({
    asset_type_name : {
        type:String,
        required:true
    },
    asset_type_shortcode : {
        type:String,
        default:null
    },
    asset_type_note : {
        type:String,
        default:null
    },
    entered_by : {
        type:String,
        default:null
    },
    entered_date :{
        type:String,
        default:Date.now()
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
assetTypeSchema.index({
    asset_type_name: 'text',
})

module.exports = model('assettypes',assetTypeSchema);