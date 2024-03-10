import { useNavigate } from "react-router-dom";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Button from "../ui/Button";
import ButtonIcon from "../ui/ButtonIcon";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  const navigate = useNavigate();

  return (
    <>
      <span>
        <Button onClick={() => navigate("/bookings/create")}>
          Create Booking
        </Button>
      </span>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
