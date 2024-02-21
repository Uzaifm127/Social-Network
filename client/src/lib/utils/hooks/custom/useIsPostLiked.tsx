import { User } from "@/types/states/user.types";
import { useCallback } from "react";

// ToDo:
// Later, you must remove the string array type as likesArray always be a users array.
export const useIsPostLiked = () => {
  const hasLiked = useCallback((likesArray: User[] | string[], me: User) => {
    const isStringArray = likesArray.every((element) => {
      return typeof element === "string";
    });

    // Checking if likes array contains all ids than actual user.
    if (isStringArray) {
      if ((likesArray as string[]).includes(me._id)) {
        return true;
      }
    } else if (likesArray && likesArray.length) {
      const hasPostLiked = likesArray.some((element) => {
        return (element as User)._id === me._id;
      });

      if (hasPostLiked) {
        return true;
      }
    }
  }, []);

  return hasLiked;
};
