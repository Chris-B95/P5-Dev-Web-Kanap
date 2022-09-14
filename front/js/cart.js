let filteredList = [];

// Purge le localStorage d'éventuels "intrus"
function filterLocalStorage() {
    let products = [];
    for (let i = 0; i < localStorage.length; i++) {
        const retrievedObject = localStorage.key(i);
        const filter = /kanap/;
        if (retrievedObject.split(":")[0].match(filter)) {
            products.push(retrievedObject);
        }
    };
    products.sort();
    filteredList = products;
}

let allProducts = [];

// Récupération des infos produits dans l'API
async function getProductsList(filteredLocalStorageList) {
    try {
        let products = [];
        await Promise.all(filteredLocalStorageList.map(async (element) => {
            const retrieveId = element.split(":")[1];
            if (!products.find(element => element._id === retrieveId)) {
                let response = await fetch("http://localhost:3000/api/products/" + retrieveId);
                let product = await response.json();
                products.push(product);
            }
        }));
        allProducts = products;
    }
    catch (err) {
        console.log(err);
    }
};

// Affichage des produits du panier
function showCart() {
    filteredList.forEach(function (element) {
        const id = element.split(":")[1];
        const color = element.split(":")[2];
        const articleNumber = localStorage.getItem(element);
        const currentProduct = allProducts.find(obj => obj._id === id);
        const articleTag = document.createElement("article");
        articleTag.setAttribute("class", "cart__item");
        articleTag.setAttribute("data-id", id);
        articleTag.setAttribute("data-color", color);
        const divTag = document.createElement("div");
        divTag.setAttribute("class", "cart__item__img");
        const imgTag = document.createElement("img");
        imgTag.setAttribute("src", currentProduct.imageUrl);
        imgTag.setAttribute("alt", currentProduct.altTxt);
        divTag.appendChild(imgTag);
        articleTag.appendChild(divTag);
        const contentDivTag = document.createElement("div");
        contentDivTag.setAttribute("class", "cart__item__content");
        articleTag.appendChild(contentDivTag);
        const descriptionDivTag = document.createElement("div");
        descriptionDivTag.setAttribute("class", "cart__item__content__description");
        contentDivTag.appendChild(descriptionDivTag);
        const h2Tag = document.createElement("h2");
        h2Tag.textContent = (currentProduct.name);
        descriptionDivTag.appendChild(h2Tag);
        const pTag = document.createElement("p");
        pTag.textContent = (color);
        descriptionDivTag.appendChild(pTag);
        const p2Tag = document.createElement("p");
        p2Tag.textContent = (currentProduct.price + "€");
        descriptionDivTag.appendChild(p2Tag);
        const settingsDivTag = document.createElement("div");
        settingsDivTag.setAttribute("class", "cart__item__content__settings");
        contentDivTag.appendChild(settingsDivTag);
        const quantityDivTag = document.createElement("div");
        quantityDivTag.setAttribute("class", "cart__item__content__settings__quantity");
        settingsDivTag.appendChild(quantityDivTag);
        const p3Tag = document.createElement("p");
        p3Tag.textContent = ("Qté : ");
        quantityDivTag.appendChild(p3Tag);
        const inputTag = document.createElement("input");
        inputTag.setAttribute("type", "number");
        inputTag.setAttribute("class", "itemQuantity");
        inputTag.setAttribute("name", "itemQuantity");
        inputTag.setAttribute("min", "1");
        inputTag.setAttribute("max", "100");
        inputTag.setAttribute("value", articleNumber);
        quantityDivTag.appendChild(inputTag);
        const deleteDivTag = document.createElement("div");
        deleteDivTag.setAttribute("class", "cart__item__content__settings__delete");
        settingsDivTag.appendChild(deleteDivTag);
        const p4Tag = document.createElement("p");
        p4Tag.setAttribute("class", "deleteItem");
        p4Tag.textContent = "Supprimer";
        deleteDivTag.appendChild(p4Tag);
        const itemsList = document.getElementById("cart__items");
        itemsList.appendChild(articleTag);
    });
}

// Affichage du prix à chaque fois qu'il est modifié
function updatePrice() {
    let totalNumberOfArticles = 0;
    let totalPrice = 0;
    filteredList.forEach(function (element) {
        const id = element.split(":")[1];
        const articleNumber = localStorage.getItem(element);
        totalNumberOfArticles += articleNumber * 1;
        const currentProduct = allProducts.find(obj => obj._id === id);
        let currentPrice = currentProduct.price;
        currentPrice *= articleNumber;
        totalPrice += currentPrice;
    });
    const pArticleNumber = document.getElementById("totalQuantity");
    pArticleNumber.textContent = totalNumberOfArticles;
    const pTotalPrice = document.getElementById("totalPrice");
    pTotalPrice.textContent = totalPrice;
}

// Changement de la quantité
function setQuantity() {
    const inputModify = document.querySelectorAll(".itemQuantity");
    inputModify.forEach(element => element.addEventListener("change", function () {
        const currentArticle = this.closest("article");
        const currentId = currentArticle.dataset.id;
        const currentColor = currentArticle.dataset.color;
        const currentItem = currentId + currentColor;
        let articleNumber = localStorage.getItem("kanap:" + currentId + ":" + currentColor);
        articleNumber = this.value;
        if ((articleNumber > 100) || (articleNumber < 1)) {
            const warningExist = document.getElementById(currentItem + "warning-msg");
            if (!warningExist) {
                const warningTag = document.createElement("p");
                warningTag.style.color = "red";
                warningTag.style.backgroundColor = "white";
                warningTag.style.fontWeight = "bolder";
                warningTag.setAttribute("id", currentItem + "warning-msg");
                warningTag.textContent = "Attention le nombre d'articles commandés doit être compris entre 1 et 100";
                const warningInput = currentArticle.querySelector(".cart__item__content__settings__quantity");
                warningInput.appendChild(warningTag);
            }
        }
        else {
            const warningExist = document.getElementById(currentItem + "warning-msg");
            if (warningExist) {
                warningExist.remove();
            }
            localStorage.setItem("kanap:" + currentId + ":" + currentColor, articleNumber);
            element.setAttribute("value", articleNumber);
        }
        updatePrice();
    }));
}

// Suppression d'un produit
function deleteItem() {
    const deleteItem = document.querySelectorAll(".deleteItem");
    deleteItem.forEach(element => element.addEventListener("click", function () {
        const currentArticle = this.closest("article");
        const currentId = currentArticle.dataset.id;
        const currentColor = currentArticle.dataset.color;
        localStorage.removeItem("kanap:" + currentId + ":" + currentColor);
        currentArticle.remove();
        updatePrice();
    }));
}

// Récupération des données du formulaire saisies par l'utilisateur
function getInputValues() {
    const firstNameInput = document.getElementById("firstName").value;
    const lastNameInput = document.getElementById("lastName").value;
    const addressInput = document.getElementById("address").value;
    const cityInput = document.getElementById("city").value;
    const emailInput = document.getElementById("email").value;
    const contact = { firstName: firstNameInput, lastName: lastNameInput, address: addressInput, city: cityInput, email: emailInput };
    return contact;
}

// Vérification des données fournies par l'utilisateur
function areInputsValid() {
    let inputsValid = true;
    const firstNameInput = document.getElementById("firstName").value;
    const firstNameInputError = document.getElementById("firstNameErrorMsg");
    const firstNamefilter = /^[^0-9_!¡?÷?¿/\\+=@#$%&*(){}|~<>;:[\]]{2,}$/g;
    if (!firstNameInput) {
        firstNameInputError.textContent = "Champ obligatoire!"
        inputsValid = false;
    } else {
        if (!firstNameInput.match(firstNamefilter)) {
            firstNameInputError.textContent = "Prénom invalide!"
            inputsValid = false;
        }
        else {
            firstNameInputError.textContent = ""
        }
    }
    const lastNameInput = document.getElementById("lastName").value;
    const lastNameInputError = document.getElementById("lastNameErrorMsg");
    const lastNamefilter = /^[^0-9_!¡?÷?¿/\\+=@#$%&*(){}|~<>;:[\]]{2,}$/g;
    if (!lastNameInput) {
        lastNameInputError.textContent = "Champ obligatoire!"
        inputsValid = false;
    } else {
        if (!lastNameInput.match(lastNamefilter)) {
            lastNameInputError.textContent = "Nom invalide!"
            inputsValid = false;
        }
        else {
            lastNameInputError.textContent = ""
        }
    }
    const addressInput = document.getElementById("address").value;
    const addressInputError = document.getElementById("addressErrorMsg");
    const addressfilter = /^[^_!¡?÷?¿/\\+=@#$%&*(){}|~<>;:[\]]{3,}$/g;
    if (!addressInput) {
        addressInputError.textContent = "Champ obligatoire!"
        inputsValid = false;
    } else {
        if (!addressInput.match(addressfilter)) {
            addressInputError.textContent = "Adresse invalide!"
            inputsValid = false;
        }
        else {
            addressInputError.textContent = ""
        }
    }
    const cityInput = document.getElementById("city").value;
    const cityInputError = document.getElementById("cityErrorMsg");
    const cityfilter = /^[^0-9_!¡?÷?¿/\\+=@#$%&*(){}|~<>;:[\]]{2,}$/g;
    if (!cityInput) {
        cityInputError.textContent = "Champ obligatoire!"
        inputsValid = false;
    } else {
        if (!cityInput.match(cityfilter)) {
            cityInputError.textContent = "Ville invalide!"
            inputsValid = false;
        }
        else {
            cityInputError.textContent = ""
        }
    }
    const emailInput = document.getElementById("email").value;
    const emailInputError = document.getElementById("emailErrorMsg");
    const emailfilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    if (!emailInput) {
        emailInputError.textContent = "Champ obligatoire!"
        inputsValid = false;
    } else {
        if (!emailInput.match(emailfilter)) {
            emailInputError.textContent = "E-mail invalide!"
            inputsValid = false;
        }
        else {
            emailInputError.textContent = ""
        }
    }
    return inputsValid;
}

// Ajout d'un event listener sur le bouton de commande
function orderButton() {
    const boutonCommander = document.getElementById("order");
    boutonCommander.addEventListener("click", validateOrder);
}

// Envoi de la commande
async function validateOrder() {
    if (areInputsValid()) {
        const contact = getInputValues();
        let products = [];
        filteredList.forEach(function (element) {
            const id = element.split(":")[1];
            products.push(id);
        });

        let response = await fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ contact, products })
        });

        let result = await response.json();
        window.location.replace("./confirmation.html?orderId=" + result.orderId);
    }
}

// Fonction principale et son appel
async function main() {
    filterLocalStorage();
    await getProductsList(filteredList);
    showCart();
    updatePrice();
    setQuantity();
    deleteItem();
    orderButton();
}

main();