import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { useUsersContext } from "./context"
import { useState } from "react";
import { User } from "@/domain/@types";

export function UsersContent() {
  const { users } = useUsersContext();
  const [usersData, setUsersData] = useState<User[]>(users)
  const [term, setTerm] = useState<string>("");

  const handleFilterUsers = () => {
    setUsersData(users.filter(user => {
      return Object.values(user).some(value => {
        return value.toLocaleLowerCase().includes(term.toLowerCase())
      })
    }))
  }

  return (
    <section className="my-4 flex flex-col gap-y-2">
      <div className="flex gap-x-2 item-center my-4">
        <Input placeholder="Ex.: alan turing" onChange={event => setTerm(event.target.value)}/>
        <Button className="bg-[#5528ff] flex gap-x-1 item-center" onClick={handleFilterUsers}>
          <Search size={16}/>
          Buscar
        </Button>
      </div>
      {
        usersData.map((user, index) => {
          return (
            <Card key={index}>
              <CardContent className="py-4">
                <div className="w-full flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                  <span className="text-sm text-gray-400">{user.email}</span>
                </div>
                <div className="grid grid-cols-3 pt-2">
                  <div>
                    <span className="text-sm text-gray-400 font-semibold">Telefone</span>
                    <p className="text-lg">{user.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400 font-semibold">Localização</span>
                    <p className="text-lg">({user.x_axis}, {user.y_axis})</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      }
    </section>
  );
}