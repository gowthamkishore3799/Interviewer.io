import { useEffect } from "react";
import { useNavigate } from "react-router";
import { GlobalLoader } from "../components/LoadingPage";
import { useAuth } from "../context/AuthRouter";
import { MenuPage } from "./menuPage/mainMenu";

export function Layout() {
  const nav = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      nav("/login", { replace: true });
    }
  }, []);

  if(!user){
    return (<GlobalLoader/>)
  }

  return (
    <>
      <MenuPage />
    </>
  );
}
