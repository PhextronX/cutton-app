// Simple JavaScript for demonstration
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle would go here
    console.log('Cutton Fabric Marketplace loaded');

    // Add to cart animation
    const addToCartButtons = document.querySelectorAll('button:contains("Add to Cart")');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // In a real app, this would add to cart
            alert('Added to cart!');
        });
    });

    // Favorite button toggle
    const favoriteButtons = document.querySelectorAll('.fa-heart, .fa-heart-o');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (button.classList.contains('far')) {
                button.classList.remove('far');
                button.classList.add('fas', 'text-red-500');
            } else {
                button.classList.remove('fas', 'text-red-500');
                button.classList.add('far');
            }
        });
    });
});