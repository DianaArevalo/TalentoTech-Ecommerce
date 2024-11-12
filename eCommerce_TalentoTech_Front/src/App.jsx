import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from "react-router-dom"
import Login from './pages/auth/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from "./pages/auth/Register"
import Dashboard from "./pages/Dashboard"
import Orders from "./pages/cart/Orders"
import Products from "./pages/services/Products"
import Contact from "./components/Contact"
import ProductDetails from "./pages/services/ProductDetails"

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
          <Route index element={<Dashboard />} /> 
         {/* colocar dashboard como principal  */}
         <Route index path="/register" element={<Register />} />
         <Route index path="/login" element={<Login />} />
         <Route index path="/orders" element={<Orders />} />
         <Route index path="/products" element={<Products/>} />
         <Route index path="/contactForm" element={<Contact/>} />
         <Route index path="/productDetails" element={<ProductDetails/>} />
         

      </Route>
    )
  )

  return (
    <div className="App h-screen">
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
