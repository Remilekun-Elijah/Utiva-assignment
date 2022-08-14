const Api = function ({url, method, data})  {
 const baseUrl = "https://api-utiva.onrender.com";
 return fetch(baseUrl+url, {
   method: method,
   body: JSON.stringify(data)
 }).then(res => res.json())
 .then(data => {
   return data;
 }
 ).catch(err => {
   console.log(err);
 })
}

export default Api;