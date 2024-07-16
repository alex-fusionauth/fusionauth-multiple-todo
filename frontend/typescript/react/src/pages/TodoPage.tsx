import { useNavigate } from "react-router-dom";
import { useFusionAuth } from "@fusionauth/react-sdk";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Todo from "@/components/Todo";
import { getCookie } from "@/lib/utils";
import { decodeJwt } from "jose";
import { configTodo1, configTodo2 } from "@/lib/config";

interface Todo {
  id: number,
  title: string,
  status: string
}

export default function TodoPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const { isLoggedIn, startLogout, } =
    useFusionAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const appIdt = getCookie('app.idt');
    if (!appIdt) return;

    const decodedAppIdt = decodeJwt(appIdt);
    if (!decodedAppIdt?.aud) return;
    if (configTodo1.clientId === decodedAppIdt.aud) setTitle('TODO_1');
    if (configTodo2.clientId === decodedAppIdt.aud) setTitle('TODO_2');
  }, [])

  return (
    <>
      <div className="fixed top-0 right-0 p-4 flex w-full">

        {title && <div className="flex-1 flex justify-center text-2xl font-black">Logged Into: {title}</div>}
        <Button onClick={() => startLogout()}>Logout</Button>
      </div>
      <section className="h-full flex gap-4 justify-center py-20">
        <Todo url={"http://localhost:3000/todo1"} title="TODO_1" />
        <Todo url={"http://localhost:3000/todo2"} title="TODO_2" />
      </section>
    </>
  )
}
