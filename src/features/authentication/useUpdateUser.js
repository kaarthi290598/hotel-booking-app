import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("User update failed");
    },
  });

  return { updateUser, isLoading };
}
