import NetworkService from "./network_service";
import axios, { AxiosError, AxiosResponse } from "axios";
import {AppStrings} from '../failures';


class NetworkServiceImpl implements NetworkService{

    async get(url: string, data: any): Promise<Map<string, any>> {
        try {
            const result = await axios.get(url);
            return this._handleResponse(result);
        } catch (error) {
           const castError = error as AxiosError;
           return this._handleResponse(castError.response!)
        }
    }
   async post(url: string, data: any): Promise<Map<string, any>> {
       
        try {
            const result =await axios.post(url, data);
            return this._handleResponse(result);
        } catch (error) {
            const castError = error as AxiosError;
           return this._handleResponse(castError.response!)
        }
    }

   private  _handleResponse (response: AxiosResponse) : Map<string, any>{
        const result: Map<string, any> = new Map<string, any>();

        if((response.status /1 ) >= 200 && (response.status /1 ) <= 203 ){
            return result.set('data' , response.data);
            //{'data' : response.data};
        }

        switch (response.status) {
            case 300:
               return  result.set('error', AppStrings.apiGenericError);
               //{'data' :{'error': ApiErrors.apiGenericError }};
            case 400: 
                return result.set('error' , AppStrings.apiBadRequest);
             case 401: 
                return  result.set('error', AppStrings.apiBadRequest)
            
            case 404: 
                return result.set('error', AppStrings.apiNotFound )
             case 500:
                 return result.set('error', AppStrings.apiServerError )
             default:
                return result.set('error', AppStrings.apiGenericError )
                  }
     } 

}


export default NetworkServiceImpl;
