import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  user_role?: "INSTRUCTOR" | "STUDENT";
}

export default function ProtectedRoute({ children, user_role }: Props) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user_role && user.role !== user_role) return <Navigate to="/login" />;

  return <>{children}</>;
}