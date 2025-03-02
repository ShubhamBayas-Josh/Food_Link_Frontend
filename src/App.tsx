import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { AuthProvider } from "./pages/AuthContext"; // ✅ Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
