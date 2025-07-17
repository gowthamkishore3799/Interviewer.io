import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { GlobalLoader } from "../components/LoadingPage";
import { CANDIDATE_TYPE } from "../constants";
import { useAuth } from "../context/AuthRouter";
import { MenuPage } from "./mainMenu";

const CANDIDATE_ROUTES = ["/interview"]
const RECRUITER_ROUTES = ["/add"];

export function Layout() {
  const nav = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      nav("/login", { replace: true });
      return;
    }

    const path = location.pathname;



    if (user!.candidateType === CANDIDATE_TYPE.RECRUITER && CANDIDATE_ROUTES.some(r => path.startsWith(r))) {
      nav("/", { replace: true });
    }

    if (user!.candidateType === CANDIDATE_TYPE.CANDIDATE && RECRUITER_ROUTES.some(r => path.startsWith(r))) {
      nav("/", { replace: true });
    }
  }, [user, location.pathname]);

  if (!user) {
    return <GlobalLoader />;
  }

  return <MenuPage />;
}
