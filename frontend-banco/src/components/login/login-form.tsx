'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { Button } from '@/components/ui/button';
import { authenticate } from "@/lib/actions"

export default function LoginForm() {

  const [code, action] = useActionState(authenticate, undefined);

  return (
    <form className="mt-8 space-y-6" action={action}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="username" className="sr-only">Usuario</label>
          <input
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id="username"
            type="text"
            name="username"
            placeholder="Usuario"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Contraseña</label>
          <input
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            minLength={5}
          />
        </div>
      </div>
      <LoginButton />
      <div className="flex h-8 items-end space-x-1">
        {code === 'CredentialSignin' && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p aria-live="polite" className="text-sm text-red-500">
              Invalid credentials
            </p>
          </>
        )}
      </div>
    </form>
  )

}

function LoginButton() {

  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
