import { Injectable } from '@nestjs/common';

@Injectable()
export default class inputValidation {
  usernameValidation(username) {
    console.log('username: ', username);
    try {
      const re = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})([^-\s])$/;
      if (!username || username.length < 5) return false;
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  passwordValidation(password) {
    console.log('password: ', password);
    try {
      if (!password || password.length < 5) return false;
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  emailValidation(email) {
    try {
      const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    } catch (error) {
      console.log(error.message)
      return false
    }
  }

  channelNameValidation() {}

  titleValidation() {}
}
