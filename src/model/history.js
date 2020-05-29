const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(

    {
        from:{
            type: mongoose.Schema.Types.ObjectId,

        },
        to:{
            type: mongoose.Schema.Types.ObjectId,
        },
    
        data:{
            type:mongoose.Schema.Types.ObjectId,

        },
        create_at: {
            type: Date,
            required: true,
          },
        last_upadate: {
            type: Date,
            required: true,
        },  
    }   
);

module.exports = mongoose.model("History", userSchema);
