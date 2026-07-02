import { Button } from "@/components/ui/button";

import { logout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

export default function TopNavbar() {
  const dispatch = useAppDispatch();

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="text-lg font-semibold">
        Dashboard
      </h1>

      <Button
        variant="outline"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </header>
  );
}