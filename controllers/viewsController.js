const { ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contacts");

const home = ctrlWrapper((req, res) => {
  // in app.js we set folder where views should be
  res.status(200).render("home", {
    title: "Contacts Home",
    active: "home",
  });
});

const getContacts = ctrlWrapper(async (req, res) => {
  const contacts = await Contact.find().populate("owner");

  res.status(200).render("contacts", {
    title: "Contacts list",
    active: "contacts",
    contacts,
  });
});

module.exports = { home, getContacts };
