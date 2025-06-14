'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  SignIn,
} from '@clerk/nextjs';  // use app-beta here as well
import { AppHeader } from './allinsight/_components/AppHeader';
import { AllinsightProvider } from './allinsight/provider';

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/allinsight/home');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return null;

 return (
  <>
    <AllinsightProvider />
    <div className="min-h-screen bg-white text-black flex items-center justify-center relative">
      <SignedOut>
        <div className="w-full max-w-md p-4">
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="absolute top-4 right-4">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </SignedIn>
    </div>
  </>
);

}
