"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

interface AuthDialogProps {
  mode: "login" | "register";
  trigger: React.ReactNode;
}

export function AuthDialog({ mode, trigger }: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Login" : "Criar conta"}
          </DialogTitle>
        </DialogHeader>
        {mode === "login" ? (
          <LoginForm onSuccess={() => setIsOpen(false)} />
        ) : (
          <RegisterForm onSuccess={() => setIsOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}