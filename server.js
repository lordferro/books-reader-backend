const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://lordferro:21011987@fedor.omz8mer.mongodb.net/booksReader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB connected");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
