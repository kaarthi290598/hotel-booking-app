import { useMutation } from "@tanstack/react-query";
import { signUp as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading: isSigningIn } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("User  created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Unable to create user. try again later");
    },
  });

  return { signup, isSigningIn };
}
