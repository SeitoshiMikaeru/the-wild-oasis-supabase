import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const {isLoading: isEditing, mutate: editCabin} = useMutation({
        mutationFn: ({cabin, id}) => addEditCabin(cabin, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: err => toast.error(err.message, {id: "fail"}),
    });

    return {isEditing, editCabin};
}