import { useNavigate } from "react-router-dom";
import { useFusionAuth } from "@fusionauth/react-sdk";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  const navigate = useNavigate();

  const { isLoggedIn, isFetchingUserInfo, startLogin, startRegister } =
    useFusionAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/todo");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn || isFetchingUserInfo) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 bg-background">
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="max-w-md text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">TODO_2</h1>
            <p className="text-muted-foreground md:text-xl">
              How to correctly use JWT in API calls.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              onClick={() => startLogin("state-from-login")}
            >
              Login
            </Button>

            <Button
              onClick={() => startRegister("state-from-register")}
              variant="outline"
            >
              Register
            </Button>
          </div>
        </div>
      </main>
    </div>

  );
}
