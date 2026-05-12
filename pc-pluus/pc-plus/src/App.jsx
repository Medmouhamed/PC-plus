
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Regester from './pages/Regester/Regester'
import { AuthProvider } from './Contex/AuthContext'
import Shop from './pages/Shop/Shop'
import Cartpage from './pages/Cart/Cartpage'
import { CartProvider } from './Contex/CartContext';
import UserProfile from './pages/UserProfile/UserProfile'
import { FavoriteProvider } from './Contex/FavoriteContext'


function App() {

  return (

    <AuthProvider>

      <CartProvider>
        <FavoriteProvider>

          <Router>

            <div className="app">

              <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Regester' element={<Regester />} />

                <Route path='/Shop' element={<Shop />} />
                <Route path='/Shop/ProductDetails/:id' element={<Shop />} />
                <Route path='/Cart' element={<Cartpage />} />

                <Route path='/UserProfile' element={<UserProfile />} />


              </Routes>

            </div>
          </Router>


        </FavoriteProvider>




      </CartProvider>

    </AuthProvider>

  )
}

export default App
