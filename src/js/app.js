import Alpine from 'alpinejs'
window.Alpine = Alpine
 
Alpine.start()


const addToCartFormBtns = document.querySelectorAll('form[action="/cart/add"]');
addToCartFormBtns.forEach(cartFormBtns => {
    cartFormBtns.addEventListener('submit', async (e)=>{
        // This stops the add to cart button from redirecting to the cart page
        e.preventDefault()

        // Add to cart using ajax so it can be updated in the cart count automatically

        await fetch('/cart/add', {
            method: 'post',
            body: new FormData(cartFormBtns)
        })

        // Fetch the cart object 
        const response = await fetch('/cart.json')
        const data = await response.json()
        console.log('data: ',data)

        // Update cart count automatically
        const updateCartCount = document.querySelectorAll('.cart__count')
        updateCartCount.forEach(cartElement => {
            cartElement.textContent = data.item_count
        })
        
        // Show the "Added to Cart" popup
        document.getElementById('added-to-cart-popup').classList.remove('hidden');
        
        // Automatically close the popup after 2000 milliseconds (2 seconds)
        setTimeout(function() {
            closeAddedToCartPopup();
        }, 2000);
        
        
        function closeAddedToCartPopup() {
        // Close the "Added to Cart" popup
        document.getElementById('added-to-cart-popup').classList.add('hidden');
        }
    })
})



 