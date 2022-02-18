
interface NetworkService{
     get(url:string , data:any):Promise<Map<string, any>>;
     post(url:string, data:any):Promise<Map<string ,any>>;
}

export default NetworkService;