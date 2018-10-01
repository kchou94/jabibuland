var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var characterSchema = new Schema({
    info: {
        name: {
            prefix: String, // Count
            first: String, // Larion
            nickname: String, //"The Crybaby"
            last: String, // Smith
            suffix: String // II
        },
        gender: String,
        age: Number,
        birthday: {
            month: Number,
            day: Number,
            year: Number
        },
        background: {
            childhood: String, // Sheltered Child
            adulthood: String // Merchant
        }
    },
    stats: {
        strength: Number,
        social: Number,
        dexterity: Number,
        learning: Number
    },
    // traits: [String],
    // inventory: [
    //     {

    //     }
    // ],
});

characterSchema.virtual('info.name.full').get(function() {
    var name = this.info.name;
    var first = name.first;
    var last = name.last;
    var prefix, nickname, suffix;

    if(name.prefix){
        prefix = name.prefix + ' ';
    }
    if(name.nickname){
        nickname = '"' + name.nickname + '" ';
    }
    if(name.suffix){
        suffix = ' ' + name.suffix;
    }

    return prefix + first + ' ' + nickname + last + suffix;
});

characterSchema.virtual('info.name.epithet').get(function(){
    var name = this.info.name;
    var first = name.first;
    var last = name.last;
    var nickname;

    if(name.nickname){
        nickname = '"' + name.nickname + '" ';
    }

    return first + ' ' + nickname + last;
});

var Character = mongoose.model('Character', characterSchema);

module.exports = Character;