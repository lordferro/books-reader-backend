const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const sexList = ["male", "female"];
const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    sex: {
      type: String,
      required: true,
      enum: sexList,
    },
    birthDate: {
      type: String,
      // DD-MM-YYYY
      match: dateRegexp,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      // id of which collection?
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// start this middleware in case error during post new document, because mongoose doesn't give an error code
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  birthDate: Joi.string().pattern(dateRegexp).required(),
});

const updateFovoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = {
  addSchema,
  updateFovoriteSchema,
};

module.exports = { Contact, schemas };
