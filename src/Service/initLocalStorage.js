export function initLocalStorage() {

  // ================= USERS =================
  if (!localStorage.getItem('users')) {
    const users = [
      {
        id: 1,
        name: 'Admin Principal',
        email: 'admin@hopital.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        id: 2,
        name: 'Dr. Manoel',
        email: 'doctor@hopital.com',
        password: 'doctor123',
        role: 'doctor'
      },
      {
        id: 3,
        name: 'Accueil',
        email: 'reception@hopital.com',
        password: 'reception123',
        role: 'receptionist'
      }
    ]
    localStorage.setItem('users', JSON.stringify(users))
  }

  

  // ================= ROOMS =================
  if (!localStorage.getItem('rooms')) {
    const rooms = [
      {
        id: 1,
        number: 'A101',
        capacity: 2,
        status: 'libre'
      },
      {
        id: 2,
        number: 'B202',
        capacity: 1,
        status: 'occupée'
      }
    ]
    localStorage.setItem('rooms', JSON.stringify(rooms))
  }

  // ================= PATIENTS =================
  if (!localStorage.getItem('patients')) {
    const patients = [
      {
        id: 1,
        firstName: 'Jean',
        lastName: 'Dupont',
        gender: 'Homme',
        phone: '97000001',
        bloodGroup: 'O+',
        status: 'hospitalisé',
        doctorId: 1,
        roomId: 2,
        createdAt: '2026-02-10'
      },
      {
        id: 2,
        firstName: 'Marie',
        lastName: 'Kouassi',
        gender: 'Femme',
        phone: '97000002',
        bloodGroup: 'A+',
        status: 'consultation',
        doctorId: 2,
        roomId: null,
        createdAt: '2026-02-15'
      }
    ]
    localStorage.setItem('patients', JSON.stringify(patients))
  }

  // ================= APPOINTMENTS =================
  if (!localStorage.getItem('appointments')) {
    const appointments = [
      {
        id: 1,
        patientId: 1,
        doctorId: 1,
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        status: 'confirmé'
      }
    ]
    localStorage.setItem('appointments', JSON.stringify(appointments))
  }

}
