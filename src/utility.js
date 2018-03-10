import axios from 'axios';

export async function checkUserStatus() {
  var response = await axios.get('/api/checkUserStatus').then(res => { return res.data });
  return response;
  // return axios.get('/api/checkUserStatus').then(res => { return res.data });
}

function axiosCall() {
  return new Promise(10)
}
