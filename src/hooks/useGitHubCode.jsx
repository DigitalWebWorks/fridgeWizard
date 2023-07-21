import { useEffect, useState } from "react";

const useGitHubCode = () => {
  const [code, setCode] = useState("");

  useEffect(() => {
    const handleCodeParam = () => {
      const params = new URLSearchParams(window.location.search);
      setCode(params.get('code'));
    };
    
    handleCodeParam();
  }, [])
  
  return { code };
}

export default useGitHubCode;