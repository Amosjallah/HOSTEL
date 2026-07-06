// src/components/StudentSidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, MessageSquare, Search, Map } from 'lucide-react';

export default function StudentSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/student', icon: <Home size={18} /> },
    { name: 'My Bookings', path: '/student/bookings', icon: <Clock size={18} /> },
    { name: 'My Reviews', path: '/student/reviews', icon: <MessageSquare size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="d-flex flex-column h-100 justify-content-between">
        <div>
          <div className="px-4 py-2 mb-3 text-muted-custom" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Student Portal
          </div>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`sidebar-item text-decoration-none ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="p-3">
          <div className="p-3 rounded-custom bg-surface-2 border-custom" style={{ fontSize: '0.8rem' }}>
            <h6 className="mb-2 text-orange" style={{ fontSize: '0.85rem' }}>Need a Room?</h6>
            <p className="text-muted-custom mb-3" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
              Browse through our fully verified property list near campus.
            </p>
            <div className="d-flex flex-column gap-2">
              <Link to="/search" className="btn btn-primary btn-sm py-1.5 d-flex align-items-center justify-content-center gap-1">
                <Search size={14} /> Search Listings
              </Link>
              <Link to="/map" className="btn btn-outline-primary btn-sm py-1.5 d-flex align-items-center justify-content-center gap-1">
                <Map size={14} /> View Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
