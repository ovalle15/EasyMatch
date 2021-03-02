
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TreeSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        children: {
            type: Array,
            of: Object,
            required: false
        }
    }, {
	timestamps: true
});

const Tree = mongoose.model('tree', TreeSchema);
console.log("THIS IS THE Tree ---->", Tree);
module.exports = mongoose.model('tree', TreeSchema);























