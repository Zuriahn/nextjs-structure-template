"use client";

//  React
import { createContext, useContext, ReactNode } from "react";

//  Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  Axios
import { AxiosError } from "axios";

interface ErrorContextType {
  showError: (error: unknown) => void;
}

const GlobalErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function GlobalErrorProvider({ children }: { children: ReactNode }) {
  const showError = (error: unknown) => {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof AxiosError) {
      errorMessage = error.message || "A network error occurred";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000, // Disappears after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <GlobalErrorContext.Provider value={{ showError }}>
      {children}
      <ToastContainer />
    </GlobalErrorContext.Provider>
  );
}

export function useGlobalError() {
  const context = useContext(GlobalErrorContext);
  if (!context) {
    throw new Error("useGlobalError must be used within a GlobalErrorProvider");
  }
  return context;
}
