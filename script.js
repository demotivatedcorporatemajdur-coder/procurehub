const API_URL = "https://script.google.com/macros/s/AKfycby92qiDU9-9Ky5pT8F3C6a80lnaNCWeGLidAQ7nO0w-pnfcTA0RSFJ5c-yEEH-bEnsdTQ/exec";

// ✅ Tender creation
document.getElementById("tenderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("tenderName").value;
  const deadline = document.getElementById("tenderDeadline").value;

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ type: "tender", name, deadline }),
  });
  const data = await res.json();
  alert("Tender Created: " + data.status);
});

// ✅ Fetch vendors
async function fetchVendors() {
  const res = await fetch(API_URL + "?type=vendors");
  const vendors = await res.json();
  const list = document.getElementById("vendorList");
  list.innerHTML = "";
  vendors.forEach(v => {
    const li = document.createElement("li");
    li.textContent = `${v.name} (${v.gstin}) - ${v.email}`;
    list.appendChild(li);
  });
}

// ✅ Fetch quotations
async function fetchQuotations() {
  const res = await fetch(API_URL + "?type=quotations");
  const quotes = await res.json();
  const list = document.getElementById("quotationList");
  list.innerHTML = "";
  quotes.forEach(q => {
    const li = document.createElement("li");
    li.textContent = `${q.vendor} → ${q.amount} (Tender: ${q.tender})`;
    list.appendChild(li);
  });
}

