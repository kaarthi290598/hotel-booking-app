import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useNavigation } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user.user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error("provided email or password is incorrect");
    },
  });

  return { login, isLogingIn };
}
