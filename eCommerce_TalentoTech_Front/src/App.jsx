import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from "react-router-dom"
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from "./components/Register"

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
         <Route index element={<Login />} />
         <Route index path="/register" element={<Register />} />

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
