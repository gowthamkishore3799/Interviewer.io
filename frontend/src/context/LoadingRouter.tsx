import { createContext, useContext, useState } from "react";
import type { LoadingContextType } from "../interface/context.type";


const LoadingContext = createContext<LoadingContextType | undefined>(undefined);


export const LoadingRouter = ({children}: {children: React.ReactNode})=>{
    const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () =>{
    const context = useContext(LoadingContext);

    if(!context) throw new Error("loading Context should be inside Loading Router");
    return context;
}