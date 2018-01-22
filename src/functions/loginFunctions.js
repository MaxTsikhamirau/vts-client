import users from '../server/users';

export const login = (email, password) => {
  users.post('/login', { email, password })
  .then(response => {
    window.localStorage.setItem('token', response.headers['x-auth']);
    window.location.reload();
  });
}

export const logout = () => {
  users.delete('/me/token')
  .then(() => {
    window.localStorage.removeItem('token');
    window.location.reload();
  })
  .catch(() => {
    console.error('Unable to remove login from server');
    window.localStorage.removeItem('token');
  });
}
