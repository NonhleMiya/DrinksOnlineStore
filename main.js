let carts = document.querySelectorAll('.add-cart');

let drinks= [{
    name: 'Pisco Sour',
    tag: 'piscosour',
    price: 150,
    inCart: 0
},
{
    name: 'Anejo Highball',
    tag: 'anejohighball',
    price: 130,
    inCart: 0,
},
{
    name: 'Absinthe',
    tag: 'absinthe',
    price: 170,
    inCart: 0
},
{
    name: 'Midori',
    tag: 'midori',
    price: 100,
    inCart: 0
},
{
    name: 'Camparii',
    tag: 'Camparii',
    price: 90,
    inCart: 0
},
{
    name: 'Wahhine',
    tag: 'wahhine',
    price: 110,
    inCart: 0
},
{
    name: 'Carpivodka',
    tag: 'carpivodka',
    price: 180,
    inCart: 0
},
];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(drinks[i]);
        totalCost(drinks[i])
    })
}

/**load cart number */
function onLoadCartNumber(){
    let itemNumbers = localStorage.getItem('cartNumbers');

    if(itemNumbers){
        document.querySelector('.cart span').textContent = itemNumbers;
    }
}


/**Cart number setting after adding items*/
function cartNumbers(drinks){
    let itemNumbers = localStorage.getItem('cartNumbers');
    
    itemNumbers= parseInt(itemNumbers);

    if (itemNumbers){
        localStorage.setItem('cartNumbers', itemNumbers + 1);
        document.querySelector('.cart span').textContent = itemNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(drinks);
}

function setItems(drinks){
    let cartItems = localStorage.getItem('drinksInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){

        if (cartItems[drinks.tag] == undefined){
            cartItems ={
                ...cartItems,
                [drinks.tag]: drinks
            }
        }

        cartItems[drinks.tag].inCart += 1;
    }
    else{
        drinks.inCart = 1;
        cartItems = {
            [drinks.tag]: drinks
        }
    }

    localStorage.setItem("drinksInCart", JSON.stringify
    (cartItems));
}

function totalCost(drinks){
    let cartCost = localStorage.getItem('totalCost')
 

    if (cartCost != null){
        cartCost= parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + drinks.price);
    }
    else{
        localStorage.setItem("totalCost",drinks.price);
    } 
}


function displayCart(){
    let cartItems = localStorage.getItem("drinksInCart");
    cartItems = JSON.parse(cartItems);
    let drinksContainer = document.querySelector(".drinks");
    let cartCost = localStorage.getItem('totalCost')

    if ( cartItems && drinksContainer ){
        drinksContainer.innerHTML= '';
        Object.values(cartItems).map(item =>{
            drinksContainer.innerHTML += `
            <div class="drinks">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            
            <div class="price">R${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" 
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                R${item.inCart * item.price},00
            </div></div>
            `;
        });

        drinksContainer.innerHTML +=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total </h4>
                <h4 class="basketTotal"> 
                    R${cartCost},00
                </h4>
        `;
    }
}

onLoadCartNumber();
displayCart();

