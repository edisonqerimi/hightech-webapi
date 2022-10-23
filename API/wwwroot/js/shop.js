import { bindProducts } from "./products.js";
const params = new window.URLSearchParams(window.location.search);


const brandId = params.get('brandId');
const sort = params.get('sort')?params.get('sort'):'relevant';

const sortElement = document.querySelector('#sort');

if (sort != null) {
    sortElement.value = sort;
}




const productsElement = document.querySelector('#products');


const pathWithHtml = location.pathname.split('/').pop();

const path = pathWithHtml.split('.html')[0]

let categoryId="";
console.log(path)
switch (path) {
    case 'smartphone':
        categoryId = 1;
        break;
    case 'desktops':
        categoryId = 3;
        break;
    case 'laptop':
        categoryId = 2;
        break;
        // case 'accessories':
        //     products = products.filter(p => p.category === 'accessory');
        //     break;
        default:
            break;
        }

sortElement.onchange = (e)=>{
     window.location.replace(`${pathWithHtml}?categoryId=${categoryId??''}&sort=${e.target.value}&brandId=${brandId??''}`);
}


fetch(`/api/Products?categoryId=${categoryId}&sort=${sort??''}&brandId=${brandId??''}`).then(async (result)=>{
        const json = await result.json(); 
        const {data}=json;
        if(data){
            showProducts(data);
        }
    })

    fetch(`/api/Products?categoryId=${categoryId}`).then(async (result)=>{
        const json = await result.json(); 
        bindFiltering(json.data, ["productBrand"]);
        const filterHeader = document.querySelectorAll('.filter-header');
        const pluses = document.querySelectorAll('.plus');
        const minuses = document.querySelectorAll('.minus');
        const filterItems = document.querySelectorAll('.filter-items');
    
        filterHeader.forEach((filter, i) => {
            filter.onclick = () => {
                pluses[i].classList.toggle('hidden');
                minuses[i].classList.toggle('hidden');
                filterItems[i].classList.toggle('hidden');
            }
        })
    })




const showProducts =  (filteredProducts) => {


    bindProducts(filteredProducts, productsElement);

    const priceInput = document.querySelector('#price-Input')
    const outputPrice = document.querySelector('.output-price')
    const minOut = document.querySelector('.min-price')

    const prices = filteredProducts.map(p => p.isDiscount ? p.discountPrice : p.price);


    const maxPrice = Math.max.apply(Math, prices);
    const minPrice = Math.min.apply(Math, prices);

    const filterBody = document.querySelector('.filter-body');
    const filterIcon = document.querySelector('.filter-icon');
    window.onresize = () => {

        if (window.innerWidth > 800) {
            filterBody.classList.remove('hidden');
            filterIcon.classList.remove('rotate')
        }
        else {
            filterBody.classList.add('hidden');
        }
    }
    if (window.innerWidth < 800) {
        filterBody.classList.add('hidden');
    }

    document.querySelector('.filter-head').onclick = () => {
        if (window.innerWidth < 800) {
            filterBody.classList.toggle('hidden');
        }
        filterIcon.classList.toggle('rotate');
    }

        priceInput.min = minPrice;
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        minOut.innerHTML = `${minPrice} &euro;`;
        outputPrice.innerHTML = `${Math.round(priceInput.value)} &euro;`;
    

    priceInput.oninput = (e) => {
        const max = parseInt(e.target.value) + 2;
        outputPrice.innerHTML = `${Math.round(e.target.value)} &euro;`;
        const newProducts = filteredProducts.filter(p => p.isDiscount ? p.discountPrice <= max : p.price <= max);
        productsElement.innerHTML = '';
        bindProducts(newProducts, productsElement);
    }

}
const bindFiltering = (products, filterNames) => {
    filterNames.map(item => {
        var filterElement = document.createElement('div');
        filterElement.classList.add('filter')
        filterElement.innerHTML = `
        <div class="filter-header">
            <div class='filter-name'>${item}</div>
            <div>
                <svg class='plus' width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                        fill="currentColor" />
                </svg>
                <svg class='hidden minus' width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                        fill="currentColor" />
                </svg>
            </div>
        </div>
        <div class='filter-items'>
            <input value=${item} name='filter-by' type='hidden'/>
        </div>
    `;
        document.querySelector('.filter-body').appendChild(filterElement)
        const filterItems = filterElement.querySelector('.filter-items');
        products.filter((value, index, self) => {
            const name = value[item];
            if (self.findIndex(i=>i[item]===name) === index) {
                const filterItem = document.createElement('div');
                filterItem.classList.add('filter-item');
                filterItem.innerHTML = `
                    <label class='filter-item-name' for='check-${name}'>${name}</label>
                    <input type='checkbox' id='check-${name}' class='filter-check' value='${name}' name='filter-value' />
                `;
                filterItem.onclick=(e)=>{window.location.replace(`${pathWithHtml}?categoryId=${value.productCategoryId}&sort=${sort??''}&brandId=${value.productBrandId}`) }
                filterItems.appendChild(filterItem);
            }
        }
        )
    });
}

