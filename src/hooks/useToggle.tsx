import { useCallback, useState } from "react";

/**
 * A hook for managing boolean toggle state that returns an object containing the following properties:
 * @returns {{ toggle: boolean, handleToggle: () => void }}
 *     - toggle: The current boolean state (initial state is set to false)
 *     - handleToggle: function to toggle between true and false
 */
export const useToggle = (): { toggle: boolean; handleToggle: () => void; } => {
    const [ toggle, setToggle ] = useState<boolean>(false);

    const handleToggle = useCallback(() => {
        setToggle(prev => !prev);
    }, []);

    return { toggle, handleToggle };
};
