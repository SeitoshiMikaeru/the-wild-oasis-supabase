import { useMutation } from "@tanstack/react-query";
import { signup as signupUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
    const {mutate: signup, isLoading} = useMutation({
        mutationFn: signupUser,
        onSuccess: () => {
            toast.success("User successfully created! Please verify the new account from the email address.");
        },
        onError: err => {
            console.error(err);
            toast.error("An error occurred while creating a user. Try again!");
        }
    });

    return {signup, isLoading};
}