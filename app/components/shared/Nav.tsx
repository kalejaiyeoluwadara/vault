"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Nav: React.FC = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const setupProviders = async () => {
      try {
        const fetchedProviders = await getProviders();
        setProviders(fetchedProviders);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    setupProviders();
  }, []);

  return (
    <nav className="w-full bg-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href={"/"} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Image
            alt="Vault Logo"
            height={30}
            width={30}
            src={"/globe.svg"}
            className="rounded-full"
          />
          <p className="text-xl font-bold text-gray-800">Vault</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-4">
          {session?.user ? (
            <div className="flex items-center space-x-4">
              <Link 
                href={"/create-prompt"} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Create Vault
              </Link>
              <button 
                type="button" 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
              <Link href={"/profile"} className="hover:ring-2 hover:ring-blue-500 rounded-full">
                <Image
                  alt="User Profile"
                  className="rounded-full object-cover"
                  height={37}
                  width={37}
                  src={session.user.image || ''}
                />
              </Link>
            </div>
          ) : (
            <div className="flex space-x-4">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden relative">
          {session?.user ? (
            <div className="relative">
              <Image
                alt="User Profile"
                height={37}
                width={37}
                src={session.user.image || ''}
                className="rounded-full cursor-pointer"
                onClick={() => setToggle((prev) => !prev)}
              />
              {toggle && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                  <Link
                    href={"/profile"}
                    onClick={() => setToggle(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                  >
                    My Profile
                  </Link>
                  <Link
                    href={"/create-prompt"}
                    onClick={() => setToggle(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                  >
                    Create Vault
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggle(false);
                      signOut();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;