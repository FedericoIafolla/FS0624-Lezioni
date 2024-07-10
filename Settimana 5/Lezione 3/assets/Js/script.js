document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');
    const button = document.querySelector('.card-button');

    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});
