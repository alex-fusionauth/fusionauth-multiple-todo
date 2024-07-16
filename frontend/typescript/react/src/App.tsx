import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import TodoPage from "./pages/TodoPage";
import Todo1LoginPage from "./pages/Todo1LoginPage";
import Todo2LoginPage from "./pages/Todo2LoginPage";
import { FusionAuthProvider } from "@fusionauth/react-sdk";
import { configTodo1, configTodo2 } from '@/lib/config'


function App() {
  return (
    <main className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logged-out" element={<HomePage />} />

        <Route path="/todo1-login" element={
          <FusionAuthProvider {...configTodo1}>
            <Todo1LoginPage />
          </FusionAuthProvider>
        } />
        <Route path="/todo1" element={
          <FusionAuthProvider {...configTodo1}>
            <TodoPage />
          </FusionAuthProvider>
        } />

        <Route path="/todo2-login" element={
          <FusionAuthProvider {...configTodo2}>
            <Todo2LoginPage />
          </FusionAuthProvider>
        } />
        <Route path="/todo2" element={
          <FusionAuthProvider {...configTodo2}>
            <TodoPage />
          </FusionAuthProvider>}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 TODO_2. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </a>
        </nav>
      </footer>
    </main >
  )
}

export default App
