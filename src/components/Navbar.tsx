import { useAuthStore } from '../stores/authStore';

export const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">To-Do List</h1>
                {user && (
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-600">Hoş Geldin</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                        >
                            Çıkış Yap
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};