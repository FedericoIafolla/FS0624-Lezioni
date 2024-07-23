
document.addEventListener('DOMContentLoaded', (event) => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
        document.getElementById('saved-name').textContent = `Nome salvato: ${savedName}`;
    } else {
        document.getElementById('saved-name').textContent = 'Nessun nome salvato';
    }
});

function saveName() {
    const name = document.getElementById('name').value;
    if (name) {
        localStorage.setItem('name', name);
        document.getElementById('saved-name').textContent = `Nome salvato: ${name}`;
        document.getElementById('name').value = ''; 
    }
}

function removeName() {
    localStorage.removeItem('name');
    document.getElementById('saved-name').textContent = 'Nessun nome salvato';
}
