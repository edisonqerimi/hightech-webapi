

const bindProducts = (products, element) => {
    if (products.length > 0) {
        const addedCarts = document.createElement('div');
        addedCarts.classList.add('added-carts');
        element.appendChild(addedCarts);
        products.map(p => {
            const product = document.createElement('div');
            product.classList.add('product')
            product.innerHTML = `
            <div class="product-image">
            <img src='${p.pictureUrl}' />
            </div>
            <div class="product-body">
                <div class="product-title">${p.name}</div>
                <div class="product-price">
                ${p.isDiscount ?
                    `<div class="discount-price">${p.discountPrice.toFixed(2)}&euro;</div>` : ''
                }   
                <div class='${p.isDiscount ? "discount" : ''}'>${p.price.toFixed(2)}&euro;</div>
                </div>
                <div class="product-buttons">
                    <a href='./details.html?product-id=${p.id}' class="btn product-btn">More info</a>
                    <div onclick='addToCart(${p.id})' class="btn btn-info product-btn">Add to cart</div>
                </div>
                `;
            element.appendChild(product);
        })
    }
    else {
        element.innerHTML = '<div>No products found</div>';
    }
}


export { bindProducts }

