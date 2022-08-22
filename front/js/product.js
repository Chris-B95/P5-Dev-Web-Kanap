const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");
console.log(productId);

async function getProduct() {

    try {
        let response = await fetch("http://localhost:3000/api/products/" + productId);
        let product = await response.json();
        return (product);
    } catch (err) {
        console.log(err);
    }
}

async function addToCart() {
    console.log("Dans la fonction addToCart");
    const productParams = await getProduct();
    const prodId = productParams._id;
    console.log(prodId);
    const colorSelection = document.getElementById("colors");
    const prodColor = colorSelection.options[colorSelection.selectedIndex].value;
    console.log(prodColor);
    const prodNumber = document.getElementById("quantity").value;
    console.log(prodNumber);
    nameOfKey = localStorage.getItem(prodId + ":" + prodColor);
    if (nameOfKey) {
        const actualValue = localStorage.getItem(prodId + ":" + prodColor) * 1;
        const newValue = actualValue + (prodNumber * 1);
        if ((newValue > 100) || (newValue < 1)) {
            console.log("mauvaise valeur");
            const warningExist = document.getElementById("warning-msg");
            if (!warningExist) {
                const warningTag = document.createElement("p");
                warningTag.setAttribute("id", "warning-msg");
                warningTag.textContent = "Attention le nombre d'articles commandés doit être compris entre 1 et 100";
                const warningInput = document.querySelector(".item__content__settings__quantity");
                warningInput.appendChild(warningTag);
            }
        }
        else {
            const warningExist = document.getElementById("warning-msg");
            if (warningExist) {
                const pWarning = document.querySelector("#warning-msg")
                pWarning.remove();
            }
            localStorage.setItem(prodId + ":" + prodColor, newValue);
        }

    }
    else {
        if ((prodNumber > 100) || (prodNumber < 1)) {
            console.log("mauvaise valeur");
            const warningExist = document.getElementById("warning-msg");
            if (!warningExist) {
                const warningTag = document.createElement("p");
                warningTag.setAttribute("id", "warning-msg");
                warningTag.textContent = "Attention le nombre d'articles commandés doit être compris entre 1 et 100";
                const warningInput = document.querySelector(".item__content__settings__quantity");
                warningInput.appendChild(warningTag);
            }
        }
        else {
            const warningExist = document.getElementById("warning-msg");
            if (warningExist) {
                /*const pWarning = document.querySelector("#warning-msg")*/
                /*pWarning*/warningExist.remove();
            }
            localStorage.setItem(prodId + ":" + prodColor, prodNumber);
        }
    }
    console.log(localStorage);
}

async function main() {
    const productParams = await getProduct();
    const productDescription = document.getElementById("description");
    console.log(productParams);
    productDescription.textContent = (productParams.description);
    const productPrice = document.getElementById("price");
    productPrice.textContent = (productParams.price);
    const productName = document.getElementById("title");
    productName.textContent = (productParams.name);
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", productParams.imageUrl);
    imgTag.setAttribute("alt", productParams.altTxt);
    const imgDiv = document.querySelector(".item__img");
    imgDiv.appendChild(imgTag);
    const productColors = document.getElementById("colors");
    for (i = 0; i < productParams.colors.length; i++) {
        let optionTag = document.createElement("option");
        optionTag.setAttribute("value", productParams.colors[i]);
        optionTag.textContent = (productParams.colors[i]);
        productColors.appendChild(optionTag);
    }
    const boutonAjout = document.getElementById("addToCart");
    boutonAjout.addEventListener("click", addToCart);
}

main();
