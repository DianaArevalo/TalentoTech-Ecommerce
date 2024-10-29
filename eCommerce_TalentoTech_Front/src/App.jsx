import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from "react-router-dom"
import Login from './components/auth/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from "./components/auth/Register"
import Dashboard from "./pages/Dashboard"

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
          <Route index element={<Login />} /> 
         {/* colocar dashboard como principal  */}
         <Route index path="/register" element={<Register />} />
         <Route index path="/dashboard" element={<Dashboard />} />

      </Route>
    )
  )

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  )

 
}

export default App
const Root = () => {
  return (
      <>
          <section>
              <Navbar />
          </section>
          <section>
              <Outlet />
          </section>
          <section>
              <Footer />
          </section>

      </>
  )
}
