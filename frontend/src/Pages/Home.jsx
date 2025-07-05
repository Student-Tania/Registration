import { useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom"


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
    textAlign: "center",
  },
  username: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
    color:"black"
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
export default function Home()
{

    const[user,setUser]=useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchUser=async()=>{
            const res = await fetch("http://localhost:4000/api/auth/me",{
                credentials:"include"
            });
            if (res.ok) {
              const data = await res.json();
              setUser(data);
            } else {
              navigate("/login");
            }
        }
        fetchUser()
    },[])

    const handleLogout = async () => {
      try {
        await fetch("http://localhost:4000/api/auth/logout", {
          credentials: "include",
        });
        navigate("/login");
      } catch (err) {
        console.error("Logout failed");
      }
    };

    return (
      <div style={styles.container}>
        <h2 style={styles.username}>
          Welcome, {user?.username || "Loading..."}
        </h2>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    );
}