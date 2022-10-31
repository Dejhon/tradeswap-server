const db = require("mongoose");
const { Schema } = db;

let tradesmanSchema = new Schema(
  {
    first_name: { 
        type: String,  
        required: [true, "No first name was provided"],
    },
    last_name: { 
        type: String, 
        required: [true, "No last name was provided"], 
    },
    email: { 
        type: String, 
        required: [true, "No email address was provided"],
        unique: [true, "Email already exist in the database"],
    },
    phone_number: { 
        type: String, 
        required: [true, "No phone number was provided"],
        unique: [true, "number already exist in the database"],
    },
    password: { 
        type: String,  
        required: [true, "No password was provided"], 
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        required: [true, "No trade was selected"], 
        ref: "category",
    },
    parishID: { 
        type: Schema.Types.ObjectId, 
        required: true,
        ref: "parish"
    },
  },
  { collection: "tradesman" }
);

module.exports = db.model("tradesman", tradesmanSchema);
