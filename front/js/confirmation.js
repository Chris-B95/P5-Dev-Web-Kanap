// Récupération du numéro de commande
function getOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderId = urlParams.get("orderId");
    return orderId;
}

// Affichage du numéro de commande
function displayOrderId(orderId) {
    const idTag = document.getElementById("orderId");
    idTag.textContent = orderId;
}

// Fonction principale et son appel
function main () {
    displayOrderId(getOrderId());
}

main();