const product = [
    {
        id: 0,
        image: '../PP1.jpg',
        title: 'BOWL',
        price: 120,
    },
    {
        id: 1,
        image: '../PP3.jpg',
        title: 'DESK CALENDER',
        price: 60,
    },
    {
        id: 2,
        image:  '../PP4.jpg',
        title: 'COASTERS',
        price: 70,
    },
    {
        id: 3,
        image: '../PP2.jpg',
        title: 'BEARD COMB',
        price: 100,
    },


    // {
    //     id: 4,
    //     image: 'image/clutch.png',
    //     title: 'CLUTCH',
    //     price: 100,
    // },

    // {
    //     id: 5,
    //     image: 'image/air_filter.png',
    //     title: 'AIR FILTER',
    //     price: 100,
    // }
   
];
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>Rs ${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(){
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "Rs "+0+".00";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "Rs "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>Rs ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"

            );
        }).join('');
    }
    
    
    
}


document.addEventListener('DOMContentLoaded', function () {
    // // Initialize the cart as an empty array
    // const cart = [];

    // // Function to add a product to the cart
    // function addToCart(product) {
    //     cart.push(product);
    //     // displayCart();
    // }

    // Function to remove a product from the cart
    // function removeFromCart(productID) {
    //     const index = cart.findIndex((product) => product.id === productID);
    //     if (index !== -1) {
    //         cart.splice(index, 1);
    //         // displayCart();
    //     }
    // }

    // Function to display the cart
    // function displayCart() {
    //     // ... (the rest of your displayCart function remains the same)
    // }

    // Add to Cart links click event delegation
    // document.addEventListener('click', function (event) {
    //     if (event.target.classList.contains('add-to-cart')) {
    //         const product = {
    //             id: event.target.dataset.id,
    //             image: event.target.dataset.image,
    //             title: event.target.dataset.title,
    //             price: parseFloat(event.target.dataset.price),
    //         };
    //         // addToCart(product);
    //     }
    // });

    // Remove from Cart links click event delegation
    // document.addEventListener('click', function (event) {
    //     if (event.target.classList.contains('remove-from-cart')) {
    //         const productID = event.target.dataset.id;
    //         removeFromCart(productID);
    //     }
    // });




    

    const popup = document.getElementById('popup');
    const message = document.getElementById('message');

    // Function to show the pop-up message
    function showMessage() {
        popup.style.display = 'block';
        setTimeout(hideMessage, 2000); // Hide the message after 2 seconds
    }

    // Function to hide the pop-up message
    function hideMessage() {
        popup.style.display = 'none';
    }

    // Add to Cart links click event delegation
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const product = {
                // ... (your product data here)
            };
            // addToCart(product);
            showMessage(); // Show the pop-up message
        }
    });
});

