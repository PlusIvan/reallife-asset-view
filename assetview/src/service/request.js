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
            method: 'get',
            api: 'https://crud-dot-horus-rlt-dev.appspot.com/api/Armazem/v1/read'
          },
          stock: {
            method: 'get',
            api: 'https://crud-dot-horus-rlt-dev.appspot.com/api/Stock/v1/read'
          },
          search: {
            method: 'post',
            api: 'https://crud-dot-horus-rlt-dev.appspot.com/api/AssetFullView/v1/read'
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
       * 
       */
      async post(){
          const response = await fetch(this.API + this.obj.url,{
              method: 'post',
              body: new FormData(document.getElementById('form')),
              headers:{
                  ...this.obj.headers
                }});
          return await response.json();
      }


}