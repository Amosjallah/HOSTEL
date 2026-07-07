// src/pages/FaqPage.jsx
import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Clock, ShieldCheck, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ_ITEMS = [
  {
    icon: <Clock className="text-orange" size={20} />,
    q: "How does the 24-Hour Reservation Hold work?",
    a: "When you find a room you like, you can place a 'Hold' on it. This temporarily reserves the room for 24 hours and changes its status to 'Pending' so other students cannot book it. The landlord is notified in-app and via SMS and has 24 hours to approve or decline. If approved, the landlord's contact details are released to you to arrange offline payment. If they do not respond within 24 hours, the hold automatically expires and the room is listed back as 'Available'."
  },
  {
    icon: <ShieldCheck className="text-success" size={20} />,
    q: "Do I pay any booking fees or rent online?",
    a: "No! The KTU Student Hostel Portal does not process payments. All financial transactions are completed offline directly between the student and the landlord (in person or via Mobile Money) after the landlord approves your reservation hold. Never pay a landlord before visiting the property and verifying the room details."
  },
  {
    icon: <ShieldCheck className="text-orange" size={20} />,
    q: "How do I know if a landlord and listing are verified?",
    a: "Every landlord must upload a valid national ID scan (e.g., Ghana Card) upon registration, which is manually reviewed by the KTU Admin team. Furthermore, every property listing undergoes verification to ensure structural integrity and accurate pricing. Approved landlords and listings display verification badges throughout the portal."
  },
  {
    icon: <Star className="text-gold" size={20} />,
    q: "Why can't I write a review for any hostel?",
    a: "To prevent fake ratings and spam reviews, we enforce a strict booking-gated review system. Only students who have had a booking approved by a landlord can submit a review and rating for that specific property. This guarantees all reviews are written by actual past occupants."
  },
  {
    icon: <HelpCircle className="text-info" size={20} />,
    q: "How does the distance from campus get calculated?",
    a: "When a landlord adds a property, our backend automatically calculates the precise driving distance from the Koforidua Technical University campus coordinates using the Google Maps Distance Matrix API. This ensures students get reliable, scam-free distance estimates."
  },
  {
    icon: <HelpCircle className="text-info" size={20} />,
    q: "What is the student vacancy alert preference?",
    a: "Students can configure saved search filters (e.g., maximum price, room type, or neighborhood). If a property matching those filters becomes available (either because a hold expired or a landlord toggled it as available), matching students receive real-time in-app notifications so they don't miss out."
  }
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <>
      <Navbar />
      <div className="container py-5" style={{ minHeight: 'calc(100vh - 280px)' }}>
        
        {/* Header */}
        <div className="text-center mb-5">
          <span style={{
            background: 'rgba(255,107,53,0.12)',
            color: 'var(--brand-orange)',
            borderRadius: '20px',
            padding: '4px 14px',
            fontSize: '0.8rem',
            fontWeight: 600,
            border: '1px solid rgba(255,107,53,0.2)'
          }}>
            💬 Help & Information
          </span>
          <h2 className="mt-3 section-title text-center">Frequently Asked Questions</h2>
          <div className="section-divider mx-auto"></div>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '550px' }}>
            Got questions about reservations, security, or payments? Find all answers about the KTU Hostel Portal here.
          </p>
        </div>

        {/* FAQs */}
        <div className="row justify-content-center">
          <div className="col-lg-8 d-flex flex-column gap-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="card border-custom rounded-custom transition"
                  style={{
                    background: isOpen ? 'var(--surface-2)' : 'var(--surface)',
                    borderColor: isOpen ? 'var(--brand-orange)' : 'var(--border)',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleFaq(idx)}
                >
                  {/* Question (Trigger) */}
                  <div className="p-4 d-flex align-items-center justify-content-between select-none">
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        style={{
                          width: '40px', height: '40px', borderRadius: '10px',
                          background: 'rgba(255,255,255,0.03)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {item.icon}
                      </div>
                      <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: '1.05rem' }}>
                        {item.q}
                      </span>
                    </div>
                    <div>
                      {isOpen ? <ChevronUp size={18} className="text-orange" /> : <ChevronDown size={18} className="text-muted-custom" />}
                    </div>
                  </div>

                  {/* Answer (Accordion Content) */}
                  {isOpen && (
                    <div className="px-4 pb-4 pt-0 text-muted-custom" style={{ paddingLeft: '64px', fontSize: '0.92rem', lineHeight: '1.6' }}>
                      <hr className="border-custom mt-0 mb-3" />
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5 p-4 rounded-custom bg-surface-2 border-custom mx-auto" style={{ maxWidth: '600px' }}>
          <h5 className="mb-2" style={{ fontFamily: 'Outfit,sans-serif' }}>Still have questions?</h5>
          <p className="text-muted-custom mb-3" style={{ fontSize: '0.85rem' }}>
            If you need further help or want to report fraud, get in touch with our student support team.
          </p>
          <a href="/contact" className="btn btn-primary btn-sm px-4">Contact Support</a>
        </div>

      </div>
      <Footer />
    </>
  );
}
