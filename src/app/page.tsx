'use client'

import { SignInButton, SignOutButton, UserButton, useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div>
      {!isSignedIn && (
        <SignInButton>
          <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Sign In
          </button>
        </SignInButton>
      )}
      {isSignedIn && (
        <SignOutButton>
          <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Sign Out
          </button>
        </SignOutButton>
      )}
      <UserButton />
    </div>
  );
}

