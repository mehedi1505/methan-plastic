const {Schema,model} = require('mongoose');

const gatePassTypeSchema = new Schema({
    gp_type : {
        type:String,
        required:true
    },
    gp_note : {
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
gatePassTypeSchema.index({
    gp_type: 'text',
})
module.exports = model('gpTypes',gatePassTypeSchema);