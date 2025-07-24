export class userResponseDto{
  constructor(user){
    this.id = user.id;
    this.username = user.username;
    this.email = user.email
    this.createAt = user.createAt;
  }
}

// export class updateUsername{
//   constructor(user){
//     this.newUsername = user.newUsername;
//   }
// }

// export class updatePassword{
//   constructor(user){
//     this.oldPassword = user.oldPassword;
//     this.newPassword = user.newPassword;
//     this.confirmPassword = user.confirmPassword;
//   }
// }