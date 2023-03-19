import mongoose from "mongoose";
import User from "../models/userModel.js";
import VCard from "../models/VCardModel.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Configs
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createCard = async (req, res, next) => {
  const {
    name,
    address,
    phone_number,
    company,
    email,
    position,
    profileImage,
    summary,
    socialLinks,
    user,
    website,
  } = req.body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const userEmail = user.email;

    const sUser = await User.findOne({ userEmail });

    const imageUrl = await cloudinary.uploader.upload(profileImage);

    const newVCard = await VCard.create({
      name,
      address,
      phone_number,
      email,
      company,
      position,
      summary,
      socialLinks,
      website,
      profileImage: imageUrl.url,
      user: sUser._id,
    });

    sUser.Vcards.push(newVCard._id);

    await sUser.save({ session });

    session.commitTransaction();

    res.status(200).json({
      message: "VCard created successfully!",
      newVCard,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const editCard = async (req, res, next) => {};
export const removeCard = async (req, res, next) => {};
export const getCard = async (req, res, next) => {
  try {
    const vCard = await VCard.find({}).populate("user");

    res.status(200).json(vCard);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
