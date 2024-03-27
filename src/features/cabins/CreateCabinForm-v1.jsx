/* eslint-disable no-unused-vars */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {addCabin} from "../../services/apiCabins";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({cabinToEdit = {}}) {
    const {id: editIt, ...editValues} = cabinToEdit;

    const isEditSession = Boolean(editIt); 

    const {register, handleSubmit, reset, getValues, formState} = useForm({
      defaultValues: isEditSession ? editValues : {},
    });

    const {errors} = formState;

    const queryClient = useQueryClient();

    const {isLoading: isAdding, mutate} = useMutation({
        mutationFn: addCabin,
        onSuccess: () => {
            toast.success("Cabin successfully added");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: err => toast.error(err.message, {id: "fail"}),
    });

    function onSubmit(cabin) {
        mutate({...cabin, image: cabin.image[0]});
    }

    function onError(errors) {
      //smth
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>

        <Input disabled={isAdding} type="text" id="name" {...register("name", {
          required: "This field is required",
        })} />

      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>

        <Input disabled={isAdding} type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1.",
          },
        })} />

      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>

        <Input disabled={isAdding} type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Price should be at least 1.",
          }
        })} />

      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input disabled={isAdding} type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value < Number(getValues("regularPrice")) || "Discount must be less than a regular price.", 
        })} />

      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>

        <Textarea disabled={isAdding} type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required",
        })} />

      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput 
          disabled={isAdding} 
          id="image" 
          accept="image/*" 
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isAdding}>
          Cancel
        </Button>
        <Button disabled={isAdding}>{!isEditSession ? "Add cabin" : "Edit cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
