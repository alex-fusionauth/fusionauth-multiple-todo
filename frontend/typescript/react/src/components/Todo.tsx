import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon } from "lucide-react";

interface Todo {
  id: number,
  title: string,
  status: string
}

export default function Todo({ url, title }: { url: string, title: string }) {
  const [todoTitle, setTodoTitle] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setTodos(data)
    }
    fetchTodos()
  }, [])
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (todoTitle.trim() !== "") {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: todoTitle }),
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setTodoTitle("")
    }
  }
  return (
    <>
      <section className="flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Todo Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter a todo task"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                  />
                </div>
                <Button type="submit">Add Todo</Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Todo Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-green-500 bg-green-100 rounded-full">
                      <CheckIcon className="w-4 h-4" />
                    </span>
                    <p className="font-medium">Checked JWT Expiration</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-green-500 bg-green-100 rounded-full">
                      <CheckIcon className="w-4 h-4" />
                    </span>
                    <p className="font-medium">Checked Valid JWT by Signature</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-red-500 bg-red-100 rounded-full">
                      <XIcon className="w-4 h-4" />
                    </span>
                    <p className="font-medium">Checked JWT Audience is Correct</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-green-500 bg-green-100 rounded-full">
                      <CheckIcon className="w-4 h-4" />
                    </span>
                    <p className="font-medium">Added Todo for User Specified in Sub</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <CardContent>
            <div className="space-y-4">
              {todos.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{todo.title}</p>
                    <p className="text-sm text-muted-foreground">Status: {todo.status}</p>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto"
                      onClick={() => {
                        fetch("YOUR_API_URL", {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            status: "completed",
                          }),
                        })
                        setTodos(todos.map((t) => (t.id === todo.id ? { ...t, status: "completed" } : t)))
                      }}
                    >
                      {todo.status === "completed" ? "Undo" : "Complete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </section>
    </>
  )
}
