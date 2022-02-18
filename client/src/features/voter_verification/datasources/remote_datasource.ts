import { UIError } from "../../../core/failures";
import NetworkServiceImpl from "../../../core/network/network_service_impl";


const networkService : NetworkServiceImpl =  new NetworkServiceImpl();


const getVerificationCode = async(email : string): Promise<boolean> => {
  // this will help us decide when its done since we don't need the response
   let isDone: boolean = false;
   // suppose the email validator fails - won't happen though   
   if((email === '' || email === null)){
      throw new UIError('email cannot be null') 
   }
   const result  =  await networkService.post('https://uenrlibrary.herokuapp.com/api/auth/resend-verification-link', {'email': email});
     if(result.has('error')){
    throw new UIError(result.get('error'))   
  }
  else{
      isDone = true;
      return isDone;
  }
} 

const verifyCode = async (email:string , code:string): Promise<boolean>=>{
   // help us know what to do next when operation is successful
   let isDone:boolean = false
   if((email === '' || email === null) && (code === '' || code === null)){
      throw new UIError('email cannot be null') 
   }
   const result  =  await networkService.get(`https://uenrlibrary.herokuapp.com/api/auth/email-verify/verification-code/${email}/${code}`, {});
   if(result.has('error')){
    throw new UIError(result.get('error'));
  }
  else{
     isDone = true;
      return isDone;
  }
 
}

export {getVerificationCode, verifyCode}