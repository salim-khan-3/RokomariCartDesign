const incDecWrapper = document.getElementsByClassName(`increase_decrease`)[0];

const btn1Minus = document.getElementsByClassName(`btn1_minus`);

const btn2Number = document.getElementsByClassName(`btn2_number`)[0];

const btn1Plus = document.getElementsByClassName(`btn1_plus`);

const finalProductPrice = document.getElementById(`discount_price`);

const noDiscountPrice = document.getElementById(`without_discount`);

const createNewElement = document.createElement(`p`);
incDecWrapper.appendChild(createNewElement);

let count = 1;

let discountPrice = 245; /*with discount*/
let mainPrice = 350;/*without discount*/

function updateNumber(){
    btn2Number.innerText = count;
    
    /*price update part*/
    finalProductPrice.innerText = `${discountPrice*count} TK.`;
    noDiscountPrice.innerText = `${mainPrice*count} TK.`;

    if(count === 5){
        createNewElement.innerText = `Two Product available for purched`;
        removeMessage();
    }else if(count === 1){
        createNewElement.innerText = `product cannot be less than one`;
        removeMessage();
    }else{
        // message reset 
        createNewElement.innerText = "";
    }
}

function removeMessage(){
       setTimeout(()=>{
        createNewElement.innerText = ``;
       },2000);
}
for(let i = 0; i<btn1Plus.length;i++){
    btn1Plus[i].addEventListener(`click`,function(){
        if(count < 5){
            count++;
            updateNumber();
        }

    });

}

for(let i = 0; i<btn1Minus.length;i++){
    btn1Minus[i].addEventListener(`click`,function(){
        if(count > 1){
            count--;
            updateNumber();
        }
    });
}
