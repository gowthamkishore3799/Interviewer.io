import { userDetailsKey } from "../constants";
import type { User } from "../interface/user.types";

function getUserDetails(){
    const userDetails = sessionStorage.getItem(userDetailsKey);

    if(!userDetails){
        return null;
    }

    let userInfo = JSON.parse(userDetails)
    return userInfo;
}

function setUserDetails(user: User){
    sessionStorage.setItem(userDetailsKey, JSON.stringify(user));
}

export { getUserDetails, setUserDetails };
