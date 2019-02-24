// import axios from 'axios';

// const setAuthHeader = token => {
//   if(token){
//     // set token in header
//     axios.defaults.headers.common['Authorization'] = token;
//   } else {
//     // delete token from header
//     delete axios.defaults.headers.common['Authorization'];
//   }
// }
// export default setAuthHeader;



import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
