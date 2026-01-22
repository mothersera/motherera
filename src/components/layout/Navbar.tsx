"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X, User as UserIcon } from "lucide-react";
import { useState } from "react";

import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg?v=3" alt="Mother Era Logo" width={32} height={32} className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight font-serif text-primary">
            Mother Era
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          {session ? (
            <>
              <Link href={session.user.role === 'expert' ? '/expert/dashboard' : '/dashboard'} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                  <UserIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{session.user.name?.split(' ')[0]}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-6">
          <div className="flex flex-col space-y-4">
            <Link href="/about" className="text-base font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="/pricing" className="text-base font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            {session ? (
              <>
                <Link href={session.user.role === 'expert' ? '/expert/dashboard' : '/dashboard'} className="text-base font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <div className="pt-4 border-t border-border">
                  <p className="mb-2 text-sm text-muted-foreground">Signed in as {session.user.name}</p>
                  <Button variant="outline" className="w-full" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
