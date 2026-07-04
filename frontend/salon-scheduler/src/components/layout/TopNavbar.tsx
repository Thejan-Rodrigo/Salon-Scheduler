import { Button } from "@/components/ui/button";

import { logout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="text-lg font-semibold">
        Dashboard
      </h1>

      <Button
        variant="outline"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </header>
  );
}