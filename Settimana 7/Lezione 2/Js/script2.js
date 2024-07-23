document.addEventListener('DOMContentLoaded', (event) => {
    let counter = sessionStorage.getItem('counter');
    if (counter === null) {
        counter = 0;
    } else {
        counter = parseInt(counter, 10);
    }

    document.getElementById('counter').textContent = counter;

    setInterval(() => {
        counter++;
        document.getElementById('counter').textContent = counter;
        sessionStorage.setItem('counter', counter);
    }, 1000);
});
