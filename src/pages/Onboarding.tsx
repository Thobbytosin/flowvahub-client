import { useNavigate } from "react-router-dom";
import PageLoader from "../components/ui/PageLoader";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";

type Props = {};

const Onboarding = (props: Props) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      navigate("/", { replace: true });
    }
  }, [mounted, user, navigate]);

  if (!mounted || !user) return <PageLoader />;

  return <div>Onboarding</div>;
};

export default Onboarding;
