import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon } from "lucide-react";

interface Todo {
  date?: number; // Added from server
  sub?: string; // This is the User's Id
  title: string; // Todo from Form
}
export interface Status {
  expiration: boolean | 'fail' | 'success',
  signature: boolean | 'fail' | 'success',
  audience: boolean | 'fail' | 'success',
  sub: boolean | 'fail' | 'success',
}

export default function Todo({ url, title }: { url: string, title: string }) {
  const [todoTitle, setTodoTitle] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [status, setStatus] = useState<Status>({
    expiration: false,
    signature: false,
    audience: false,
    sub: false
  })

  const fetchTodos = async () => {
    const response = await fetch(url, { credentials: 'include' })
    const data = await response.json()
    if (data?.todos?.length > 0)
      setTodos(data.todos)
  }
  useEffect(() => {
    fetchTodos()
  }, [])
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (todoTitle.trim() !== "") {
      try {
        const response = await fetch(url, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: todoTitle }),
        });
        const newTodo = await response.json()
        setStatus({
          ...newTodo.status
        })
        setTodoTitle("")
        fetchTodos()
      } catch (e) {
        console.error(e);
        setStatus({
          expiration: false,
          signature: false,
          audience: false,
          sub: false,
        })
        setTodoTitle("")
      }
    }
  }

  const statusMarks = (mark: typeof status.audience) => <>

    {mark ? (
      <>
        {mark === 'success' ? (
          <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-green-500 bg-green-100 rounded-full">
            <CheckIcon className="w-4 h-4" />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-red-500 bg-red-100 rounded-full">
            <XIcon className="w-4 h-4" />
          </span>
        )}
      </>
    ) : (
      <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-gray-300 rounded-full">
      </span>
    )}
  </>

  return (
    <>
      <section className="flex justify-start">
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
                  <div className="flex items-center justify-between">
                    {statusMarks(status.expiration)}
                    <p className="font-medium">Checked JWT Expiration</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center justify-between">
                    {statusMarks(status.signature)}
                    <p className="font-medium">Checked Valid JWT by Signature</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center justify-between">
                    {statusMarks(status.audience)}
                    <p className="font-medium">Checked JWT Audience is Correct</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center justify-between">
                    {statusMarks(status.sub)}
                    <p className="font-medium">Added Todo for User Specified in Sub</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <CardContent>
            <div className="space-y-4">
              {todos?.map((t, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{t?.title}</p>
                    <p className="text-sm text-muted-foreground">Date: {t?.date && new Date(t.date).toLocaleDateString()}</p>
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
