const {Schema,model} = require('mongoose');



const PublicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    file: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Publication',PublicationSchema,"publications");