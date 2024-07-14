// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const billingForm = document.getElementById("billing-form");
    const productSelect = document.getElementById("product");
    const quantityInput = document.getElementById("quantity");
    const billList = document.getElementById("bill-list");
    const totalAmount = document.getElementById("total");
    let total = 0.00;

    billingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const productName = selectedOption.text;
        const productPrice = parseFloat(selectedOption.getAttribute("data-price"));
        const quantity = parseInt(quantityInput.value);
        const totalPrice = (productPrice * quantity).toFixed(2);

        // Add item to the bill list
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${productName}</td>
            <td>${quantity}</td>
            <td>$${productPrice.toFixed(2)}</td>
            <td>$${totalPrice}</td>
        `;
        billList.appendChild(row);

        // Update total amount
        total += parseFloat(totalPrice);
        totalAmount.textContent = total.toFixed(2);

        // Clear form inputs
        productSelect.selectedIndex = 0;
        quantityInput.value = "";
    });

    document.getElementById("generate-bill").addEventListener("click", function() {
        alert(`The total amount to be paid is $${total.toFixed(2)}`);
        // Optionally, you could implement further logic for handling the bill generation
    });
});
