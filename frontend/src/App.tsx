import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginScreen from "./modules/login/screen";
import RegisterScreen from "./modules/register/screen";
import { useAuthStore } from "./stores/auth";
import { Header } from "./components/ui/common/header";
import { CategoriesScreen } from "./modules/categories/screens";
import { DashboardScreen } from "./modules/dashboard/screen";
import { TransactionsScreen } from "./modules/transactions/screens";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full bg-gray-50 border-t border-border/40">
           <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterScreen />
          </PublicRoute>
        }
      />

      {/* Rotas Privadas que usam o Layout base com Header */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardScreen />} />
        <Route path="/transactions" element={<TransactionsScreen />} />
        <Route path="/categories" element={<CategoriesScreen />} />
      </Route>
      
      {/* Fallback de rotas nulas redireciona para a raiz logada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
