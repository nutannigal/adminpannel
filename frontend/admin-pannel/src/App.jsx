import { BrowserRouter,Route ,Routes} from 'react-router-dom'
import  Navbar from './components/Navbar'

import './App.css'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import About from './pages/About'
import Services from './pages/Services'
import Careers from './pages/Careers'
// import Header from './components/Header'
import Contact from './pages/Contact'
import Dashbord from './pages/admin/Dashbord'
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    {/* <Header/> */}
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/services" element={<Services/>}></Route> 
        <Route path="/contact" element={<Contact/>}></Route>
                <Route path="/careers" element={<Careers/>}></Route>
         <Route path="/admin" element={<PrivateRoute><Dashbord/></PrivateRoute>}></Route>

      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
