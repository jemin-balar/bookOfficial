import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Helper function to safely access localStorage
const getLocalStorage = () => {
    if (typeof window !== 'undefined') {
        return window.localStorage;
    }
    return null;
};

export function useAuth() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storage = getLocalStorage();
        if (storage) {
            const token = storage.getItem('token');
            const userData = storage.getItem('user');
            setIsAuthenticated(!!token);
            setUser(userData ? JSON.parse(userData) : {});
            if (!token) {
                router.push('/cpanel');
            }
        }
        setLoading(false);
    }, []);

    const logout = () => {
        const storage = getLocalStorage();
        if (storage) {
            storage.removeItem('token');
            storage.removeItem('user');
            setIsAuthenticated(false);
            setUser({});
            router.push('/cpanel');
        }
    };

    return {
        isAuthenticated,
        user,
        logout,
        loading
    };
}

// HOC to protect pages
export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const { isAuthenticated, user, logout, loading } = useAuth();
        
        // Show loading state
        if (loading) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            );
        }

        // Redirect handled in useAuth hook
        if (!isAuthenticated) {
            return null;
        }

        return <Component {...props} auth={{ isAuthenticated, user, logout }} />;
    };
} 