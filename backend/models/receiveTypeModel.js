const {Schema,model} = require('mongoose');

const receiveTypeSchema = new Schema({
    rec_type_name : {
        type:String,
        required:true
    },
    rec_type_desc : {
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
receiveTypeSchema.index({
    rec_type_name: 'text',
    rec_type_desc: 'text'
})

module.exports = model('receivetypes',receiveTypeSchema);