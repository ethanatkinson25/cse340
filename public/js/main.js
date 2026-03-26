document.addEventListener('DOMContentLoaded', () => {
    const greet = document.getElementById('greeting');
    if (greet) {
        const h = new Date().getHours();
        greet.textContent =
            h < 12 ? 'Good morning!' :
                h < 18 ? 'Good afternoon!' :
                    'Good evening!';
    }

    // Client-side validation for category forms
    const categoryForm = document.getElementById('categoryForm');
    if (categoryForm) {
        categoryForm.addEventListener('submit', (event) => {
            const nameInput = document.getElementById('name');
            const name = nameInput.value.trim();

            // Check if name is present
            if (!name) {
                alert('Category name is required.');
                event.preventDefault();
                return;
            }

            // Check max length
            if (name.length > 100) {
                alert('Category name cannot exceed 100 characters.');
                event.preventDefault();
                return;
            }
        });
    }
});