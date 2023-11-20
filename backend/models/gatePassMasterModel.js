const {Schema,model} = require('mongoose');

const gatePassMasterSchema = new Schema({
    cus_id : {
        type:Schema.ObjectId,
        required:true
    },
    gp_type_id : {
        type:Schema.ObjectId,
        required:true
    },
    gp_number : {
        type:String,
        required:true
    },
    gp_date : {
        type:Date,
        default: Date.now()
    }, 
    gp_return_date : {
        type:Date,
        default: Date.now()
    }, 
    sale_agent_id : {
        type:Schema.ObjectId,
        default: null
    },
    client_note : {
        type: String,
        default: null
    },
    term_id : {
        type:Schema.ObjectId,
        default: null
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
gatePassMasterSchema.index({
    gp_number: 'text',
})
module.exports = model('gatePass',gatePassMasterSchema);