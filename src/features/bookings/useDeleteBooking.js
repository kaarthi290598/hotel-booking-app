import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking deleted");
      queryClient.invalidateQueries({
        queryKey: "bookings",
      });
    },
    onError: () => toast.error("Unable to delete the booking"),
  });

  return { isDeleting, deleteBooking };
}
