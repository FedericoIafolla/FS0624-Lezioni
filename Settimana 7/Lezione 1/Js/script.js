class User {
    constructor(firstName, lastName, age, location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.location = location;
    }

    compareAge(otherUser) {
        if (this.age > otherUser.age) {
            return `${this.firstName} è più vecchio di ${otherUser.firstName}`;
        } else if (this.age < otherUser.age) {
            return `${this.firstName} è più giovane di ${otherUser.firstName}`;
        } else {
            return `${this.firstName} e ${otherUser.firstName} hanno la stessa età`;
        }
    }
}

// Creazione di oggetti User
const user1 = new User('Mario', 'Rossi', 30, 'Milano');
const user2 = new User('Luigi', 'Bianchi', 25, 'Roma');
const user3 = new User('Anna', 'Verdi', 30, 'Napoli');

// Verifica della comparazione tra le età
console.log(user1.compareAge(user2)); // Output: "Mario è più vecchio di Luigi"
console.log(user2.compareAge(user1)); // Output: "Luigi è più giovane di Mario"
console.log(user1.compareAge(user3)); // Output: "Mario e Anna hanno la stessa età"
