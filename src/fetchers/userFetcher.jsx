import axios from 'axios'

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post('/api/users/login', { email, password });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const registerUser = async (email, password, name) => {
  console.log('entered registerUser');
  try {
    const res = await axios.post('/api/users/register', { email, password, name });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const checkSession = async () => {
  try {
    const res = await axios.get('api/check-session');
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const logoutUser = async () => {
  try {
    const res = await axios.post('/api/logout');
    return res.data.loggedOut;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// export const oauth = async () => {
//   console.log("----> oauth fetcher is running");
//   try {
//     const res = await axios.get('/api/oauth/user');
//     console.log('-----> oauth userFetcher - res.data : ', res.data)
//     return res.data;
//   } catch (err) {
//     console.log("oauth fetcher is not working");
//   }
// }
