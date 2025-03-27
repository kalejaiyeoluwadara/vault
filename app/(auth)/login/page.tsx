// src/app/(auth)/login/page.tsx
import { ClientSafeProvider, getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginButton } from "@/app/components/auth/LoginButton";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect('/profile');
  }

  const providers = await getProviders();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {providers ? (
          <div className="space-y-4">
            {Object.values(providers).map((provider) => (
              <LoginButton 
                key={provider.id} 
                provider={provider as ClientSafeProvider} 
              />
            ))}
          </div>
        ) : (
          <p>No authentication providers available</p>
        )}
      </div>
    </div>
  );
}