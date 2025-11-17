"use client";
import { useState, useEffect, useRef } from "react";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // click outside closes modal
  const handleBackdropClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
      >
        {/* ❌ Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent backdrop click interference
            onClose();
          }}
          className="absolute top-2 right-2 text-black hover:text-red-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {mode === "login" ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <RegisterForm onSuccess={onClose} />
        )}

        <p className="text-sm text-center mt-4 text-black">
          {mode === "login" ? "Don't have an account?" : "Already registered?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-blue-600 underline"
          >
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
