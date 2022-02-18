  abstract class Validator {
  static regex: RegExp =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  static validateEmail(email :string):boolean{
    if(email === '' || email === null){
      return false;
    }

    return  this.regex.test(email);
  }

  static validatePin(pin :string):boolean{
    return pin.length >= 6;
  }
}


export default Validator;