document.addEventListener('DOMContentLoaded', () => {
    const greet = document.getElementById('greeting');
    if (greet) {
        const h = new Date().getHours();
        greet.textContent =
            h < 12 ? 'Good morning!' :
                h < 18 ? 'Good afternoon!' :
                    'Good evening!';
    }
});