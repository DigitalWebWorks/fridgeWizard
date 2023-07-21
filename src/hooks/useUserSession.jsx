import { useEffect } from "react";


function useUserSession(setIsLoading, setIsLoggedIn) {

  useEffect(() => {
    const checkUserSession = async () => {
      console.count('useUserSession')
      try {
        const res = await checkSession();
        if (res) {
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  return null;
}

export default useUserSession;