const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
    type: String,
    description: String,
    modifiers: {
        stats: {
            strength: Number,
            social: Number,
            dexterity: Number,
            learning: Number,
        },
        skills: {
            melee: Number,
            ballistics: Number,
            agriculture: Number,
            crafting: Number,
            trade: Number,
        }
    }
});

const Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;