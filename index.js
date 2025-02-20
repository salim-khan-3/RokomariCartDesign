
/*listener with square start*/
var containerBgChange = document.getElementById(`container_wrapper`);
var squareContainer = document.getElementById(`square_container`);

/*add or remove container styl*/
squareContainer.addEventListener(`click`,function(){
    containerBgChange.classList.toggle(`changeBackground`)
});


/*listener with square end*/


var cartItem = document.getElementById(`btn2_number`);
var incDecContainer = document.getElementById(`wrappper_container`)
var createNewElement = document.createElement(`p`);
incDecContainer.appendChild(createNewElement);

var count =Number(cartItem.innerText);
var discountPrice = 245;
var mainPrice = 350;
var finalPriceWithDiscount = document.getElementById(`discount_price`);
var priceWithOutDis = document.getElementById(`without_discount`);

function increaseCount(){
    if(count ===5 ){
        createNewElement.innerText = `you can purchase only five product!!!!`;  
        setTimeout(removeNoticeMessage,1000);
        return;   
    }
    count++;
    finalPriceWithDiscount.innerText = `${count*discountPrice} TK.`
    priceWithOutDis.innerText = `${count*mainPrice} TK.`
    cartItem.innerText = count;
    removeNoticeMessage()
}

function decreaseCount(){
    if(count === 1 ){
        createNewElement.innerText = `Product can't be less than one!!!!`; 
        setTimeout(removeNoticeMessage,1000);
        return;    
    }
    count--;
    finalPriceWithDiscount.innerText = `${count*discountPrice} TK.`
    priceWithOutDis.innerText = `${count*mainPrice} TK.`
    cartItem.innerText = count;
    removeNoticeMessage()
}

function removeNoticeMessage(){
    createNewElement.innerText = "";
}




// const incDecWrapper = document.getElementsByClassName(`increase_decrease`)[0];

// const btn1Minus = document.getElementsByClassName(`btn1_minus`);

// const btn2Number = document.getElementsByClassName(`btn2_number`)[0];

// const btn1Plus = document.getElementsByClassName(`btn1_plus`);

// const finalProductPrice = document.getElementById(`discount_price`);

// const noDiscountPrice = document.getElementById(`without_discount`);

// const createNewElement = document.createElement(`p`);
// incDecWrapper.appendChild(createNewElement);

// let count = 1;

// let discountPrice = 245; /*with discount*/
// let mainPrice = 350;/*without discount*/

// function updateNumber(){
//     btn2Number.innerText = count;
    
//     /*price update part*/
//     finalProductPrice.innerText = `${discountPrice*count} TK.`;
//     noDiscountPrice.innerText = `${mainPrice*count} TK.`;

//     if(count === 5){
//         createNewElement.innerText = `Two Product available for purched`;
//         removeMessage();
//     }else if(count === 1){
//         createNewElement.innerText = `product cannot be less than one`;
//         removeMessage();
//     }else{
//         // message reset 
//         createNewElement.innerText = "";
//     }
// }

// function removeMessage(){
//        setTimeout(()=>{
//         createNewElement.innerText = ``;
//        },2000);
// }
// for(let i = 0; i<btn1Plus.length;i++){
//     btn1Plus[i].addEventListener(`click`,function(){
//         if(count < 5){
//             count++;
//             updateNumber();
//         }

//     });

// }

// for(let i = 0; i<btn1Minus.length;i++){
//     btn1Minus[i].addEventListener(`click`,function(){
//         if(count > 1){
//             count--;
//             updateNumber();
//         }
//     });
// }
