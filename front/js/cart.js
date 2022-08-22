/*async function getProductsList() {

    try {
        let response = await fetch("http://localhost:3000/api/products/");
        let productsList = await response.json();
        return (productsList);
    } catch (err) {
        console.log(err);
    }
}*/

async function getProductsList() {
    try {
        let products = [];
        for (let i = 0; i < localStorage.length; i++) {
            const retrieveObject = localStorage.key(i);
            const retrieveId = retrieveObject.split(":");
            console.log(retrieveId[0]);
            let response = await fetch("http://localhost:3000/api/products/" + retrieveId[0]);
            let product = await response.json();
            console.log(product);
            products.push(product)
        }
        console.log(products);
        return products;
    }
    catch (err) {
        console.log(err);
    }
}

async function main() {
    const allProducts = await getProductsList();
    for (i = 0; i < localStorage.length; i++) {
        const keyItem = localStorage.key(i);
        const idAndColor = keyItem.split(":");
        const articleNumber = localStorage.getItem(keyItem);
        const currentProduct = allProducts.find(obj => obj._id === idAndColor[0]);
        const articleTag = document.createElement("article");
        articleTag.setAttribute("class", "cart__item");
        articleTag.setAttribute("data-id", idAndColor[0]);
        articleTag.setAttribute("data-color", idAndColor[1]);
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
        pTag.textContent = (idAndColor[1]);
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
    };
    const inputModify = document.querySelectorAll(".itemQuantity");
    /*inputModify && */inputModify.forEach(element => element.addEventListener("change", function () {
        console.log("qty changed");
        const currentArticle = this.closest("article");
        const currentId = currentArticle.dataset.id;
        const currentColor = currentArticle.dataset.color;
        const currentItem = currentId + currentColor;
        let articleNumber = localStorage.getItem(currentId + ":" + currentColor);
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
                /*const selectorString = "#" + currentItem + "warning-msg";
                console.log(selectorString);
                const pWarning = document.querySelector(selectorString);
                pWarning.remove();*/
                warningExist.remove();
            }
            localStorage.setItem(currentId + ":" + currentColor, articleNumber);
            element.setAttribute("value", articleNumber);
        }
        /*localStorage.setItem(currentId + ":" + currentColor, articleNumber);
        element.setAttribute("value", articleNumber);*/
    }));
    const deleteItem = document.querySelectorAll(".deleteItem");
    deleteItem.forEach(element => element.addEventListener("click", function () {
        console.log("element deleted");
        const currentArticle = this.closest("article");
        const currentId = currentArticle.dataset.id;
        const currentColor = currentArticle.dataset.color;
        localStorage.removeItem(currentId + ":" + currentColor);
        currentArticle.remove();
    }));
}

main();