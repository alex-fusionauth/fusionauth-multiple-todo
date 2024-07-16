import { decodeJwt } from 'jose'
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { configTodo1, configTodo2 } from '@/lib/config';
import { getCookie } from '@/lib/utils';

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const appIdt = getCookie('app.idt')
    if (!appIdt) return;

    const decodedAppIdt = decodeJwt(appIdt);
    if (!decodedAppIdt?.aud) return;
    if (!decodedAppIdt?.exp || decodedAppIdt.exp * 1000 < Date.now()) return;
    if (configTodo1.clientId === decodedAppIdt.aud) navigate("/todo1");
    if (configTodo2.clientId === decodedAppIdt.aud) navigate("/todo2");
  }, [])

  return (
    <div className="flex flex-col flex-1 bg-background">
      <main className="flex-1 flex items-center justify-center px-4 md:px-6 gap-2 md:gap-8">
        <div className="max-w-md text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">TODO_1</h1>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              onClick={() => navigate("/todo1-login")}
            >
              Access
            </Button>
          </div>
        </div>
        <div className="max-w-md text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">TODO_2</h1>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              onClick={() => navigate("/todo2-login")}
            >
              Access
            </Button>
          </div>
        </div>
      </main>
    </div>

  );
}
