document.getElementById('js-insert-name').addEventListener('input', validateForm);
document.getElementById('js-insert-price').addEventListener('input', validateForm);
document.getElementById('deleteButton').addEventListener('click', deleteProductById);
document.getElementById('insertButton').addEventListener('click', insertProduct);
document.addEventListener('DOMContentLoaded', getAllProducts);


function sortObjectKeys(obj) {
    const keyOrder = ["ProductId", "Description", "Count", "Type", "Gender", "Size", "Price"];
    const ordered = {};
    keyOrder.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            ordered[key] = obj[key];
        }
    });
    return ordered;
}


async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const productsJson = await response.json();
        const sortedProducts = productsJson.map(product => sortObjectKeys(product));
        refreshTable(sortedProducts);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteProductById() {
    const productId = document.getElementById('js-delete-id-input').value;
    if (!productId || productId <= 0) {
        alert("Please enter a valid product ID.");
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' });
        if (response.status === 404) {
            const result = await response.json();
            alert(result.error);
            return;
        }
        getAllProducts(); 
    } catch (error) {
        console.error("Error:", error);
    }
}


async function insertProduct() {
    const name = document.getElementById('js-insert-name').value;
    const count = document.getElementById('js-insert-count').value;
    const type = document.getElementById('js-insert-type').value;
    const gender = document.getElementById('js-insert-gender').value;
    const size = document.getElementById('js-insert-size').value;
    const price = document.getElementById('js-insert-price').value;

    if (!name || !price || count < 0 || price < 0) {
        alert("Please fill out all fields correctly. Count and Price must be non-negative.");
        return;
    }

    const newProduct = { Description: name, Count: parseInt(count), Type: type, Gender: gender, Size: size, Price: parseFloat(price) };

    try {
        await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        getAllProducts(); 
    } catch (error) {
        console.error("Error:", error);
    }
}

function validateForm() {
    const name = document.getElementById('js-insert-name').value;
    const price = document.getElementById('js-insert-price').value;
    const insertButton = document.getElementById('insertButton');

    if (name && price > 0) {
        insertButton.disabled = false;
    } else {
        insertButton.disabled = true;
    }
}



function refreshTable(products) {
    const tableBody = document.querySelector(".js-table-products tbody");
    tableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        const sortedProduct = sortObjectKeys(product);
        Object.keys(sortedProduct).forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = sortedProduct[key];
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}


