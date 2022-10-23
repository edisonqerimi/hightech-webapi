import { bindProducts } from "./products.js";
const params = new window.URLSearchParams(window.location.search);
const search = params.get('search')
const productsElement = document.querySelector('#products');
const searching = document.querySelector('#search-Param');
searching.innerHTML = search;
fetch(`/api/Products?search=${search}`).then(async (result)=>{
    const json = await result.json(); 
    const products = json.data;
    if(products){
    bindProducts(products, productsElement)
    }
})