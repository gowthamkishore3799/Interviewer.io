import type { User } from "./user.types";


export interface LoadingContextType {
    loading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

export interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  }
  