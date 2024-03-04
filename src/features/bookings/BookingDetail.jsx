import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  const { deleteBooking, isDeleting } = useDeleteBooking();

  const navigate = useNavigate();

  console.log(booking);
  //const status = booking.status;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="Booking" />;

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{booking.id}</Heading>
            <Tag type={statusToTagName[booking.status]}>
              {booking.status.replace("-", " ")}
            </Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />
        <ButtonGroup>
          <Modal.Open opens="Booking-delete">
            <Button $variation="danger">Delete</Button>
          </Modal.Open>

          {booking.status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
              Check-in
            </Button>
          )}

          {booking.status === "checked-in" && (
            <CheckoutButton bookingId={booking.id} />
          )}

          <Button $variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name="Booking-delete">
          <ConfirmDelete
            resourceName={"Bookings"}
            disabled={isDeleting}
            onConfirm={() =>
              deleteBooking(booking.id, {
                onSettled: navigate("/bookings"),
              })
            }
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
