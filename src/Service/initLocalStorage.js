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
