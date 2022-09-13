// Récupération de l'ID dans les paramètres de l'URL
function getProductId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("id");
    return productId;
}

// Récupération des infos du produit dans l'API
async function getProduct() {

    try {
        let response = await fetch("http://localhost:3000/api/products/" + getProductId());
        let product = await response.json();
        return (product);
    } catch (err) {
        console.log(err);
    }
}

// Check pour voir si une couleur est séléctionnée
function isColorSelected() {
    const colorSelection = document.getElementById("colors");
    const prodColor = colorSelection.options[colorSelection.selectedIndex].value;
    if (prodColor) {
        return true;
    }
    else {
        return false;
    }
}

//Ajout du produit au panier
async function addToCart() {
    const productParams = await getProduct();
    const prodId = productParams._id;
    const colorSelection = document.getElementById("colors");
    const prodColor = colorSelection.options[colorSelection.selectedIndex].value;
    const prodNumber = document.getElementById("quantity").value;
    nameOfKey = localStorage.getItem("kanap:" + prodId + ":" + prodColor);
    if (isColorSelected()) {
        const warningColorExist = document.getElementById("color-warning-msg");
        if (warningColorExist) {
            warningColorExist.remove();
        }
        if (nameOfKey) {
            const actualValue = localStorage.getItem("kanap:" + prodId + ":" + prodColor) * 1;
            const newValue = actualValue + (prodNumber * 1);
            if ((newValue > 100) || (newValue < 1)) {
                const warningExist = document.getElementById("warning-msg");
                if (!warningExist) {
                    const warningTag = document.createElement("p");
                    warningTag.setAttribute("id", "warning-msg");
                    warningTag.style.color = "red";
                    warningTag.style.backgroundColor = "white";
                    warningTag.style.fontWeight = "bolder";
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
                localStorage.setItem("kanap:" + prodId + ":" + prodColor, newValue);
            }

        }
        else {
            if ((prodNumber > 100) || (prodNumber < 1)) {
                const warningExist = document.getElementById("warning-msg");
                if (!warningExist) {
                    const warningTag = document.createElement("p");
                    warningTag.style.color = "red";
                    warningTag.style.backgroundColor = "white";
                    warningTag.style.fontWeight = "bolder";
                    warningTag.setAttribute("id", "warning-msg");
                    warningTag.textContent = "Attention le nombre d'articles commandés doit être compris entre 1 et 100";
                    const warningInput = document.querySelector(".item__content__settings__quantity");
                    warningInput.appendChild(warningTag);
                }
            }
            else {
                const warningExist = document.getElementById("warning-msg");
                if (warningExist) {
                    warningExist.remove();
                }
                localStorage.setItem("kanap:" + prodId + ":" + prodColor, prodNumber);
            }
        }
    }
    else {
        const warningExist = document.getElementById("color-warning-msg");
        if (!warningExist) {
            const warningTag = document.createElement("p");
            warningTag.style.color = "red";
            warningTag.style.backgroundColor = "white";
            warningTag.style.fontWeight = "bolder";
            warningTag.setAttribute("id", "color-warning-msg");
            warningTag.textContent = "Attention veuillez sélectionner une couleur!";
            const warningInput = document.querySelector(".item__content__settings__color");
            warningInput.appendChild(warningTag);
        }
    }
}

// Création du produit sur la page
async function createProduct() {
    const productParams = await getProduct();
    const productDescription = document.getElementById("description");
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
}

// Fonction principale et son appel
function main() {
    createProduct();
    const boutonAjout = document.getElementById("addToCart");
    boutonAjout.addEventListener("click", addToCart);
}

main();
