import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
    const queryClient = useQueryClient();

    const {isLoading: isUpdating, mutate: changeSetting} = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("Setting is changed!");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: err => toast.error(err.message, {id: "fail"}),
    });

    return {isUpdating, changeSetting};
}