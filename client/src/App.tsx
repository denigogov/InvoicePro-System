import { useEffect, useState } from "react";
import RootRouter from "./router/RootRouter";
import { fetchTokenValidation } from "./api/apiHelper";
import { UserInfoType } from "./types/AuthType";
import { useAuth } from "./helpers/useAuth";

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const validateToken = async (retryCount: number = 0) => {
      try {
        if (typeof auth.token === "string" && auth.token?.length) {
          const userData = await fetchTokenValidation(auth.token as string);

          if (userData?.success) {
            auth.info(userData.payload as UserInfoType);
          } else {
            auth.logout();
          }
        } else {
          auth.logout();
        }
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (retryCount < 3) {
          setTimeout(() => {
            validateToken(retryCount + 1);
          }, 1000);
        } else {
          setLoading(false);
          setError(
            "Failed to validate token. Please refresh or try again later."
          );
        }
      }
    };
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>{loading ? <p></p> : <RootRouter />}</div>
    </div>
  );
};

export default App;
