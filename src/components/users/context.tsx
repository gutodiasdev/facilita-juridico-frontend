import { User } from "@/domain/@types";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

type UserContextProps = { 
  users: User[]
}

const UserContext = createContext<UserContextProps | null>(null);

export function useUsersContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Users.* component must be rendered as child of Users component");
  }
  return context;
}

export default UserContext;