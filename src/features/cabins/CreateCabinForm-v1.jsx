import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { addCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("New cabin created");
      queryClient.invalidateQueries({
        queryKey: "cabins",
      });
    },
    onError: () => toast.error("Cabins could not be added "),
  });

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;
  console.log(errors);

  function onSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  }
  function onError(err) {}
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "The minimum value of maxCapacity should be 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "The minimum value of Regularprice should be 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount should be less than or equal to regular price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
