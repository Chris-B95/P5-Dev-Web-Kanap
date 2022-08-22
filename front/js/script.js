/*fetch("http://localhost:3000/api/products/")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        console.log(value);
    })
    .catch(function (err) {
        console.log("Impossible de charger l'API");
    });*/

async function getProductsList() {

    try {
        let response = await fetch("http://localhost:3000/api/products/");
        let productsList = await response.json();
        return (productsList);
    } catch (err) {
        console.log(err);
    }
}

async function main() {
    await getProductsList();
    //test
    const monTableau = await getProductsList();
    console.log(monTableau);
    console.log(monTableau[0]);
    for (i = 0; i < monTableau.length; i++) {
        let aTag = document.createElement("a");
        aTag.setAttribute("href", "./product.html?id=" + monTableau[i]._id);
        let articleTag = document.createElement("article");
        aTag.appendChild(articleTag);
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", monTableau[i].imageUrl);
        imgTag.setAttribute("alt", monTableau[i].altTxt);
        let h3Tag = document.createElement("h3");
        h3Tag.setAttribute("class", "productName");
        h3Tag.textContent = (monTableau[i].name);
        let pTag = document.createElement("p");
        pTag.setAttribute("class", "productDescription");
        pTag.textContent = (monTableau[i].description);
        articleTag.appendChild(imgTag);
        articleTag.appendChild(h3Tag);
        articleTag.appendChild(pTag);
        document.getElementById("items").appendChild(aTag);
    };
}

main();