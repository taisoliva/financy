import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LogInIcon,
  MailIcon,
  UserPlus2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const success = await login({ email: data.email, password: data.password });
      if (success) {
        navigate("/");
      } else {
        setError("root", { message: "E-mail ou senha incorretos" });
      }
    } catch (error) {
      setError("root", { message: "Erro ao tentar fazer login. Tente novamente." });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="flex items-center justify-center py-6">
        <img src="src/assets/Logo.png" alt="Logo" className="h-8 w-auto" />
      </header>

      <main className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-border shadow-lg px-8 py-10 space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Fazer login
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre na sua conta para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@exemplo.com"
                  className="w-full"
                  icon={<MailIcon className="h-4 w-4" />}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="w-full"
                  icon={<LockIcon className="h-4 w-4" />}
                  rightIcon={
                    showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )
                  }
                  onRightIconClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  {...register("password")}
                />
                 {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <Label htmlFor="remember" className="cursor-pointer">
                  <Checkbox id="remember" className="mr-2" {...register("remember")} />
                  Lembrar-me
                </Label>
                <button
                  type="button"
                  className="text-sm font-medium text-brand-base hover:underline"
                >
                  Recuperar senha
                </button>
              </div>

              {errors.root && (
                  <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
              )}

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                <LogInIcon className="h-4 w-4" />
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                <span>ou</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-3 text-center text-sm">
                <p className="text-muted-foreground">
                  Ainda não tem uma conta?
                </p>
                <Link to="/register">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 text-black"
                  >
                    <UserPlus2Icon className="h-4 w-4" />
                    Criar conta
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
