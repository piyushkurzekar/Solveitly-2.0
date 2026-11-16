import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./api";

export const authKeys = {
  me: ["auth", "me"] as const,
};

/** The logged-in user, or null when logged out. */
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me, user);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me, user);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Drop everything cached for the previous user.
      queryClient.clear();
      queryClient.setQueryData(authKeys.me, null);
    },
  });
}
