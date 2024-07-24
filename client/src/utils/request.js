// import axios from "axios";

// const base_url = "http://localhost:8800/api/";
// export const request = (url = "", method = "", data = {}) => {
//   return axios({
//     url: base_url + url,
//     method: method,
//     data: data,
//     headers: {},
//   })
//     .then((res) => {
//       return res;
//     })
//     .catch((error) => {
//       alert("Error Fetch API");
//     });
// };


import axios from "axios";

const base_url = "http://localhost:8800/api/";
export const request = (url = "", method = "", data = {}) => {
  return axios({
    url: base_url + url,
    method: method,
    data: data,
    headers: {},
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error Fetching API", error);
      throw error;
    });
};

