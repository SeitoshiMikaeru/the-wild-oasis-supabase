import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addEditCabin } from "../../services/apiCabins";

export function useAddCabin(callback) {
    const queryClient = useQueryClient();

    const {isLoading: isAdding, mutate: createCabin} = useMutation({
        mutationFn: addEditCabin,
        onSuccess: () => {
            toast.success("Cabin successfully added");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            callback?.();
        },
        onError: err => toast.error(err.message, {id: "fail"}),
    });

    return {isAdding, createCabin};
}