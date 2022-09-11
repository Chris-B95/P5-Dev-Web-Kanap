// Récupération de la liste des produits via l'API
async function getProductsList() {

    try {
        let response = await fetch("http://localhost:3000/api/products/");
        let productsList = await response.json();
        return (productsList);
    } catch (err) {
        console.log(err);
    }
}

// Création des articles pour chaque produit
async function createArticles() {
    const productsList = await getProductsList();
    for (i = 0; i < productsList.length; i++) {
        let aTag = document.createElement("a");
        aTag.setAttribute("href", "./product.html?id=" + productsList[i]._id);
        let articleTag = document.createElement("article");
        aTag.appendChild(articleTag);
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", productsList[i].imageUrl);
        imgTag.setAttribute("alt", productsList[i].altTxt);
        let h3Tag = document.createElement("h3");
        h3Tag.setAttribute("class", "productName");
        h3Tag.textContent = (productsList[i].name);
        let pTag = document.createElement("p");
        pTag.setAttribute("class", "productDescription");
        pTag.textContent = (productsList[i].description);
        articleTag.appendChild(imgTag);
        articleTag.appendChild(h3Tag);
        articleTag.appendChild(pTag);
        document.getElementById("items").appendChild(aTag);
    };
}

// Fonction principale et appel de celle-ci
function main() {
    createArticles();
}

main();