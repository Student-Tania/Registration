import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
 const[form,setForm]=useState({username:"",password:""})
 const[error,setError]=useState("")
 const navigate = useNavigate();

 const handleChange=(event)=>{
    setForm({...form,[event.target.name]:event.target.value})
 }
 
 const handleSubmit=async(e)=>{
    e.preventDefault()
    setError("")
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data =await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      setError("Something went wrong");
    }
 }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        ></input>
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        ></input>
        <button style={styles.button} type="submit">
          Sign Up
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: "300px",
    margin: "auto",
    marginTop: "100px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
    color:'black'
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "10px",
  },
};
