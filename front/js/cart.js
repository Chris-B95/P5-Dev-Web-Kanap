let filteredList = [];

function filterLocalStorage() {
    let products = [];
    for (let i = 0; i < localStorage.length; i++) { 
    const retrievedObject = localStorage.key(i);
        const filter = /kanap/;
        console.log(retrievedObject);
        if (retrievedObject.split(":")[0].match(filter)) {
            products.push(retrievedObject);
        }
    };
    console.log(products);
    filteredList = products;
    // return products;
}

let allProducts = [];

async function getProductsList(filteredLocalStorageList) {
    try {
        let products = [];
        // for (let i = 0; i < filteredLocalStorageList.length; i++) {
            await Promise.all(filteredLocalStorageList.map(async (element) => {
                const retrieveId = element.split(":")[1];
                // const retrieveId = filteredLocalStorageList[i].split(":")[1];
                console.log(retrieveId);
                if (!products.find(element => element._id === retrieveId)) {
                let response = await fetch("http://localhost:3000/api/products/" + retrieveId);
                let product = await response.json();
                console.log(product);
                products.push(product);
              }}));
        //     filteredLocalStorageList.forEach(async (element) => {
        //     const retrieveId = element.split(":")[1];
        //     // const retrieveId = filteredLocalStorageList[i].split(":")[1];
        //     console.log(retrieveId);
        //     if (!products.find(element => element._id === retrieveId)) {
        //     let response = await fetch("http://localhost:3000/api/products/" + retrieveId);
        //     let product = await response.json();
        //     console.log(product);
        //     products.push(product);}
        // });
        console.log(products);
        allProducts = products;
        // return products;
    }
    catch (err) {
        console.log(err);
    }
};

// const filteredList = filterLocalStorage();
// const allProducts = await getProductsList();
// const allProducts = (async () => {return await getProductsList(filteredList);})();
// const allProducts = (async () => {
//     const data =  await getProductsList(filteredList);
//     return data;
// }
// )();

// async function getProductsList() {
//     try {
//         let products = [];
//         for (let i = 0; i < localStorage.length; i++) {
//             const retrieveObject = localStorage.key(i);
//             const filter = /kanap/;
//             console.log(retrieveObject.split(":")[0]);
//             console.log(retrieveObject.split(":")[1]);
//             console.log(retrieveObject.split(":")[2]);
//             if (retrieveObject.split(":")[0].match(filter)) {
//                 const retrieveId = retrieveObject.split(":")[1];
//                 console.log(retrieveId);
//                 let response = await fetch("http://localhost:3000/api/products/" + retrieveId);
//                 let product = await response.json();
//                 console.log(product);
//                 products.push(product)
//             }
//         }
//         console.log(products);
//         return products;
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

async function updatePrice() {
    // const filteredList = filterLocalStorage();
    // const allProducts = await getProductsList(filteredList);
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

function getInputValues() {
    const firstNameInput = document.getElementById("firstName").value;
    const lastNameInput = document.getElementById("lastName").value;
    const addressInput = document.getElementById("address").value;
    const cityInput = document.getElementById("city").value;
    const emailInput = document.getElementById("email").value;
    const contact = { firstName: firstNameInput, lastName: lastNameInput, address: addressInput, city: cityInput, email: emailInput };
    return contact;
}

async function getUserInfos() {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const userFirstName = urlParams.get("firstName");
    // if (!userFirstName.length) {
    //     console.log("champ vide");
    // }
    // const userLastName = urlParams.get("lastName");
    // const userAddress = urlParams.get("address");
    // const userCity = urlParams.get("city");
    // const userEmail = urlParams.get("email");
    // console.log(userFirstName);
    // console.log(userLastName);
    // console.log(userAddress);
    // console.log(userCity);
    // console.log(userEmail);
    // let masque1 = /[@]/g; // /\w+@{1}\w+/
    // if (userEmail.match(masque1)) {
    //     console.log("email valide");
    // }
    // else {
    //     console.log("email invalide");
    // }
    // const contact = { firstName: userFirstName, lastName: userLastName, address: userAddress, city: userCity, email: userEmail };
    // console.log(contact);
    const contact = getInputValues();
    const products = [];
    filteredList.forEach(function (element) {
        const id = element.split(":")[1];
        products.push(id);
    });

    let response = await fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({contact, products})
    });

    let result = await response.json();
    // alert(JSON.stringify({contact, products}));
    // alert(JSON.stringify(result.orderId));
    window.location.replace("./confirmation.html?orderId=" + result.orderId /*JSON.stringify(result.orderId)*/);
}

async function main() {
    // const filteredList = filterLocalStorage();
    // const allProducts = await getProductsList(filteredList);
    filterLocalStorage();
    await getProductsList(filteredList);
    console.log(filteredList);
    console.log(allProducts);
    console.log(allProducts.length);
    // let totalNumberOfArticles = 0;
    // let totalPrice = 0;
    filteredList.forEach(function (element) {
        const id = element.split(":")[1];
        const color = element.split(":")[2];
        const articleNumber = localStorage.getItem(element);
        // totalNumberOfArticles += articleNumber * 1;
        console.log(allProducts.length);
        const currentProduct = allProducts.find(obj => obj._id === id);
        console.log(currentProduct);
        // let currentPrice = currentProduct.price;
        // currentPrice *= articleNumber;
        // totalPrice += currentPrice;
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
    updatePrice();
    // const pArticleNumber = document.getElementById("totalQuantity");
    // pArticleNumber.textContent = totalNumberOfArticles;
    // const pTotalPrice = document.getElementById("totalPrice");
    // pTotalPrice.textContent = totalPrice;
    const inputModify = document.querySelectorAll(".itemQuantity");
    inputModify.forEach(element => element.addEventListener("change", function () {
        console.log("qty changed");
        const currentArticle = this.closest("article");
        const currentId = currentArticle.dataset.id;
        const currentColor = currentArticle.dataset.color;
        const currentItem = currentId + currentColor;
        let articleNumber = localStorage.getItem("kanap:" + currentId + ":" + currentColor);
        articleNumber = this.value;
        if ((articleNumber > 100) || (articleNumber < 1)) {
            console.log("mauvaise valeur");
            const warningExist = document.getElementById(currentItem + "warning-msg");
            if (!warningExist) {
                const warningTag = document.createElement("p");
                warningTag.setAttribute("id", currentItem + "warning-msg");
                warningTag.textContent = "Attention le nombre d'articles commandés doit être compris entre 1 et 100";
                const warningInput = currentArticle.querySelector(".cart__item__content__settings__quantity");
                warningInput.appendChild(warningTag);
            }
        }
        else {
            const warningExist = document.getElementById(currentItem + "warning-msg");
            if (warningExist) {
                // const selectorString = "#" + currentItem + "warning-msg";
                // console.log(selectorString);
                // const pWarning = document.querySelector(selectorString);
                // pWarning.remove();
                warningExist.remove();
            }
            localStorage.setItem("kanap:" + currentId + ":" + currentColor, articleNumber);
            element.setAttribute("value", articleNumber);
        }
        /*localStorage.setItem(currentId + ":" + currentColor, articleNumber);
        element.setAttribute("value", articleNumber);*/
        updatePrice();
    }));
    const deleteItem = document.querySelectorAll(".deleteItem");
    deleteItem.forEach(element => element.addEventListener("click", function () {
        console.log("element deleted");
        const currentArticle = this.closest("article");
        const currentId = currentArticle.dataset.id;
        const currentColor = currentArticle.dataset.color;
        localStorage.removeItem("kanap:" + currentId + ":" + currentColor);
        currentArticle.remove();
        updatePrice();
    }));
    const boutonCommander = document.getElementById("order");
    boutonCommander.addEventListener("click", getUserInfos);
}

main();