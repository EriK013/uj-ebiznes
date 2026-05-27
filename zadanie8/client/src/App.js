import React, { useState } from "react";

const API = "http://localhost:8080";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const auth = async (endpoint) => {
    setMsg("");
    try {
      const res = await fetch(`${API}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || "Błąd");
        return;
      }
      if (endpoint === "login") {
        setUser({ email: data.email });
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        setMsg("Zarejestrowano — możesz się zalogować");
      }
    } catch (err) {
      setMsg("Błąd połączenia");
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setEmail("");
    setPassword("");
    localStorage.removeItem("token");
  };

  const checkMe = async () => {
    const res = await fetch(`${API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Zadanie 8</h1>
      {user ? (
        <div>
          <p>Zalogowany jako <b>{user.email}</b></p>
          <p>Token: <code style={{ wordBreak: "break-all" }}>{token}</code></p>
          <button onClick={checkMe}>Sprawdź /me</button>
          <button onClick={logout} style={{ marginLeft: 8 }}>Wyloguj</button>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <button type="submit" onClick={() => auth("login")}>
            Zaloguj
          </button>
          <button type="button" onClick={() => auth("register")} style={{ marginLeft: 8 }}>
            Zarejestruj
          </button>
          {msg && <p>{msg}</p>}
        </form>
      )}
    </div>
  );
}
