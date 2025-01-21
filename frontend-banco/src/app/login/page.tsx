import { Metadata } from 'next';

import LoginForm from '@/components/login/login-form';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}