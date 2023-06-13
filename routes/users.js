require("dotenv").config();
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected`);
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});
userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
