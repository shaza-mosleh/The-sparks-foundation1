

let customers = [];

document.addEventListener("DOMContentLoaded", () => {
    const customerList = document.getElementById("customer-list-items");
    const customerInfo = document.getElementById("customer-info");
    const fromCustomerSelect = document.getElementById("from-customer");
    const toCustomerSelect = document.getElementById("to-customer");
    const transferForm = document.getElementById("transfer-form");
    const selectCustomer = document.getElementById("select-customer");


    // Populate the customer list
    async function getCustomers() {
        try {
            const response = await fetch('http://localhost:3000/');

            customers = await response.json();
            console.log(customers);
            customers.forEach((customer) => {

                const option = document.createElement("option");
                option.value = customer.id;
                option.textContent = customer.name;
                selectCustomer.appendChild(option);
                fromCustomerSelect.appendChild(option.cloneNode(true));
                toCustomerSelect.appendChild(option.cloneNode(true));
                const listItem = document.createElement("li");
                listItem.textContent = customer.name;
                listItem.dataset.id = customer.id;
                listItem.addEventListener("click", () => displayCustomerDetails(customer));
                customerList.appendChild(listItem);

            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    getCustomers();




    selectCustomer.addEventListener("change", () => {
        const selectedCustomerId = selectCustomer.value;
        const selectedCustomer = customers.find((customer) => customer.id === parseInt(selectedCustomerId));
        displayCustomerDetails(selectedCustomer);
    });

    function displayCustomerDetails(customer) {
        customerInfo.innerHTML = `
            <p>Name: ${customer.name}</p>
            <p>Email: ${customer.email}</p>
            <p>Balance: $${customer.balance.toFixed(2)}</p>
        `;
    }


    transferForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const sender_id = fromCustomerSelect.value;
        const receiver_id = toCustomerSelect.value;
        const amount = parseFloat(document.getElementById("amount").value);

        if (amount <= 0) {
            alert("Please enter a valid amount to transfer.");
            return;
        }
        if (sender_id === receiver_id) {
            alert("NTA 3ABEEEEET!!");
            return;

        }
        const response = await fetch('http://localhost:3000/transfer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sender_id: sender_id, receiver_id: receiver_id, amount: amount })
        });
        const jsonresponse = await response.json();
        console.log(jsonresponse);
        if (jsonresponse.message === "Transfer successful") {
            location.reload();

        }
        else {

            alert(`Error: ${jsonresponse.error} `);

        }

    });





});
