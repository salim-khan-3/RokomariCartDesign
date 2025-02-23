/*select add to cart button*/
const addToCart = document.querySelectorAll(`.Add_cart`);
console.log(addToCart);
const cartNumberIncrement = document.getElementById(`Increment_Number`);

let count = 0;

for(let i=0; i<addToCart.length; i++){
    addToCart[i].addEventListener(`click`,function(){
        // number update hobe 
        count++;

        addToCart[i].innerText = `Added to Click`;

        cartNumberIncrement.innerText = count;

        addToCart[i].setAttribute(`disabled`,true);

        setTimeout(() => {
            addToCart[i].innerText = `Click to Add`;
            addToCart[i].removeAttribute(`disabled`);
        }, 5000);
    });
}

