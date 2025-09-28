import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            <Navbar />
            <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
                {children}
            </main>
        </div>
    );
};