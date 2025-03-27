// src/components/auth/LoginButton.tsx
'use client';
import { signIn } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";

interface LoginButtonProps {
  provider: ClientSafeProvider;
}

export function LoginButton({ provider }: LoginButtonProps) {
  const handleLogin = () => {
    signIn(provider.id, { 
      callbackUrl: '/profile' 
    });
  };

  return (
    <button 
      onClick={handleLogin}
      className="w-full px-4 py-2 border rounded-md"
    >
      Sign in with {provider.name}
    </button>
  );
}