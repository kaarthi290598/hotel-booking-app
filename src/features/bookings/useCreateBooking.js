import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const {
    mutate: bookingCreate,
    data,
    isLoading,
  } = useMutation({
    mutationFn: createNewBooking,
    onSuccess: () => {
      toast.success("Booking successfully created");
      queryClient.invalidateQueries({
        queryKey: "cabins",
      });
    },
    onError: () => {
      toast.error("Cannot create Booking. Try again later");
    },
  });

  return { bookingCreate, data, isLoading };
}
