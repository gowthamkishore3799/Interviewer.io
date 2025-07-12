
import { SSO } from '../constants';

export async function login(email: string, password: string){
    return await fetch(SSO + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password})
    })
}

export async function signUp(name: string, email: string, password: string, candidateType: string){
    return await fetch(SSO + "/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password, name, candidateType})
    })
}