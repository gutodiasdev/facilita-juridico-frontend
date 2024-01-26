"use client";

import { User } from "@/domain/@types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { GridLoader } from "react-spinners";

export function RouteRoot() {
  const query = useQueryClient()
  const users = query.getQueryData(["users"])

  const { data, isLoading, isError } = useQuery({
    queryKey: ["route"],
    queryFn: async () => {
      const { data } = await axios.post("http://localhost:8080/route/calculate", { customers: users });
      return data;
    },
    staleTime: 1000 * 60 * 15
  });

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24 w-full">
        <GridLoader color="#5528ff" />
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24 w-full">
        <p>
          Error...
        </p>
      </main>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-2xl font-semibold">Ordem de visitação</h2>
      {data.map((user: User, i: number) => {
        return (
          <div key={i}>
            <p><span>{i}. </span>{user.name}</p>
          </div>
        )
      })}
    </div>
  );
}