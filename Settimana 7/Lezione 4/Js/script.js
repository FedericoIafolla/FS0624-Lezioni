const API_KEY = 'yqF8DdRoz07feYz1EndoRPkdpnGcqMoeDP03VjbKcwUkoz9ehMkKMwNL';

document.getElementById('loadImages').addEventListener('click', () => loadImages('nature'));
document.getElementById('loadSecondaryImages').addEventListener('click', () => loadImages('technology'));
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    loadImages(query);
});

function loadImages(query) {
    fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
            Authorization: API_KEY
        }
    })
    .then(response => response.json())
    .then(data => displayImages(data.photos))
    .catch(error => console.error('Error fetching images:', error));
}

function displayImages(photos) {
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';
    photos.forEach(photo => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${photo.src.medium}" alt="${photo.photographer}" class="image">
            <p>${photo.photographer}</p>
            <p>${photo.id}</p>
            <div class="button-container">
                <button class="hideButton">Hide</button>
                <button class="viewButton">VIEW</button>
            </div>
        `;
        card.querySelector('.hideButton').addEventListener('click', () => card.classList.add('hide'));
        card.querySelector('.viewButton').addEventListener('click', () => openModal(photo.src.original));
        // Rimosso l'event listener per l'immagine
        imagesContainer.appendChild(card);
    });
}

function openModal(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});
