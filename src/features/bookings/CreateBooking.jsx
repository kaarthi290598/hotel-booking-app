import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import BookingForm from "./BookingForm";

function CreateBooking() {
  //backfunction
  const back = useMoveBack();

  return (
    <>
      <span>
        <Button onClick={() => back()}>Back</Button>
      </span>
      <BookingForm />
    </>
  );
}

export default CreateBooking;
