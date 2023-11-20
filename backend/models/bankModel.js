const {Schema,model} = require('mongoose');

const bankSchema = new Schema({
    bank_name : {
        type:String,
        required:true
    },
    bank_short_name : {
        type:String,
        required:true
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
bankSchema.index({
    bank_name: 'text',
    bank_short_name: 'text',
})
module.exports = model('banks',bankSchema);