"use client";

//  React
import { createContext, useContext, ReactNode } from "react";

//  Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  Axios
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

//  Next auth
// import { getSession } from "next-auth/react";
// import { getServerSession, Session } from "next-auth";

interface GlobalContextType {
  showError: (error: unknown) => void;
  // getClientSessionStatus: () => Promise<Session | null>;
  // getServerSessionStatus: () => Promise<Session | null>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const showError = (error: unknown) => {
    let errorMessage = "An unexpected error occurred";
    let closeSession = false;

    if (error instanceof AxiosError) {
      if (error.status == 401) {
        closeSession = true;
        signOut({ callbackUrl: "/", redirect: true });
        errorMessage = "The session need to be revalidated";
      } else {
        errorMessage = error.message || "A network error occurred";
      }
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

  // async function getClientSessionStatus() {
  //   const sessionContext = await getSession();
  //   return sessionContext;
  // }

  // async function getServerSessionStatus() {
  //   const sessionContext = await getServerSession();
  //   return sessionContext;
  // }

  return (
    <GlobalContext.Provider value={{ showError }}>
      {children}
      <ToastContainer />
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
