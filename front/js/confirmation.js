function getOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderId = urlParams.get("orderId");
    return orderId;
}

function displayOrderId(orderId) {
    const idTag = document.getElementById("orderId");
    idTag.textContent = orderId;
}

function main () {
    displayOrderId(getOrderId());
}

main();