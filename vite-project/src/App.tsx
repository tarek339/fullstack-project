import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Using the Vite proxy - requests to /api/* will be forwarded to localhost:3000
    fetch("/api/")
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        console.log("Backend response:", data);
        setMessage(data);
      })
      .catch((error) =>
        console.error("Error fetching data:", (error as Error).message)
      );
  }, []);

  return (
    <div className="">
      <h1>Hello Vite + React!</h1>
      <p>
        Message from backend:{" "}
        <span className="font-bold text-blue-500">{message}</span>
      </p>
    </div>
  );
}

export default App;
