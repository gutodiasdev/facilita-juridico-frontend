import { User } from "@/domain/@types";
import { ReactNode, useState } from "react";
import UserContext from "./context";

type UsersRootProps = {
  children: ReactNode;
  users: User[];
}

export function UsersRoot({ children, users }: UsersRootProps) {
  const [filteredUsers, setFilteresUsers] =  useState<User[]>()

  return (
    <UserContext.Provider value={{ users }}>
      <section className="w-full flex flex-col gap-y-2">
        {children}
      </section>
    </UserContext.Provider>
  )
}