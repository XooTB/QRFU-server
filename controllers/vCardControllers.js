import mongoose from "mongoose";
import User from "../models/userModel.js";
import VCard from "../models/VCardModel.js";
import { v2 as cloudinary } from "cloudinary";
import { generateString } from "../utils/generateString.js";
import dotenv from "dotenv";

// Configs
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateUrl = async () => {
  const url = generateString(6);
  const urlExists = await VCard.findOne({ url });
  if (!urlExists) {
    return url;
  } else {
    return generateUrl();
  }
};

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
    cardName,
  } = req.body;

  const session = await mongoose.startSession();

  try {
    const url = await generateUrl();

    session.startTransaction();
    const userEmail = user.email;

    const sUser = await User.findOne({ userEmail });

    const imageUrl = await cloudinary.uploader.upload(profileImage);

    const newVCard = await VCard.create({
      cardName,
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
      url: url,
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
export const editCard = async (req, res, next) => {
  const { id } = req.params;
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
    website,
    cardName,
    url,
  } = req.body;

  try {
    const photoUrl = await cloudinary.uploader.upload(profileImage);

    await VCard.findOneAndUpdate(
      { url: id },
      {
        name,
        address,
        phone_number,
        company,
        email,
        position,
        profileImage: photoUrl.url || profileImage,
        summary,
        socialLinks,
        website,
        cardName,
      }
    );

    res.status(200).json({
      message: "VCard Updates Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const removeCard = async (req, res, next) => {};

export const getCard = async (req, res, next) => {
  try {
    const vCard = await VCard.find({}).populate("user", ["email", "name"]);

    res.status(200).json(vCard);
  } catch (err) {
    res.status(500).json({
      message: "Card Not found!",
    });
  }
};

export const getCardDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const vCard = await VCard.findOne({ url: id }).populate("user", [
      "email",
      "name",
    ]);

    res.status(200).json(vCard);
  } catch (err) {
    res.status(500).json({
      message: "Card Not found!",
    });
  }
};
