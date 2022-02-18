
enum ApiErrors {
    apiConnectionTimeout,
    apiUnauthenticated,
    apiNoResponse,
    apiBadRequest,
    databaseException,
    apiUnknown,
    apiServerError,
    apiGenericError,
    apiNotFound,
  }


abstract class AppStrings{
    
   static apiNoResponse: string = 'no response from the server, try again';
   static apiUnauthorized: string = "you are not authorize to perform this operation";
   static apiGenericError: string = 'please try again';
   static apiBadRequest:  string  = 'invalid credentials';
   static apiConnectionTimeout: string = 'could not make request to the server. Check your network';
   static apiNotFound :string = 'could not perform operation';
   static apiServerError: string = 'server error, please try again';
   static apiUnknown :string = 'something bad happened, please try again';
}

class ApiFailure{
    error:any;
    constructor(error:any){
        this.error = error;
    }
}

class UIError {
    message:string;
    constructor(message:string){
        this.message = message;
    }
}

export { AppStrings, ApiErrors, ApiFailure, UIError};


