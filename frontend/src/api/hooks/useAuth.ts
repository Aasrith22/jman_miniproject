import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clearSession, getProfile, login, register, saveSession } from '../api/auth_api';
import { LoginPayload, RegisterPayload } from '../../Types/mycourse_type';

export const authKeys = {
  profile: ['auth', 'profile'] as const,
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (data) => {
      saveSession(data);                             
      queryClient.setQueryData(authKeys.profile, data.user);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      saveSession(data);
      queryClient.setQueryData(authKeys.profile, data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    clearSession();                
    queryClient.clear();           
    window.location.href = '/login'; 
  };
};

export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile,
    queryFn: getProfile,
    enabled: !!localStorage.getItem('access_token'),
    staleTime: 5 * 60 * 1000, 
  });
};
