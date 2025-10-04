import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toastIfError } from "../../utils/errorHandling";

import { z } from "zod";

function LoginPage() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e,
  ) => {
    e.preventDefault();

    try {

      const fromLocationStateSchema = z.object({
        from: z.object({
          pathname: z.string(),
          search: z.string(),
        }),
      });

      const parsedState = fromLocationStateSchema.safeParse(location.state);

      if (parsedState.success) {
        navigate(
          parsedState.data.from.pathname + parsedState.data.from.search,
          {
            replace: true,
          },
        );
        return;
      }

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toastIfError(error, "Failed to login");
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/"); // Move the navigation logic here
    }
  }, [navigate, auth.isLoggedIn]);

  return (
    <div className="flex min-h-screen bg-gray-200 items-center justify-center w-full">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login Form</h1>
        <form onSubmit={(e) => void handleLogin(e)} className="login-form">
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full py-5 px-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full py-5 px-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="login-btn w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
