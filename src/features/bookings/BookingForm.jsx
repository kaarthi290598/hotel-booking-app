import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Checkbox from "../../ui/Checkbox";
import { useForm } from "react-hook-form";
import { createNewBooking } from "../../services/apiBookings";
import { add, differenceInDays, formatISO, formatISO9075 } from "date-fns";
import { useCreateBooking } from "./useCreateBooking";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import { useSettings } from "../settings/useSettings";
import Select from "../../ui/Select";
import SelectCommon from "../../ui/SelectCommon";
import { useNavigate } from "react-router-dom";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

// const guestsData = {
//   fullName: "Kaarthikeyan",
//   email: "kaarthi@gmail.com",
//   nationality: "Indian",
//   nationalID: "1234214134",
//   countryFlag: "https://flagcdn.com/in.svg",
// };

const bookingDatatest = {
  created_at: fromToday(-20, true),
  startDate: fromToday(0),
  endDate: fromToday(7),
  cabinId: 89,

  hasBreakfast: true,
  observations: "Hello this is a test",
  isPaid: false,
  numGuests: 100,

  numNights: 2,
  cabinPrice: 1200,
  extrasPrice: 100,
  totalPrice: 1300,
  status: "unconfirmed",
};

console.log(bookingDatatest);

function BookingForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const { bookingCreate, data, isLoading: isCreating } = useCreateBooking();

  const { cabins, isLoading: isCabinLoading } = useCabins();

  const { settingsData, isLoading: isSettingLoading } = useSettings();

  if (isCabinLoading || isSettingLoading) return <Spinner />;

  //Form functions

  function onSubmit(data) {
    const {
      fullName,
      email,
      nationality,
      nationalID,
      startDate,
      endDate,
      numGuests,
      cabinId,
      hasBreakfast,
      observations,
    } = data;

    const selectedCabin = cabins.find((cabin) => cabin.id === Number(cabinId));

    const guestsData = {
      email,
      fullName,
      nationality,
      nationalID,
      countryFlag: null,
    };

    const single_cabin_price =
      selectedCabin.regularPrice - selectedCabin.discount;
    const numNights = differenceInDays(new Date(endDate), new Date(startDate));
    const numGuests1 = Number(numGuests);
    const extrasPrice = hasBreakfast
      ? numNights * settingsData.breakfast_price * numGuests
      : 0;

    const bookingData = {
      startDate: new Date(startDate).toISOString().slice(0, -1),
      endDate: new Date(endDate).toISOString().slice(0, -1),
      numNights: numNights,
      status: "unconfirmed",
      observations,
      numGuests: numGuests1,
      hasBreakfast,
      cabinId: Number(cabinId),
      cabinPrice: single_cabin_price * numNights,
      extrasPrice: extrasPrice,
      totalPrice: selectedCabin.regularPrice * numNights + extrasPrice,
      isPaid: false,
    };

    bookingCreate(
      { bookingData, guestsData },
      { onSuccess: () => navigate("/dashboard") }
    );
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/*------------------------ Guests -------------------- */}
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          {...register("nationality", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalId"
          {...register("nationalID", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      {/*------------------------ Booking data -------------------- */}

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate: (value) => {
              return (
                value > getValues().startDate ||
                "End date must be greater than start Date"
              );
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Number of guests " error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "The minimum number of guests should be 1.",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>
      {/*------------------------ Cabin data dropdown -------------------- */}
      <FormRow label="Select Cabin">
        {/* <Input
          type="select"
          id="cabinId"
          {...register("cabinId")}
          disabled={isCreating}
        /> */}
        <SelectCommon
          datas={cabins}
          register={{ ...register("cabinId") }}
          disabled={isCreating}
        ></SelectCommon>
      </FormRow>
      {/*------------------------ Cabin data -------------------- */}

      <FormRow label="Include Breakfast ?">
        <Checkbox
          register={{ ...register("hasBreakfast") }}
          disabled={isCreating}
        ></Checkbox>
      </FormRow>
      <FormRow label="Remarks" error={errors?.observations?.message}>
        <Input
          type="text"
          id="observations"
          {...register("observations", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}> Add Booking</Button>
      </FormRow>
    </Form>
  );
}

export default BookingForm;
