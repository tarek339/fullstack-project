import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => console.log(data))
      .catch((error) =>
        console.error("Error fetching data:", (error as Error).message)
      );
  }, []);

  return (
    <div>
      <h1>Hello Vite + React!</h1>
    </div>
  );
}

export default App;
