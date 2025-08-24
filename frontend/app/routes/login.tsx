
import { LoginForm } from "~/components/auth/login-form";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return (
    <div className="flex h-screen w-screen justify-center p-6 md:p-10">
      <LoginForm />
    </div>
  );
}
