import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'

function App() {

  return (
    <>
      
      {/* <Login/> */}
      <RouterProvider router={router}/>
    </>
    
  )
}

export default App
