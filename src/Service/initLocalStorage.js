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
      { id: 1, numero: "A-01", status: 'libre', type: "Standard", capacite: 10  ,AffectationPatient: 0},
      { id: 2, numero: "A-02", status: 'libre', type: "Standard", capacite: 15 ,AffectationPatient: 0},
      { id: 3, numero: "A-03", status: 'occupée', type: "VIP", capacite: 5 ,AffectationPatient: 0},
      { id: 4, numero: "A-04", status: 'libre', type: "Soins Intensifs", capacite: 10 ,AffectationPatient: 0},
      { id: 5, numero: "A-05", status: 'occupée', type: "Pédiatrie", capacite: 5 ,AffectationPatient: 0},
      { id: 6, numero: "A-06", status: 'libre', type: "Standard", capacite: 12 ,AffectationPatient: 0},
      { id: 7, numero: "A-07", status: 'libre', type: "Standard", capacite: 10 ,AffectationPatient: 0},
      { id: 8, numero: "A-08", status: 'libre', type: "Standard", capacite: 15 ,AffectationPatient: 0},
      { id: 9, numero: "A-09", status: 'occupée', type: "VIP", capacite: 5 ,AffectationPatient: 0},
      { id: 10, numero: "A-10", status: 'libre', type: "Soins Intensifs", capacite: 10 ,AffectationPatient: 0},
      { id: 11, numero: "A-11", status: 'occupée', type: "Pédiatrie", capacite: 5 ,AffectationPatient: 0},
      { id: 12, numero: "A-12", status: 'libre', type: "Standard", capacite: 12 ,AffectationPatient: 0}
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
