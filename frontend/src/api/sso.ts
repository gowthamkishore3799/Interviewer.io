
import { SSO_URL } from '../constants';

export async function ssoLogin(email: string, password: string){
    return await fetch(SSO_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password})
    })
}

export async function signUp(name: string, email: string, password: string, candidateType: string){
    return await fetch(SSO_URL + "/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password, name, candidateType})
    })
}