import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

function App() {
  return (
    <>
      {/* <Login/> */}

      {/* <QueryClientProvider client={queryClient}> */}
        <RouterProvider router={router} />
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;

