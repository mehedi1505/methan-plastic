const {Schema,model} = require('mongoose');

const agentSchema = new Schema({
    agent_fullname : {
        type:String,
        required:true
    },
    agent_address : {
        type:String,
        required:true
    },   
    agent_contact : {
        type:String,
        required:true
    },  
    agent_email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
agentSchema.index({
    agent_fullname: 'text',
})
module.exports = model('agents',agentSchema);