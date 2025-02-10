"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to Ampassador</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard" className="mt-4 text-blue-500">
          Go to Dashboard
        </Link>
      </SignedIn>
    </div>
  );
}
