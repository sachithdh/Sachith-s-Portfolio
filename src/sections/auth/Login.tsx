import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/blog");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--bg-dark, #121212)", color: "#fff", fontFamily: "var(--font-sans)" }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "320px", padding: "30px", backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}>
        <h2 style={{ textAlign: "center", margin: 0, fontSize: "1.5rem" }}>Admin Login</h2>
        {error && <div style={{ color: "#ff6b6b", fontSize: "0.85rem", textAlign: "center" }}>{error}</div>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff" }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "12px", borderRadius: "6px", border: "none", backgroundColor: "var(--accent-lime, #cff672)", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
