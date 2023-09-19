import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((accessToken, user) => {
    setToken(accessToken);
    setUser(user);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        user,
        accessToken,
      })
    );
  }, []);

  const leave = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.accessToken) {
      login(data.accessToken, data.user);
    }
  }, [login]);

  return {
    login,
    leave,
    token,
    user,
  };
};
