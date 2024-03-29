import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

export default function useAuth() {
  const { auth, setAuth } = useContext(AuthContext)
  return {auth, setAuth}
}