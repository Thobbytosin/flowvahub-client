import { useNavigate } from "react-router-dom";
import PageLoader from "../components/ui/PageLoader";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { Onboard } from "../components/onboarding/Onboard";

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

  return (
    <>
      <title>Flowva Hub - Onboarding</title>
      <meta
        name="description"
        content="Your smart library for organizing tools, tracking usage, and turning productivity into rewards."
      />
      <Onboard />
    </>
  );
};

export default Onboarding;
