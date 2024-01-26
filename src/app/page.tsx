"use client";

import { useUsers } from "@/application/hooks/useUsers";
import { Route } from "@/components/route";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Users } from "@/components/users";
import { CreateUserDialog } from "@/components/users/dialog/create-user";
import { CreateUserForm } from "@/components/users/form/create-user";
import { Truck, User } from "lucide-react";
import { useState } from "react";
import { GridLoader } from "react-spinners";

export default function Home() {
  const [open, setOpen] = useState(false)
  const [openRoute, setOpenRoute] = useState(false)
  const { useUsersList } = useUsers();
  const { data, isLoading, isError } = useUsersList();

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24 w-full">
        <GridLoader color="#5528ff" />
      </main>
    )
  }

  if (isError) {
    return (
      <p>
        Error...
      </p>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-full">
      <Users.Root users={data}>
        <h1 className="mb-8 font-semibold text-xl text-gray-800">Facilita Jurídico</h1>
        <div className="flex items-center justify-between mt-8">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button variant={"secondary"} className="flex items-center gap-x-2">
                <User size={16} />
                Adicionar usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <CreateUserForm setOpen={setOpen} />
            </DialogContent>
          </Dialog>
          <Dialog open={openRoute} onOpenChange={setOpenRoute}>
            <DialogTrigger>
              <Button variant={"secondary"} className="flex items-center gap-x-2">
                <Truck size={16} />
                Gerar Rota
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white w-full">
              <Route.Root />
            </DialogContent>
          </Dialog>
        </div>
        <Users.Content />
      </Users.Root>
    </main>
  );
}
