
import {  JWT_EXPIRES_IN, JWT_SECRET, sign } from 'src/utils/jwt';
//import { users } from './data';
import axios from 'axios';

const STORAGE_KEY = 'users';

var users = {};


// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async signIn(request) {
    const { email, password } = request;
    await axios
      .get(`http://13.115.56.48:8080/techmadhyam/getUserByUsername/${email}`)
      .then((response) => {
        console.log(response.data);
          if(response && response.data && response.data.length > 0 && password === response.data[0].password){
            users = response.data[0];
            window.sessionStorage.setItem('user', response.data[0].id);
            //const accessToken = sign({ userId: user.id }, user.id, null);
            //const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            //resolve({accessToken});
          }
      })
      .catch((error) => {
          console.error('[Auth Api]: ', error);
          //return new Error('Internal server error');
      });  

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        /*const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];*/

        // Find the user
        //const user = mergedUsers.find((user) => user.emailId === email);

        if (!users || (users.password !== password)) {
          reject(new Error('Please check your username and password'));
          return;
        }

        // Create the access token
        const accessToken = sign({ userId: users.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signUp(request) {
    const { email, password } = request;
    await axios
      .get(`http://13.115.56.48:8080/techmadhyam/getUserByUsername/${email}`)
      .then((response) => {
        console.log(response.data);
          if(response && response.data && response.data.length > 0 && password === response.data[0].password){
            users = response.data[0];
            //const accessToken = sign({ userId: user.id }, user.id, null);
            //const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            //resolve({accessToken});
          }
      })
      .catch((error) => {
          console.error('[Auth Api]: ', error);
          //return new Error('Internal server error');
      });   

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        /*const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];*/

        // Check if a user already exists
        //let user = mergedUsers.find((user) => user.emailId === email);

        if (users) {
          reject(new Error('User already exists'));
          return;
        }

        let user = {
          id: users.id,
          avatar: '/assets/avatars/avatar-anika-visser.png',
          email: users.emailId,
          name: users.name,
          plan: users.id
        };

        persistUser(user);
        
        const accessToken = sign({ userId: users.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(request) {
    //const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        //const decodedToken = decode(accessToken);

        // Merge static users (data file) with persisted users (browser storage)
        /*const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];*/

        // Find the user
        /* const { userId } = decodedToken;*/
        //const user = mergedUsers.find((user) => users.id === userId);

        if (!users) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: users.id,
          avatar: '/assets/avatars/avatar-anika-visser.png',
          email: users.emailId,
          name: users.name,
          plan: users.id
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
