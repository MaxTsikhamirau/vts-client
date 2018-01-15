import { post, remove } from './server';

export const login = (email, password) => {
  post('users/login', null, {email, password}, response => {
    sessionStorage.setItem('token', response.token);
  });
}

export const logout = () => {
  remove('users/me/token', null, response => {
    sessionStorage.removeItem('token');
  });
}
