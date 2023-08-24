const mongoose=require("mongoose");

const userSchema=mongoose.Schema(
    {
        Username:String,
        Avatar:String,
        Email:String,
        Password:String
    },
    {
        versionKey:false
    }
)

const userModel=mongoose.model("user",userSchema);
module.exports={userModel}
// - Username
// - Avatar (You can user a dummy avatar image URL)
// - Email
// - Password