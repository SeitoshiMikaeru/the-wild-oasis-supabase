/* eslint-disable no-unused-vars */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useAddCabin } from "./useAddCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}, handleCloseModal}) {
  const {id: editIt, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editIt); 

    const {register, handleSubmit, getValues, reset, formState} = useForm({
      defaultValues: isEditSession ? editValues : {},
    });

    const {errors} = formState;


    //callback strategy; redone to using onSuccess on the function
    //const {isAdding, createCabin} = useAddCabin(reset);

    const {isAdding, createCabin} = useAddCabin();
    const {isEditing, editCabin} = useEditCabin();

    const isWorking = isEditing || isAdding;

    function onSubmit(cabin) {
        const image = typeof cabin.image === "string" ? cabin.image : cabin.image[0];

        if(isEditSession) editCabin({cabin: {...cabin, image}, id: editIt}, {
          onSuccess: () => {
            reset();
            handleCloseModal?.();
          },
        })
        else createCabin({...cabin, image}, {
          onSuccess: () => {
            reset();
            handleCloseModal?.();
          },
        });
    }

    function onError(errors) {
      //smth
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={handleCloseModal ? "modal" : "regular"} >
      <FormRow label="Cabin name" error={errors?.name?.message}>

        <Input disabled={isWorking} type="text" id="name" {...register("name", {
          required: "This field is required",
        })} />

      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>

        <Input disabled={isWorking} type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1.",
          },
        })} />

      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>

        <Input disabled={isWorking} type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Price should be at least 1.",
          }
        })} />

      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value < Number(getValues("regularPrice")) || "Discount must be less than a regular price.", 
        })} />

      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>

        <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required",
        })} />

      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput 
          disabled={isWorking} 
          id="image" 
          accept="image/*" 
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking} onClick={() => handleCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{!isEditSession ? "Add cabin" : "Edit cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
