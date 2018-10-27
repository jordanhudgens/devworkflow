import axios from "axios";

export default (async function checkLoginStatus() {
  return await axios
    .get(`https://devworkflow-api.herokuapp.com/logged_in`, {
      withCredentials: true
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
});
