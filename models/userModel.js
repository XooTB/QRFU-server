import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  Vcards: [{ type: mongoose.Schema.Types.ObjectId, ref: "VCard" }],
});

export default mongoose.model("User", userSchema);
