let bill = [];

// Sample products
const products = [
    { name: "Cappucino", price: 34000, img: "images/cappuccino.jpg", category: "cafe" },
    { name: "Espresso", price: 35000, img: "images/Espresso.jpg", category: "cafe" },
    { name: "Mocha", price: 36000, img: "images/mocha.jpg", category: "hot" },
    { name: "Black coffee", price: 37000, img: "images/black coffee.jpg", category: "hot" },
    { name: "tea with milk", price: 38000, img: "images/tea with milk.jpg", category: "cool" },
    { name: "green tea with milk", price: 40000, img: "images/green tea with milk.jpg", category: "cool" },
    { name: "chocolate", price: 40000, img: "images/chocolate.jpg", category: "cool" },
    { name: "strawberry yogurt", price: 40000, img: "images/strawberry yogurt.jpg", category: "cool" },
    { name: "lemon tea", price: 40000, img: "images/lemon tea.jpg", category: "cool" },
];


// Update datetime auto
function updateTime() {
    let now = new Date();
    let formatted = now.toLocaleString("lo-LA");
    document.getElementById("datetime").innerText = "ເວລາ: " + formatted;
}
setInterval(updateTime, 1000);
updateTime();

function renderProducts(category = null) {
    let container = document.getElementById("product-list");
    container.innerHTML = "";

    let filtered = category ? products.filter(p => p.category === category) : products;

    filtered.forEach(p => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.price} kip</p>
    `;
        card.onclick = () => addToBill(p.name, p.price);
        container.appendChild(card);
    });
}

function filterCategory(cat) {
    renderProducts(cat);
}

function addToBill(name, price) {
    let item = bill.find(p => p.name === name);
    if (item) {
        item.qty++;
        item.total = item.qty * item.price;
    } else {
        bill.push({ name, price, qty: 1, total: price });
    }
    renderBill();
}

function renderBill() {
    let tbody = document.querySelector("#bill-table tbody");
    tbody.innerHTML = "";
    let total = 0;
    bill.forEach(item => {
        total += item.total;
        tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
        <td>${item.total}</td>
      </tr>`;
    });
    document.getElementById("total").innerText = "ລວມ: " + total + " kip";
}

function printBill() {
    let win = window.open("", "Print", "width=400,height=700");

    let billHTML = `
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Phetsarath:wght@400;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Phetsarath', sans-serif; font-size: 14px; margin: 0; padding: 20px; }
        .header { text-align: center; margin-bottom: 10px; }
        .header img { width: 80px; height: 80px; object-fit: cover; border-radius: 50%; }
        .header h2 { margin: 5px 0 0 0; font-weight: 700; font-size: 18px; }
        .datetime { text-align: center; font-size: 12px; color: gray; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        th, td { border-bottom: 1px solid #ddd; padding: 5px 0; }
        th:nth-child(1), td:nth-child(1) { text-align: left; }
        th:nth-child(2), td:nth-child(2) { text-align: center; }
        th:nth-child(3), td.price { text-align: right; }
        th:nth-child(4), td.total { text-align: right; }
        h3.total { text-align: right; font-weight: 700; margin-top: 10px; }
        p.thanks { text-align: center; margin-top: 20px; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="header">
        <img id="logo" src="https://img.freepik.com/vecteurs-libre/cafe-delicieux_24877-49164.jpg?semt=ais_hybrid&w=740&q=80" alt="logo">
        <h2>Barisma Café & Bar</h2>
      </div>
      <div class="datetime">${document.getElementById("datetime").innerText}</div>
      <table>
        <thead>
          <tr>
            <th>ຊື່ສີນຄ້າ</th>
            <th>ຈຳນວນ</th>
            <th>ລາຄາ</th>
            <th>ລວມ</th>
          </tr>
        </thead>
        <tbody>
  `;

    let total = 0;
    bill.forEach(item => {
        total += item.total;
        billHTML += `
          <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td class="price">${item.price.toLocaleString()} kip</td>
            <td class="total">${item.total.toLocaleString()} kip</td>
          </tr>`;
    });

    billHTML += `
        </tbody>
      </table>
      <h3 class="total">ລວມ: ${total.toLocaleString()} kip</h3>
      <p class="thanks">ຂອບໃຈທີ່ໃຊ້ບໍລິການ</p>
    </body>
    </html>
  `;

    win.document.write(billHTML);
    win.document.close();

    // รอให้ logo โหลดเสร็จ
    let img = win.document.getElementById("logo");
    img.onload = () => {
        win.focus();
        win.print();
        win.close();
    };
}


// Load all products first time
renderProducts();