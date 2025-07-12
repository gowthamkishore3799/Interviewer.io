import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router";
import { LoadingScreen } from "../components/loadingPage";
import { userDetailsKey } from "../constants";
import { MenuPage } from "./menuPage";


type Payload = {
    [key:string]: string
}

type action = {
    payload: Payload;
    type:String
}

function reducer(state: any, action: action){

    switch(action.type){
        case "update":
            state = {...state, ...action.payload, "loggedIn": true}
            return state;
        default:
            break;
    }
}



export function HomePage(){


    const nav = useNavigate();
    const [userInfo, dispatch] = useReducer(reducer, {"loggedIn": false});

    useEffect(() => {
        const userDetails = sessionStorage.getItem(userDetailsKey);
        if (!userDetails) {
          nav("/login", { replace: true });
        } else{
            dispatch({ type: "update" , payload: JSON.parse(userDetails)});
        }
      }, []);

    return (
        <>
        {!userInfo?.loggedIn ? <LoadingScreen/> : <MenuPage/>}
        </>
    )
}