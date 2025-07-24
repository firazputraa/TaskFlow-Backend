import * as userService from './service.js';
import {userResponseDto} from './dto.js'

export const register = async (req, res, next) => {
  try {
    const {user, token} = await userService.register(req.body);
    const userResponse = new userResponseDto(user);
    res.status(200).json({
      status: 'success',
      data: {
        user: userResponse, 
        token
      }
    });
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res, next) => {
  try {
    const {user, token} = await userService.login(req.body);
    const userResponse = new userResponseDto(user);
    res.status(200).json({
      status: 'success login',
      data: {
        user: userResponse, 
        token
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUser = async(req,res,next) => {
  try {
    const user = await userService.getAllUser();
    // const response = user.map(user => new userResponseDto(user))
    const token = req.headers.authorization.split(' ')[1];
    res.status(200).json({
      status: 'success',
      activeToken: token,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.userId);
    const response = new userResponseDto(user);
    res.status(200).json({
      status: 'success',
      data: response
    })
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await userService.updateUser(req.userId,req.body);
    const response = new userResponseDto(updateUser);
    res.status(200).json({
      status: 'success',
      data: response
    })
  } catch (error) {
    next(error);
  }
}

export const updatePassword = async (req, res, next) => {
  try {
    await userService.updatePassword(req.userId, req.body);
    res.status(200).json({
      status: 'success',
      message: "Password changes"
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUserAccount = async(req,res,next) => { 
  try {
    await userService.deleteUser(req.userId);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}