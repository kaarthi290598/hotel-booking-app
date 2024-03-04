import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success("New cabin created");
      queryClient.invalidateQueries({
        queryKey: "cabins",
      });
    },
    onError: () => toast.error("Cabins could not be added "),
  });

  return { createCabin, isCreating };
}
