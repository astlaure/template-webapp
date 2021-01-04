import React, { useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import useHttpClient from '../hooks/useHttpClient';

const AuthContextProvider: React.FC = (props) => {
  const { children } = props;
  const httpClient = useHttpClient();
  const [state, setState] = useState({
    authenticated: false,
    user: { username: '', role: '' },
    login(user: any) { setState({ ...state, authenticated: true, user }); },
    logout() { setState({ ...state, authenticated: false, user: { username: '', role: '' } }); },
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    httpClient.get('/api/security/userinfo')
      .then((user: any) => { state.login(user); })
      .catch(() => {})
      .then(() => { setLoaded(true); });
  }, []);

  return (
    <AuthContext.Provider value={state}>
      { loaded ? children : null }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
