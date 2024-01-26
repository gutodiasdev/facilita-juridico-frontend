import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import { Dispatch, SetStateAction } from "react";

import 'react-phone-input-2/lib/style.css'

type CreateUserInput = {
  name: string;
  email: string;
  phone: string;
  x_axis: string;
  y_axis: string;
}

const schema = z.object({
  name: z.string({ required_error: "É obrigatório" }),
  email: z.string({ required_error: "É obrigatório" }).email("Insira um email válido"),
  phone: z.string({ required_error: "É obrigatório" }),
  x_axis: z.string({ required_error: "É obrigatório" }),
  y_axis: z.string({ required_error: "É obrigatório" }),
});

type createUserSchema = z.infer<typeof schema>;

type CreateGroupFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateUserForm({ setOpen }: CreateGroupFormProps) {
  const { toast } = useToast();
  const query = useQueryClient();
  const form = useForm<createUserSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit"
  });
  const mutation = useMutation({
    mutationFn: async (values: CreateUserInput) => {
      await axios.post("http://localhost:8080/users", values);
    },
    onSuccess: () => {
      toast({
        title: "Usuário adicionado com sucesso!",
        variant: "default",
      });
      query.invalidateQueries({ queryKey: ["users"] })
      query.invalidateQueries({ queryKey: ["route"] })
      setOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateUser: SubmitHandler<CreateUserInput> = async (values) => {
    await mutation.mutateAsync(values);
  };


  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(handleCreateUser)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do usuário</FormLabel>
              <FormControl>
                <Input placeholder="Alan Turing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ex.: alan.turing@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <PhoneInput
                  country={"br"}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2">
          <FormField
            control={form.control}
            name="x_axis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eixo X</FormLabel>
                <FormControl>
                  <Input placeholder="2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="y_axis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eixo Y</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="bg-[#5528FF] text-white">
          Adicionar
        </Button>
      </form>
    </Form>
  );
}