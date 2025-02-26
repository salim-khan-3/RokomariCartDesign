// const shoppingCart = document.getElementById(`content_container`);
const shoppingCart = document.getElementById(`cart_container`);

// console.log(shoppingCart);

let shopItemsData = [
    {
    id:"first_items",
    name:"Md. salim islam",
    price:"22",
    discount:"29",
    desc:"Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img:"./Assets/img_one.webp",
    stock:"25 in stock",
},
{
    id:"kamrul",
    name:"Md, kamrul hasan",
    price:"23",
    discount:"30",
    desc:"Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img:"./Assets/img_two.avif",
    stock:"10 in stock",
},
{
    id:"khadiza456321",
    name:"khadiza",
    price:"24",
    discount:"33",
    desc:"Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img:"./Assets/img_3.avif",
    stock:"5 in stock",
},
{
    id:"sonia65652",
    name:"sonia",
    price:"25",
    discount:"28",
    desc:"Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img:"./Assets/img_four.avif",
    stock:"2 in stock",
},
{
    id:"sonia7542132",
    name:"Rabeya",
    price:"25",
    discount:"28",
    desc:"Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img:"./Assets/img_five.avif",
    stock:"2 in stock",
},
{
    id:"sonia545454",
    name:"sathi",
    price:"25",
    discount:"28",
    desc:"Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img:"./Assets/seven.avif",
    stock:"2 in stock",
},
]

let basket =JSON.parse(localStorage.getItem("data")) || [];
// es6 arrow function 
let randomGenerateCart = () =>{
    return (shoppingCart.innerHTML = shopItemsData.map((x)=>{
        let {id,name,price,discount,desc,img,stock} = x;
        let search = basket.find((x)=>x.id === id) || [];
        return `
    <div id="product_id_${id}" class="items" >
            <img width="235px" height="150px" src="${img}">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <input type="range">
                <h5>${stock}</h5>
                <div class="price">
                    <div class="price_discount">
                        <p>$ ${price}</p>
                        <del>$ ${discount}</del>
                    </div>
                    <div class="buttons">
                        <i onclick= "decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="inc_dec">
                        ${search.item === undefined? 0: search.item}
                        </div>
                        <i onclick= "increment(${id})" class="bi bi-plus-lg" ></i>
                    </div>
                </div>
            </div>
        </div>
    `
    }).join(""));
};
randomGenerateCart();

// increment start 
let increment= ((id)=>{
    let selectedItem = id;

    let search = basket.find((x)=>x.id === selectedItem.id)
    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item:1,
        });
    }else{
        search.item += 1;
    }
    
    // console.log(basket);
    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));
   
});

// decrement start 
let decrement= ((id)=>{
    let selectedItem = id;

    let search = basket.find((x)=>x.id === selectedItem.id);
    if(search ===undefined) {
        return
    }
    else if(search.item === 0){
        return;
    }else{
        search.item -= 1;
    }
    
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !==0)
    // console.log(basket);


    localStorage.setItem("data", JSON.stringify(basket));
});

// update here 
let update= ((id)=>{
    let search = basket.find((x)=>x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculator();
});

let calculator = () =>{
    let cartIcon = document.getElementById(`Increment_Number`);
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x + y , 0)
}

calculator();