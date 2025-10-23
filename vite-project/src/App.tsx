import { useEffect } from "react";
import "./App.css";

function App() {
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
      .then((data) => console.log("Backend response:", data))
      .catch((error) =>
        console.error("Error fetching data:", (error as Error).message)
      );
  }, []);

  return (
    <div>
      <h1>Hello Vite + React!</h1>
      <p>Check the browser console for the backend response.</p>
    </div>
  );
}

export default App;
