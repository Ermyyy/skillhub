import { Link, NavLink } from "react-router-dom"


const Navbar = () => {
      const linkStyle = ({ isActive }: { isActive: boolean }) => `px-3 py-2 rounded-md transition ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`;
  return (
    <nav className="flex justify-between items-center p-4 border-b">
        <Link to='/' className="text-2xl font-bold text-blue-600">
            SkillHub
        </Link>
        <div className="flex gap-4">
            <NavLink to='/' className={linkStyle}>Home</NavLink>
            <NavLink to='/users' className={linkStyle}>Users</NavLink>
            <NavLink to='/profile' className={linkStyle}>Profile</NavLink>
        </div>
    </nav>
  )
}

export default Navbar
