
export interface UserLogin{
    email: string;
    password: string
}

export interface User {
    userId: string;
    name: string;
    email: string;
    candidateType: string;
  }


export interface UserSignIn{
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    candidateType: string,
}