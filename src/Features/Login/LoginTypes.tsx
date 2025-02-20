import { FormEvent } from "react";

export interface LoginCommonTypes {}
export interface LoginComponentTypes extends LoginCommonTypes {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleNavigateSignUp: () => void;
  loading: boolean;
}
export interface LoginContainerTypes extends LoginCommonTypes {}
