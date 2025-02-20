import { FormEvent } from "react";

export interface SingUpCommonTypes {}

export interface SingUpComponentTypes extends SingUpCommonTypes {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  success: boolean;
  error: string;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleNavigateLogin: () => void;
}

export interface SingUpContainerTypes extends SingUpCommonTypes {}
