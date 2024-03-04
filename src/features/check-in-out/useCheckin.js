import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakFastObj }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakFastObj,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("Failed to check-in"),
  });

  return { checkin, isCheckingIn };
}
