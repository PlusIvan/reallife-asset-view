export class RequestAPI{

    /**
     * 
     * @param {*} object 
     * @example
     * {headers:{'auth-token':'string','user-id':0}, data: {}}
     */
    constructor(object) {
        this.API = {
          armazem: {
            method: 'post',
            api: 'https://crud-dot-horus-rlt-dev.appspot.com/api/Armazem/v1/read'
          },
          stock: {
            method: 'post',
            api: 'https://crud-dot-horus-rlt-dev.appspot.com/api/Stock/v1/read'
          },
          search: {
            method: 'post',
            api: 'https://crud-dot-horus-rlt-dev.appspot.com/api/AssetFullView/v1/read'
          },
          state: {
            method: 'post',
            api: 'https://crud-dot-horus-rlt-dev.appspot.com/api/AssetState/v1/read'
          }
        };
        this.obj = object;
      }

      /**
       * @param {string} key 
       */
      async get(key) {
          const response = await fetch(this.API[key].api,{
            method: 'get',  
            headers:{
            ...this.obj.headers
          }});
          return await response.json();
      }

      /**
       * @param {string} key 
       */
      async post(key){

          const JSONbody = this.obj.body;

          const formData = new FormData();
          
          Object.keys(JSONbody).forEach((key) => {
            formData.append(key, JSONbody[key].toString());
          });
         
          const response = await fetch(this.API[key].api,{
              method: 'post',
              body: formData,
              headers:{
                  ...this.obj.headers
                }});
          return await response.json();
      }


}