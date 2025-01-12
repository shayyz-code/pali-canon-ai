import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import ProviderGlobalContext from "./context/ProviderGlobalContext.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderGlobalContext>
      <App />
    </ProviderGlobalContext>
  </StrictMode>
)
