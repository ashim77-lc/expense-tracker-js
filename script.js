let expenses = []

function addExpense() {
    let name = document.getElementById("expName").value.trim()
    let amount = document.getElementById("expAmount").value.trim()
    let category = document.getElementById("expCategory").value

    if (!name || !amount || !category) {
        alert("Please fill all fields!")
        return
    }
    if (parseFloat(amount) <= 0) {
        alert("Amount must be greater than 0!")
        return
    }

    let expense = {
        name: name,
        amount: parseFloat(amount),
        category: category
    }

    expenses.push(expense)

    document.getElementById("expName").value = ""
    document.getElementById("expAmount").value = ""
    document.getElementById("expCategory").value = ""

    displayExpenses()
}

function displayExpenses() {
    let filter = document.getElementById("filterCategory").value
    let filtered = filter === "All" ? expenses : expenses.filter(e => e.category === filter)

    let list = document.getElementById("expenseList")
    list.innerHTML = ""

    if (filtered.length === 0) {
        list.innerHTML = "<p class='empty'>No expenses found.</p>"
    } else {
        for (let i = 0; i < filtered.length; i++) {
            list.innerHTML += `
                <div class="expense-item">
                    <div class="info">
                        <span>${filtered[i].name}</span>
                        <span class="category">${filtered[i].category}</span>
                    </div>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <span class="amount">Rs. ${filtered[i].amount}</span>
                        <button class="del-btn" onclick="deleteExpense(${expenses.indexOf(filtered[i])})">Delete</button>
                    </div>
                </div>
            `
        }
    }

    updateTotal()
}

function updateTotal() {
    let total = expenses.reduce((sum, e) => sum + e.amount, 0)
    document.getElementById("total").textContent = "Rs. " + total.toFixed(2)
}

function deleteExpense(index) {
    expenses.splice(index, 1)
    displayExpenses()
}

document.getElementById("addBtn").addEventListener("click", addExpense)
document.getElementById("filterCategory").addEventListener("change", displayExpenses)