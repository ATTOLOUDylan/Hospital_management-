import bcrypt from "bcryptjs";

const defaultUsers = [
  {
    Name: "Administrateur",
    email: "admin@example.com",
    password: bcrypt.hashSync("Mm12!!", 10),
    role : "Admin"
  },
  {
    Name: "Manoël",
    email: "manoël@example.com",
    password: bcrypt.hashSync("Mr13!!", 10),
    role : "Receptionniste"
  },
  {
    Name: "Descart",
    email: "descart@example.com",
    password: bcrypt.hashSync("Mr14!!", 10),
    role : "Receptionniste"
  },
  {
    Name: "Steven",
    email: "steven@example.com",
    password: bcrypt.hashSync("Mr15!!", 10),
    role : "Receptionniste"
  },
];
export const authService = {
  getUsers() {
    const stored = localStorage.getItem("db_users");
    if (!stored) {
      // Si vide, on enregistre les utilisateurs par défaut
      localStorage.setItem("db_users", JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(stored);
  },
  login(usersInfos) {
    const users = this.getUsers();
    const found = users.find(
      (u) => u.Name === usersInfos.Name );
    if (found) {
      const isMatch =
        bcrypt.compareSync(usersInfos.password, found.password) ;
        
      if (isMatch) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        localStorage.setItem("isLoggedIn", "true");
        return true;
      }
    }
    return false;
  },
  logOut() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  },
  isAuthenticated() {
    return localStorage.getItem("isLoggedIn") === "true";
  },
};
