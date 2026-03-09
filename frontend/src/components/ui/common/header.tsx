import { NavLink } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import Logo from "@/assets/Logo.png";
import { useAuthStore } from "@/stores/auth";

export const Header = () => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition-colors hover:text-brand-base ${isActive ? "text-brand-base font-semibold" : "text-muted-foreground"
        }`;

    return (
        <header className="relative flex items-center justify-between w-full h-16 px-8 bg-white border-b border-border">
            <div className="flex z-10 items-center">
                <img src={Logo} alt="Financy Logo" className="h-8 w-auto" />
            </div>

            <div className="absolute inset-x-0 flex justify-center items-center pointer-events-none">
                <nav className="flex items-center gap-6 pointer-events-auto">
                    <NavLink to="/" className={navLinkClass}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/transactions" className={navLinkClass}>
                        Transações
                    </NavLink>
                    <NavLink to="/categories" className={navLinkClass}>
                        Categorias
                    </NavLink>
                </nav>
            </div>

            <div className="flex z-10 items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors">
                    <UserCircle className="w-6 h-6 text-gray-700" />
                </div>
                <button
                    onClick={() => useAuthStore.getState().logout()}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                    title="Sair"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};