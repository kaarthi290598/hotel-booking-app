import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => addEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(" Cabin was modified");
      queryClient.invalidateQueries({
        queryKey: "cabins",
      });
    },
    onError: () => toast.error("Cabins could not be edited "),
  });

  return { editCabin, isEditing };
}
