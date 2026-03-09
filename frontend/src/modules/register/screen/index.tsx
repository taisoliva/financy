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
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth";

const registerSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const success = await signup({ name: data.name, email: data.email, password: data.password });
      if (success) {
        navigate("/login");
      } else {
        setError("root", { message: "Não foi possível criar a conta. Verifique os dados." });
      }
    } catch (error) {
      setError("root", { message: "Ocorreu um erro no servidor. Tente novamente mais tarde." });
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
                Criar conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Comece a controlar suas finanças ainda hoje
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  className="w-full"
                  icon={<UserIcon className="h-4 w-4" />}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
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

              {errors.root && (
                  <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
              )}

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                <span>ou</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-3 text-center text-sm">
                <p className="text-muted-foreground">Já tem uma conta?</p>
                <Link to="/login">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 text-black"
                  >
                    <LogInIcon className="h-4 w-4" />
                    Fazer login
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
