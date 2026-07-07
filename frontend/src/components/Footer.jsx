// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src="/logo.jpg" alt="Student Hostel Portal Logo" style={{ height: '65px', width: 'auto', borderRadius: '6px' }} />
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Ghana's trusted student accommodation platform for Koforidua Technical University. Find verified, safe, affordable off-campus housing near KTU.
            </p>
            <div className="d-flex gap-3 mt-3">
              {['📘', '🐦', '📸', '💬'].map((emoji, i) => (
                <span key={i} style={{ fontSize: '1.3rem', cursor: 'pointer', opacity: 0.7 }}>{emoji}</span>
              ))}
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h5 style={{ fontSize: '0.95rem' }}>Students</h5>
            <Link to="/search" className="footer-link">Browse Listings</Link>
            <Link to="/map" className="footer-link">Map View</Link>
            <Link to="/faq" className="footer-link">Help & FAQ</Link>
            <Link to="/contact" className="footer-link">Contact Support</Link>
          </div>

          <div className="col-6 col-md-2">
            <h5 style={{ fontSize: '0.95rem' }}>Landlords</h5>
            <Link to="/register" className="footer-link">List Your Property</Link>
            <Link to="/landlord" className="footer-link">Dashboard</Link>
            <Link to="/landlord/requests" className="footer-link">Booking Requests</Link>
          </div>

          <div className="col-md-4">
            <h5 style={{ fontSize: '0.95rem' }}>About KTU Hostel Portal</h5>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Solving Ghana's student housing crisis — verified landlords, transparent pricing, map-based proximity, and a fraud-proof 24-hour reservation system.
            </p>
            <div className="d-flex align-items-center gap-2 mt-2">
              <span style={{
                background: 'rgba(46,204,113,0.15)',
                color: 'var(--success)',
                borderRadius: '20px',
                padding: '2px 10px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>● All systems operational</span>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: 'var(--border)' }} />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} KTU Hostel Portal. Final Year HND Project — KTU, Koforidua, Ghana.
          </p>
          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            🔐 Verified landlords · 🗺️ Map-based search · ⭐ Peer reviews
          </p>
        </div>
      </div>
    </footer>
  );
}
