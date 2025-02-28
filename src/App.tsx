import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";

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



// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Donors from "../src/pages/Donors"

// const queryClient = new QueryClient(); // ✅ Define QueryClient

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <Routes>
//           <Route path="/donors" element={<Donors />} />
//         </Routes>
//       </Router>
//     </QueryClientProvider>
//   );
// }

// export default App;
