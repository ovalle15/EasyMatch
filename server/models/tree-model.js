const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tree = new Schema(
    {
        title: {
            type: String,
            required: true
        } ,
        expanded: {
            type: Boolean,
            required: true
        },
        children: {
            type: Array,
            of: String,
            required: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('treedb', Tree)