"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, Menu, X, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthDialog } from "./auth/auth-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-6 w-6" />
                <span className="font-bold">Dating Directory</span>
              </Link>
              <Link href="/escorts">Acompanhantes</Link>
              <Link href="/favorites">Favoritos</Link>
              <Link href="/auth/register">Cadastro</Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Logo & Nav */}
        <div className="hidden md:flex items-center flex-1 justify-start">
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <Heart className="h-7 w-7" />
            <span className="text-lg font-bold">Dating Directory</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/escorts" className="transition-colors hover:text-foreground/80">
              Acompanhantes
            </Link>
            <Link href="/favorites" className="transition-colors hover:text-foreground/80">
              Favoritos
            </Link>
            <Link href="/auth/register" className="transition-colors hover:text-foreground/80">
              Cadastro
            </Link>
          </nav>
        </div>

        {/* Search, Theme & Auth */}
        <div className="flex items-center justify-end space-x-2 flex-1">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {isSearchOpen ? (
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="Buscar acompanhantes..."
                  className="h-9 w-full md:w-[300px] lg:w-[400px]"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            )}
          </div>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Alternar tema</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="flex items-center space-x-2">
            <AuthDialog
              mode="login"
              trigger={
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              }
            />
            <AuthDialog
              mode="register"
              trigger={
                <Button size="sm">
                  Cadastrar
                </Button>
              }
            />
          </nav>
        </div>
      </div>
    </header>
  );
}