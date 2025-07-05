import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login()
{
    console.log("Login component rendered");
    const[form,setForm]=useState({username:"",password:""})
    const[error,setError]=useState("")
    const navigate=useNavigate()

    const handleChange=(event)=>{
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleLogin=async(event)=>{
        event.preventDefault();
        setError("");
        console.log("Form submitted");
        try{
            const res=await fetch("http://localhost:4000/api/auth/login",{
                method:"POST",
                credentials:"include",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(form)
            })

            const data=await res.json()
            if(res.ok)
            {
                navigate("/home")
            }
            else{
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
          }
    }

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            style={styles.input}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            style={styles.input}
          ></input>
          <button type="submit" style={styles.button}>
            Login
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
    marginBottom: "0.2rem",
    color: "black",
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