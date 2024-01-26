import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export async function getUsers(term: string = "") {
  const { data } = await axios.get("http://localhost:8080/users", { params: { term } });
  return data
}

export const useUsers = () => {
  return {
    useUsersList: () => useQuery({
      queryKey: ["users"],
      queryFn: async () => await getUsers(),
      staleTime: 1000 * 60 * 15
    })
  }
}