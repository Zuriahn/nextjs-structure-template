import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

class AxiosService {
  protected axiosInstance: AxiosInstance;

  constructor(serviceBasePath: string) {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}${serviceBasePath}`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private async getToken() {
    const session = await getSession();
    return session?.accessToken;
  }

  public handleError(error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error axios desde server");
    } else {
      throw new Error("Unexpected error");
    }
  }

  private initializeInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Example: Attach token if available
        const token = await this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        return Promise.reject(error);
      }
    );

    // this.axiosInstance.interceptors.response.use(
    //   (response) => response,
    //   (error: AxiosError<{ message?: string }>) => {
    //     if (typeof window !== "undefined") {
    //       toast.error(
    //         error.response?.data?.message || "An unexpected error occurred",
    //         {
    //           position: "top-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           theme: "dark",
    //         }
    //       );
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  }
}

export default AxiosService;
