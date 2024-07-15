import { useNavigate } from "react-router-dom";
import { useFusionAuth } from "@fusionauth/react-sdk";
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
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
      <section className="h-full flex gap-4 justify-center py-20">
        <Todo url={"http://localhost:4000/todo"} title="TODO_1" />
        <Todo url={"http://localhost:3000/todo"} title="TODO_2" />
      </section>
    </>
  )
}
