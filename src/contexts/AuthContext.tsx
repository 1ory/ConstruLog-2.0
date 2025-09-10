import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  isAuthenticated: boolean;
  userName: string;
  login: (userName?: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('Usuário');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const savedUserName = await AsyncStorage.getItem('userName');
      
      setIsAuthenticated(!!userToken);
      if (savedUserName) {
        setUserName(savedUserName);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userName?: string) => {
    try {
      const token = `authenticated_${Date.now()}`;
      await AsyncStorage.setItem('userToken', token);
      if (userName) {
        await AsyncStorage.setItem('userName', userName);
        setUserName(userName);
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
      setIsAuthenticated(false);
      setUserName('Usuário');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userName,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};