let transactions = [];

if (localStorage.getItem("transactions")) {
  transactions = JSON.parse(localStorage.getItem("transactions"));
  updateUI();
}

const form = document.getElementById("transaction-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const date = new Date().toLocaleString();

  const transaction = { description, amount, type, category, date };

  transactions.push(transaction);

  saveTransactions();

  updateUI();

  form.reset();
});

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {
  updateSummary();
  updateTable();
}

function updateSummary() {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (t.type == "income") {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
    }
  });

  const balance = totalIncome - totalExpenses;

  document.getElementById("income").textContent = `₹${totalIncome.toFixed(2)}`;
  document.getElementById("expenses").textContent = `₹${totalExpenses.toFixed(
    2
  )}`;
  document.getElementById("balance").textContent = `₹${balance.toFixed(2)}`;
}

function updateTable() {
  const tbody = document.querySelector("#transaction-table tbody");
  tbody.innerHTML = "";

  transactions.forEach((t, index) => {
    const row = document.createElement("tr");
    row.classList.add(t.type);

    row.innerHTML = `
            <td>${t.description}</td>
            <td>₹${t.amount.toFixed(2)}</td>
            <td>${t.type.charAt(0).toUpperCase() + t.type.slice(1)}</td>
            <td>${t.category}</td>
            <td>${t.date}</td>
            <td><button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button></td>
            
        `;

    tbody.appendChild(row);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveTransactions();
  updateUI();
}
