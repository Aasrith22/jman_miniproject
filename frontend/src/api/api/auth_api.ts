import api from './axios';
import { ApiResponse, AuthResponse, LoginPayload, RegisterPayload, User } from '../../Types/mycourse_type';

// ─── Register ─────────────────────────────────────────────────────────────────
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', payload);
  return data.data;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', payload);
  return data.data;
};

export const getProfile = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>('/auth/profile');
  return data.data;
};

export const saveSession = (authData: AuthResponse): void => {
  localStorage.setItem('access_token', authData.access_token);
  localStorage.setItem('user', JSON.stringify(authData.user));
};

export const clearSession = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const getStoredUser = (): User | null => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('access_token');
};
