class Pet {
    constructor(petName, ownerName, species, breed) {
        this.petName = petName;
        this.ownerName = ownerName;
        this.species = species;
        this.breed = breed;
    }

    hasSameOwner(otherPet) {
        return this.ownerName === otherPet.ownerName;
    }
}

const petForm = document.getElementById('petForm');
const petList = document.getElementById('petList');
const pets = [];

petForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const petName = document.getElementById('petName').value;
    const ownerName = document.getElementById('ownerName').value;
    const species = document.getElementById('species').value;
    const breed = document.getElementById('breed').value;

    const newPet = new Pet(petName, ownerName, species, breed);
    pets.push(newPet);
    displayPets();
    
    petForm.reset();
});

function displayPets() {
    petList.innerHTML = '';
    pets.forEach((pet, index) => {
        const petItem = document.createElement('li');
        petItem.textContent = `${pet.petName} (Species: ${pet.species}, Breed: ${pet.breed}) - Owner: ${pet.ownerName}`;
        petList.appendChild(petItem);
    });
}
