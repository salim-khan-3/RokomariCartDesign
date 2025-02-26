let basket =JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket);

let calculator = () =>{
    let cartIcon = document.getElementById(`Increment_Number`);
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x + y , 0)
}

calculator();