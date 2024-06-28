import { useNavigate } from "react-router-dom";
import { useFusionAuth } from "@fusionauth/react-sdk";
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon } from "lucide-react";
import Todo from "@/components/Todo";

interface Todo {
  id: number,
  title: string,
  status: string
}

export default function TodoPage() {
  const navigate = useNavigate();

  const { isLoggedIn, startLogout } =
    useFusionAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="fixed top-0 right-0 p-4 flex items-end justify-end">
        <Button onClick={() => startLogout()}>Logout</Button>
      </div>
      <section className="h-full flex items-center justify-center flex-1 gap-4 flex-wrap">
        <Todo url={"http://localhost:3000/api/todo1"} title="TODO_1" />
        <Todo url={"http://localhost:3000/api/todo2"} title="TODO_2" />
      </section>
    </>
  )
}
