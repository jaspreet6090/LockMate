import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(500, "Error while generating Acess and Refresh Token");
  }
}


const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    throw new ApiError(400, "Please provide all the details")
  }

  // console.log(email)
  const userExits = await User.findOne({
    email
  })

  if (userExits) {
    throw new ApiError(400, "User already exists")
    
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (!user) {
    throw new ApiError(400, "User not created");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const cookieOption = {
    httpOnly: true, 
    secure: true, // Set to true if using HTTPS
    sameSite: 'None' // Adjust sameSite policy as needed for your use case
  }

  return res.status(200)
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, cookieOption)
    .json(
      new ApiResponse(200, {
        accessToken,
        refreshToken,
        user,
      }, "User Singup successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password")
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found")
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const cookieOption = {
    httpOnly: true, 
    secure: true, // Set to true if using HTTPS
    sameSite: 'None' // Adjust sameSite policy as needed for your use case
  }

  return res.status(200)
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, cookieOption)
    .json(
      new ApiResponse(200, {
        accessToken,
        refreshToken,
        user,
      }, "User logged in successfully")
    )
})

const logoutUser = asyncHandler(async (req, res) => {

  const id = req.user._id;

  await User.findByIdAndUpdate(id,
    {
      $unset: {
        refreshToken: 1 //this removes the field from document
      }
    },
    {
      new: true
    }
  )

  const cookieOptions = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
      new ApiResponse(200, {}, "User Logged Out Successfully")
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id).select("-password")
  // console.log(user)
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User Details fetched"))
})


export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
}