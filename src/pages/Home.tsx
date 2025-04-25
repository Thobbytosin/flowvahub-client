import React, { useEffect, useState } from "react";
import Welcome from "../components/welcome/Welcome";
import PageLoader from "../components/ui/PageLoader";
import { useFetchData } from "../hook/useApi";
import { useUserStore, type User } from "../store/useUserStore";

type Props = {};

interface BackendResponse {
  success: boolean;
  user?: User;
}

const Home = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { data, isFetching, refetch } = useFetchData<BackendResponse>({
    method: "GET",
    url: "/user/me",
    queryKey: ["get-user"],
  });
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    refetch();
  }, [mounted]);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  if (!mounted || isFetching)
    return (
      <main role="status" aria-busy="true">
        <PageLoader />
      </main>
    );
  return (
    <main role="main" aria-label="Welcome page">
      <Welcome />
    </main>
  );
};

export default Home;
