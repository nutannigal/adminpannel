import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primery'>
      <div className='container'>
        <Link className='navbar-brand' to="/">IT Company</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="Collapse" data-bs-target="#navbarNav">
        <span className=' navbar-toggler-icon'></span></button>
        <div className='collapse navbar-collapse'id='navbarNav'>
          <ul className='navbar-nav-ms-auto'>
            <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
            <li className='nav-item'><Link className='nav-link' to='/about'>About</Link></li>
            <li className='nav-item'><Link className='nav-link' to='/services'>Services</Link></li>
            <li className='nav-item'><Link className='nav-link' to='/carrees'>Carrers</Link></li>
            <li className='nav-item'><Link className='nav-link' to='/contact'>Contact</Link></li>
            <li className='nav-item'><Link className='nav-link' to='/admin/login'>Admin</Link></li>
          </ul>
        

      </div></div>
    </nav>
  )
}
export default Navbar;