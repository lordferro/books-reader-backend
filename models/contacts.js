const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  sex: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  birthDate: {
    type: String,
    match: /^\d{2}-\d{2}-\d{4}$/,
    required: true,
  },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
