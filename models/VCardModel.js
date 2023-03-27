import mongoose from "mongoose";

const vCardSchema = mongoose.Schema({
  cardName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  socialLinks: {
    type: Array,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model("VCard", vCardSchema);
