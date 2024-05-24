"use client";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  func: () => void;
}

export const Button = ({ children, func }: ButtonProps) => {
  return <button onClick={func}>{children}</button>;
};
