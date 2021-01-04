import React from 'react';

const initialState = {
  authenticated: false,
  user: { username: '', role: '' },
  login(user: any) { this.user = user; },
  logout() {},
};

const AuthContext = React.createContext(initialState);

export default AuthContext;
