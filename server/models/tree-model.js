
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

module.exports = mongoose.model('tree', TreeSchema);
























