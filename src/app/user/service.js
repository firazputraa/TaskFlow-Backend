import * as userRepository from './repository.js'
import {comparePassword, hashPassword} from '../../utils/password.js'
import {createToken} from '../../utils/jwt.js'
import {apiError} from '../../error/apiError.js'

export const register = async (registerData) => {
  
  if(await userRepository.findByEmail(registerData.email)){
    throw apiError.badRequest('Email has already been registered');
  }
  if(await userRepository.findByUsername(registerData.username)){
    throw apiError.badRequest("Username has already been registered");
  }
  
  const user = await userRepository.create(registerData);
  const token = createToken({id: user.id})
  return{user,token};
}

export const login = async (loginData) => {
  const user = await userRepository.findByEmail(loginData.email);

  if(!user || !(await comparePassword(loginData.password, user.password))){
    throw apiError.unauthorized('Email or password is wrong');
  }

  const token = createToken({id: user.id});
  return {user, token};
}

export const getUserById = async (id) => {
  const user = await userRepository.findById(id);

  if(!user){
    throw apiError.notFound('User not found');
  }
  return user;
};

export const getAllUser = () => {
  return userRepository.findAllUser(); 
}

export const updatePassword = async (userId, updateData) =>{
  const {oldPassword, newPassword} = updateData;
  const currentUser = await userRepository.findById(userId);
  const isPasswordCorrect = await comparePassword(oldPassword, currentUser.password)
  if(!isPasswordCorrect){
    throw apiError.unauthorized('Password incorrect');
  }
  const newHashPassword = await hashPassword(newPassword);
  return userRepository.update(userId, {password: newHashPassword});
}

export const updateUser = async (userId, updateData) => {
  return userRepository.update(userId, updateData);
}

export const deleteUser = async (userId) => {
  return userRepository.deleteById(userId);
}