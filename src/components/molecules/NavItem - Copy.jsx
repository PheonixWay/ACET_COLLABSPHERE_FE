import { NavLink } from 'react-router-dom'
export default function NavItem({ to, label }){ return (<NavLink to={to} className={({isActive})=>`block sidebar-link-size ${isActive ? 'sidebar-link-active' : 'sidebar-link'}`} end>{label}</NavLink>) }
