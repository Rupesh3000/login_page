const plm = require("passport-local-mongoose");
const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    
});

UserSchema.plugin(plm);

module.exports = mongoose.model("User", UserSchema);