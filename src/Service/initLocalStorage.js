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
