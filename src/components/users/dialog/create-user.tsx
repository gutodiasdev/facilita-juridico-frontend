import { DialogContent } from "@radix-ui/react-dialog";
import { CreateUserForm } from "../form/create-user";
import { Dispatch, SetStateAction } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

type CreateUserDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateUserDialog({ setOpen }: CreateUserDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Adicionar novo grupo
        </DialogTitle>
      </DialogHeader>
      <CreateUserForm setOpen={setOpen}/>
    </DialogContent>
  )
}