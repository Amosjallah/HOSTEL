// backend/src/config/mockDbData.js
// Seed data for the local mock database fallback

export const INITIAL_DB_STATE = {
  users: [
    {
      user_id: 1,
      full_name: "System Administrator",
      email: "admin@hostelportal.edu.gh",
      phone: "+233241000000",
      password_hash: "$2a$12$ZWRFO0Sm4Tu22P27ZjKhfumg0ny970SH9ywyaJjus0bTZ8huyoto2", // Admin@1234
      role: "Admin",
      verification_status: "Approved",
      id_document_path: null,
      is_active: true,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: 2,
      full_name: "Kwame Asante Boateng",
      email: "kwame.asante@gmail.com",
      phone: "+233244123456",
      password_hash: "$2a$12$Dwt6ACQDQj3uaHjUa97cD.IeB9YiQI1YXA/yFZYaJ5n3IYAAa5J1y", // Landlord@1
      role: "Landlord",
      verification_status: "Approved",
      id_document_path: "https://placeholder-url.supabase.co/storage/v1/object/public/ids/kwame.jpg",
      is_active: true,
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: 3,
      full_name: "Abena Mensah Osei",
      email: "abena.mensah@gmail.com",
      phone: "+233205678901",
      password_hash: "$2a$12$Dwt6ACQDQj3uaHjUa97cD.IeB9YiQI1YXA/yFZYaJ5n3IYAAa5J1y", // Landlord@1
      role: "Landlord",
      verification_status: "Approved",
      id_document_path: "https://placeholder-url.supabase.co/storage/v1/object/public/ids/abena.jpg",
      is_active: true,
      created_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: 4,
      full_name: "Kofi Darko Amponsah",
      email: "kofi.darko@gmail.com",
      phone: "+233209876543",
      password_hash: "$2a$12$Dwt6ACQDQj3uaHjUa97cD.IeB9YiQI1YXA/yFZYaJ5n3IYAAa5J1y", // Landlord@1
      role: "Landlord",
      verification_status: "Approved",
      id_document_path: "https://placeholder-url.supabase.co/storage/v1/object/public/ids/kofi.jpg",
      is_active: true,
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: 5,
      full_name: "Ama Serwaa Asante",
      email: "ama.serwaa@gmail.com",
      phone: "+233244567890",
      password_hash: "$2a$12$Dwt6ACQDQj3uaHjUa97cD.IeB9YiQI1YXA/yFZYaJ5n3IYAAa5J1y", // Landlord@1
      role: "Landlord",
      verification_status: "Approved",
      id_document_path: "https://placeholder-url.supabase.co/storage/v1/object/public/ids/ama.jpg",
      is_active: true,
      created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: 6,
      full_name: "Yaw Frimpong Boahen",
      email: "yaw.frimpong@gmail.com",
      phone: "+233200112233",
      password_hash: "$2a$12$Dwt6ACQDQj3uaHjUa97cD.IeB9YiQI1YXA/yFZYaJ5n3IYAAa5J1y", // Landlord@1
      role: "Landlord",
      verification_status: "Pending",
      id_document_path: "https://placeholder-url.supabase.co/storage/v1/object/public/ids/yaw.jpg",
      is_active: true,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: 7,
      full_name: "Esi Adjoa Quaye",
      email: "esi.quaye@ktu.edu.gh",
      phone: "+233554321098",
      password_hash: "$2a$12$6bRal0l/UfYDJnooLMRY4.0HAvqCymBdSx0yKrmomhmJ4Jsfj/v1S", // Student@1
      role: "Student",
      verification_status: "Approved",
      id_document_path: null,
      is_active: true,
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: 8,
      full_name: "Emmanuel Owusu Ansah",
      email: "emmanuel.owusu@ktu.edu.gh",
      phone: "+233503456789",
      password_hash: "$2a$12$6bRal0l/UfYDJnooLMRY4.0HAvqCymBdSx0yKrmomhmJ4Jsfj/v1S", // Student@1
      role: "Student",
      verification_status: "Approved",
      id_document_path: null,
      is_active: true,
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: 9,
      full_name: "Akosua Agyemang",
      email: "akosua.agyemang@ktu.edu.gh",
      phone: "+233244987654",
      password_hash: "$2a$12$6bRal0l/UfYDJnooLMRY4.0HAvqCymBdSx0yKrmomhmJ4Jsfj/v1S", // Student@1
      role: "Student",
      verification_status: "Approved",
      id_document_path: null,
      is_active: true,
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  properties: [
    {
      property_id: 1,
      landlord_id: 2,
      title: "Asante Villa — Single Room",
      address: "15 Adweso High St",
      latitude: 6.0950,
      longitude: -0.2550,
      description: "Cozy single room close to main campus. Excellent light flow and quiet environment.",
      price_per_semester: 1200,
      room_type: "Single",
      max_occupancy: 1,
      amenities: '["Water Flow", "Electricity (Prepaid)"]',
      neighborhood: "Adweso",
      distance_from_campus_km: 0.8,
      availability_status: "Available",
      verification_status: "Approved",
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      property_id: 2,
      landlord_id: 3,
      title: "Mensah Hall — Shared Room",
      address: "22 Nsukwao Rd",
      latitude: 6.0880,
      longitude: -0.2600,
      description: "Comfortable shared rooms with WiFi. Near transport links.",
      price_per_semester: 800,
      room_type: "Shared",
      max_occupancy: 2,
      amenities: '["Water Flow", "WiFi Internet"]',
      neighborhood: "Nsukwao",
      distance_from_campus_km: 1.2,
      availability_status: "Available",
      verification_status: "Approved",
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      property_id: 3,
      landlord_id: 4,
      title: "Darko Apartments",
      address: "7 Effiduase Link",
      latitude: 6.1020,
      longitude: -0.2480,
      description: "Modern self-contained rooms, security fenced and airconditioned.",
      price_per_semester: 2200,
      room_type: "Self-contained",
      max_occupancy: 2,
      amenities: '["Water Flow", "WiFi Internet", "Air Conditioner"]',
      neighborhood: "Effiduase",
      distance_from_campus_km: 1.9,
      availability_status: "Available",
      verification_status: "Approved",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      property_id: 4,
      landlord_id: 2,
      title: "Asante Luxury Suite",
      address: "4 Akwadum Rd",
      latitude: 6.0790,
      longitude: -0.2650,
      description: "Premium apartment style housing, with high occupancy potential.",
      price_per_semester: 3500,
      room_type: "Apartment",
      max_occupancy: 3,
      amenities: '["Water Flow", "WiFi Internet", "Generator Backup"]',
      neighborhood: "Akwadum",
      distance_from_campus_km: 2.5,
      availability_status: "Available",
      verification_status: "Approved",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  property_images: [
    {
      image_id: 1,
      property_id: 1,
      image_path: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600",
      display_order: 0
    },
    {
      image_id: 2,
      property_id: 2,
      image_path: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600",
      display_order: 0
    },
    {
      image_id: 3,
      property_id: 3,
      image_path: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600",
      display_order: 0
    },
    {
      image_id: 4,
      property_id: 4,
      image_path: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600",
      display_order: 0
    }
  ],
  bookings: [],
  reviews: [],
  notifications: [],
  vacancy_alerts: []
};
