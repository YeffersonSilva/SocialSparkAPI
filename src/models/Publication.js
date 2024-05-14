const {Schema,model} = require('mongoose');



const PublicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        String,
        require
    },
    file: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Publication',PublicationSchema,"publications");