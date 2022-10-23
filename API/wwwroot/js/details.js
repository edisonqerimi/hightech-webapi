
const params = new window.URLSearchParams(window.location.search);
const id = params.get('product-id')

const detail = (name, value) => {
    return `<div class='detail'>
            <div class='detail-name'>${name}</div>
            <div class='detail-value'>${value}</div>
            </div>`
}
fetch(`/api/Products/${id}`).then(async (result)=>{
    const json = await result.json(); 

    if(json){
        renderItem(json);
    }
})
renderItem = (product) => {
    document.getElementById('details').innerHTML = `
    <div class='added-cart hidden'></div>
    <div style="background-image:url('${product.pictureUrl}')" class="d-photo">
        
    </div>
    <div class="main-details">
        <div class="main-first">
            <div class="product-title">${product.name}</div>
            <div class="product-amount">Pieces available: ${product.amount}</div>
            <div class="product-price">
                ${product.isDiscount ?
                `<div class="discount-price">${product.discountPrice.toFixed(2)}&euro;</div>` : ''
            }   
                    <div class='${product.isDiscount ? "discount" : ''}'>${product.price.toFixed(2)}&euro;</div>  
            </div>
        </div>
        <div class='description'>
            ${product.description}
        </div>
        <div class="product-buttons">
            <a href='./shop.html' class="btn btn-red">Back to shop</a>
            <div onclick='addToCart(${product.id})' class="btn btn-info">Add to cart</div>
        </div>
        
    </div>
    <div class="more-details">
    <div class='more-title'>All details</div>
    <div class='more-body'>
    
    </div>
    </div>
    `;
    var moreBody = document.querySelector('.more-body');
    var details = product.productDetails;
    if (product.category == 'smartphone') {
        moreBody.innerHTML = `
        ${detail('System on Chip', details.soC)}
        ${detail('Operating System', details.os)}
        ${detail('RAM', details.ram + 'GB')}
        ${detail('Battery', details.battery)}
        ${detail('Screen size', details.screenSize)}
        ${detail('Display', details.display)}
        ${detail('Storage', details.storage)}
        ${detail('Main Camera', details.mainCamera)}
        ${detail('Selfie Camera', details.selfieCamera)}
        `
    }
    if (product.category == 'laptop') {
        moreBody.innerHTML = `
        ${detail('Processor', details.processor)}
        ${detail('Graphics', details.graphics)}
        ${detail('RAM', details.ram)}
        ${detail('Screen size', details.screenSize)}
        ${detail('Display', details.display)}
        ${detail('Storage', details.storage)}
        ${detail('OS', details.os)}
        `
    }
    if (product.category == 'accessory') {
        moreBody.innerHTML = `
        ${detail('Battery life', details.batteryLife)}
        ${detail('Bluetooth', details.bluetooth)}
        ${detail('Battery Charge Method', details.batteryCharge)}
        ${detail('Adaptive Sound Control', details.soundControl)}
        ${detail('Playback Controller', details.playbackController)}
        ${detail('Battery level indication (icon with %)', details.batteryIndication)}
        `
    }
    if (product.category == 'desktop') {
        moreBody.innerHTML = `
        ${detail('Processor', details.processor)}
        ${detail('Graphics', details.graphics)}
        ${detail('RAM', details.ram)}
        ${detail('Storage', details.storage)}
        ${detail('OS', details.os)}
        `
    }
}