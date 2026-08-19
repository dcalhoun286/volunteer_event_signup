import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const useAuthState = () => {
    const { isAuthenticated, isLoading, error } = useSelector(
        (state: RootState) => state.auth
    );

    return { isAuthenticated, isLoading, error };
};
