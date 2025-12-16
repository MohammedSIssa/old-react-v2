import { useState } from "react";

import { saveUser } from "../../scripts/localStorage";

import { API, DEV_API } from "../../scripts/globals";

import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logginIn, setLogginIn] = useState(false);

  const API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/login`
      : `${DEV_API}/login`;

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [message, setMessage] = useState(
    user?.username ? "انت مسجل الدخول" : "",
  );

  async function login(e) {
    e.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
      try {
        setLogginIn(true);
        setMessage("");
        const response = await fetch(API_CALL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          saveUser(data);
          setSuccess(true);
          setFailure(false);
          setMessage("تم تسجيل الدخول بنجاح");
        }

        if (!response.ok) {
          setUser({});
          setLogginIn(false);
          setPassword("");
          setSuccess(false);
          setFailure(true);
          setMessage("خطأ في البيانات");
          setUsername("");
        }
      } catch {
        throw new Error("Failed to login!");
      }
    } else {
      setMessage("اكتب اسمك وكلمة السر");
      setFailure(true);
      setSuccess(false);
    }
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <form
        className="login-form flex max-w-[300px] flex-col gap-5 rounded-lg border p-10 transition-all duration-200"
        onSubmit={login}
        style={
          success
            ? {
                backgroundColor: "var(--success-login-bg-color)",
                borderColor: "var(--success-login-border-color)",
              }
            : failure
              ? {
                  backgroundColor: "var(--failure-login-bg-color)",
                  borderColor: "var(--failure-login-border-color)",
                }
              : {}
        }
      >
        {!success && (
          <>
            <label htmlFor="username" className="font-bold">
              اسم المستخدم:
            </label>
            <input
              type="text"
              dir="ltr"
              name="username"
              id="username"
              className="rounded-lg p-2 px-5 text-zinc-50 focus:border focus:outline-0 disabled:opacity-30"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setFailure(false);
                setMessage("");
              }}
              autoComplete="off"
              required
              style={
                failure
                  ? {
                      backgroundColor: "var(--failure-login-border-color)",
                      borderColor: "var(--failure-login-bg-color)",
                    }
                  : {
                      backgroundColor: "var(--bg-color)",
                      borderColor: "var(--story-border-color)",
                    }
              }
              disabled={logginIn || user?.username}
            />

            <label htmlFor="password" className="font-bold">
              كلمة السر:
            </label>
            <input
              type="password"
              dir="ltr"
              name="password"
              autoComplete="off"
              id="password"
              className="rounded-lg p-2 px-5 text-zinc-50 focus:border focus:outline-0 disabled:opacity-30"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFailure(false);
                setMessage("");
              }}
              required
              style={
                failure
                  ? {
                      backgroundColor: "var(--failure-login-border-color)",
                      borderColor: "var(--failure-login-bg-color)",
                    }
                  : {
                      backgroundColor: "var(--bg-color)",
                      borderColor: "var(--story-border-color)",
                    }
              }
              disabled={logginIn || user?.username}
            />

            <button
              onClick={login}
              disabled={logginIn}
              style={
                failure
                  ? {
                      borderColor: "var(--failure-login-border-color)",
                      backgroundColor: "var(--failure-login-bg-color)",
                    }
                  : {
                      backgroundColor: "var(--bg-color)",
                      borderColor: "var(--story-border-color)",
                    }
              }
              className="rounded-lg border p-2 px-5 transition-all duration-100 hover:cursor-pointer hover:brightness-125 disabled:cursor-progress disabled:opacity-25"
            >
              سجل الدخول
            </button>
          </>
        )}
        {logginIn && !success && <p>جار تسجيل الدخول..</p>}
        {success && (
          <p className="px-5 text-2xl font-bold text-green-300">{message}</p>
        )}
        {failure && <p className="text-red-300">{message}</p>}
      </form>
    </div>
  );
}
