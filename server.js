const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    process.exit(1);
  });

module.exports = app.listen(PORT);
