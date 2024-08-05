fetch("../data/offer.json")
    .then(response => response.json())
    .then(offerProducts => {
        newOfferProducts(offerProducts);
    });

const offerProducts = document.getElementById("offerProducts");

const newOfferProducts = (comerce) => {


    comerce.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("divCards")


        let quantity = 1;

        productCard.innerHTML = `
            <article class="miniCard">
                <h2 class="titleProductOffer">${product.name}</h2>
                <img class="imgProduct" src="${product.image}" alt="">
                <div class="newOffer">
                <p class="priceOffer"> USD $${product.price} </p>
                <p class="oldPrice"> USD $${product.oldPrice}</p>
                <p class="discount"> ${product.offer}</p>
                </div>
                <div class="quantity-controls">
                        <button class="decrease">-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="increase">+</button>
                </div>
                <button class="buy-button">Add to Cart</button>
            </article>
        `

        offerProducts.append(productCard)


        const quantityDisplay = productCard.querySelector('.quantity');
        const decreaseButton = productCard.querySelector('.decrease');
        const increaseButton = productCard.querySelector('.increase');
        const buyButton = productCard.querySelector('.buy-button');

        decreaseButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });

        increaseButton.addEventListener('click', () => {
            if (quantity = quantity) {
                quantity++;
                quantityDisplay.textContent = quantity;
            }
        });

        buyButton.addEventListener('click', () => {
            if (quantity > product.stock) {
                // alert(`Not enough stock for ${product.name}`);

                // Swal.fire({
                //     title: `Not enough stock for:

                //         ${product.name}`,
                //     color: "#ffffff",
                //     padding: "15px",
                //     position: "center",
                //     background: "#7f72b3",
                // })


                Swal.fire({
                    icon: "error",
                    title: `Not enough stock for:

                        ${product.name}`,
                    width: 600,
                    padding: "3em",
                    color: "#7f72b3",
                    background: "#ffffff",
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("/img/LOGO 2.PNG")
                        left top
                        repeat
                                    `
                });
            } else {
                // alert(`${quantity} ${product.name} added to cart`);

                const Toast = Swal.mixin({
                    toast: false,
                    position: "center",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    className: "tosty",
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({

                    icon: "success",
                    title: "Added to cart",
                    background: "#7f72b3",
                    color: "white",

                });

                product.stock -= quantity;
            }
        });
    });


};

