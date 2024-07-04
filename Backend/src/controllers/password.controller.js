import { SavedPassword } from "../models/savedpassword.model.js";
import CryptoJS from "crypto-js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_KEY).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};



const createPassword = async (req, res) => {
  const { username, websiteUrl, password } = req.body;
  const user = req.user;
  const encryptedPassword = encrypt(password);
  try {
    const newPassword = await SavedPassword.create({ username, websiteUrl, password: encryptedPassword, user });

    user.savedPassword.push(newPassword._id);
    await user.save();

    res.status(200).json(new ApiResponse(200, newPassword, "Password Created Successfully"));
  } catch (error) {
    res.json(new ApiError(500, {}, "Error While Creating Password" || error))
  }
}



const getPasswords = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const user = User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const passwords = await SavedPassword.find({ user: id });

  const decryptPasswords  = passwords.map((password => (
    {
      id: password._id,
      username: password.username,
      websiteUrl: password.websiteUrl,
      password: decrypt(password.password)
    }
  
  )))

  res.status(200).json(new ApiResponse(200, decryptPasswords , "Passwords Fetched Successfully"));

})

const deletePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  // Find the password by ID
  const password = await SavedPassword.findById(id);
  if (!password) {
    throw new ApiError(404, "Password not found");
  }
  // Check if the password belongs to the authenticated user
  if (password.user.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this password");
  }

  // Delete the password document
  await SavedPassword.deleteOne({ _id: id });

  // Remove the password reference from the user's savedPassword array
  user.savedPassword.pull(password._id);
  await user.save();

  // Send a success response
  res.status(200).json(new ApiResponse(200, {}, "Password Deleted Successfully"));
})


const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { username, websiteUrl, password } = req.body;
  if (!username && !websiteUrl && !password) {
    throw new ApiError(400, "Please any one the details");
  }


  const user = req.user;

  const Oldpassword = await SavedPassword.findById(id);
  if (!Oldpassword) {
    throw new ApiError(404, "Password not found");
  }

  if (Oldpassword.user.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this password");
  }

  const encryptedPassword = encrypt(password);

  const updatedPassword = await SavedPassword.findByIdAndUpdate(id, {
    username,
    websiteUrl,
    password: encryptedPassword
  }, { new: true });

  if (!updatedPassword) {
    throw new ApiError(404, "Password not found");
  }

  res.status(200).json(new ApiResponse(200, updatedPassword, "Password Updated Successfully"));
})

export {
  createPassword,
  getPasswords,
  deletePassword,
  updatePassword
}