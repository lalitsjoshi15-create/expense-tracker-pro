// Initialize Lucide icons
lucide.createIcons();

// --- Firebase Setup (Placeholder) ---
const firebaseConfig = {};

let db = null;
let useFirebase = false;

if (firebaseConfig.apiKey) {
    try {
        const app = window.initializeApp(firebaseConfig);
        db = window.getFirestore(app);
        useFirebase = true;
        console.log("Firebase initialized successfully.");
    } catch (e) {
        console.warn("Firebase init failed, falling back to LocalStorage.");
    }
} else {
    console.log("No Firebase config found. Running in Offline/LocalStorage mode.");
}

// --- State ---
let transactions = [];
let isLoggedIn = false;

// --- DOM Elements ---
const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');
const listEl = document.getElementById('transaction-list');
const formEl = document.getElementById('transaction-form');
const insightsListEl = document.getElementById('insights-list');

// --- Views & Navigation ---
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const navBtns = document.querySelectorAll('.nav-btn[data-target]');
const contentSections = document.querySelectorAll('.content-section');

// --- Navigation Logic ---
function switchSection(targetId) {
    // Update active nav button
    navBtns.forEach(btn => {
        if (btn.dataset.target === targetId) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // Update active section
    contentSections.forEach(section => {
        if (section.id === targetId) {
            section.classList.add('active-section');
            // If switching to dashboard, ensure trend chart fits container
            if (targetId === 'dashboard-section' && trendChartInstance) trendChartInstance.resize();
            // If switching to insights, ensure pie chart fits container
            if (targetId === 'insights-section' && pieChartInstance) pieChartInstance.resize();
        } else {
            section.classList.remove('active-section');
        }
    });
}

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchSection(btn.dataset.target);
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginView.classList.remove('active-view');
    appView.classList.add('active-view');
    isLoggedIn = true;
    init(); // Start fetching data
    switchSection('dashboard-section');
});

logoutBtn.addEventListener('click', () => {
    appView.classList.remove('active-view');
    loginView.classList.add('active-view');
    isLoggedIn = false;
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
});


// --- Charts ---
let trendChartInstance = null;
let pieChartInstance = null;
const CHART_COLORS = ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

// --- Initialize Data ---
function init() {
    if (!isLoggedIn) return;

    if (useFirebase) {
        const q = window.query(window.collection(db, "transactions"), window.orderBy("date", "desc"));
        window.onSnapshot(q, (snapshot) => {
            transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            updateUI();
        });
    } else {
        const localData = localStorage.getItem('nexus_transactions_v2');
        if (localData) {
            transactions = JSON.parse(localData);
        }
        updateUI();
    }
}

// --- Update UI ---
function updateUI() {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
    const balance = income - expense;

    // Update Dashboard Cards
    balanceEl.innerText = `$${balance.toFixed(2)}`;
    incomeEl.innerText = `$${income.toFixed(2)}`;
    expenseEl.innerText = `$${expense.toFixed(2)}`;
    document.getElementById('balance-card').style.boxShadow = balance < 0 ? '0 8px 32px 0 rgba(239, 68, 68, 0.2)' : '0 8px 32px 0 rgba(0, 0, 0, 0.3)';

    // Update Transactions List
    listEl.innerHTML = '';
    if (transactions.length === 0) {
        listEl.innerHTML = '<div class="empty-state">No transactions yet. Start adding some!</div>';
    } else {
        transactions.forEach(tx => {
            const date = new Date(tx.date).toLocaleDateString();
            const sign = tx.type === 'income' ? '+' : '-';
            const item = document.createElement('div');
            item.className = `tx-item ${tx.type}`;
            item.innerHTML = `
                <div class="tx-info">
                    <h4>${tx.title}</h4>
                    <p>${tx.category} • ${date}</p>
                </div>
                <div class="tx-amount">${sign}$${Number(tx.amount).toFixed(2)}</div>
            `;
            listEl.appendChild(item);
        });
    }

    updateHealthScore(income, expense);
    updateSmartInsights();
    updateCharts(expense);

    if (!useFirebase) {
        localStorage.setItem('nexus_transactions_v2', JSON.stringify(transactions));
    }
}

// --- Health Score ---
function updateHealthScore(income, expense) {
    let score = 50;
    if (income > 0) {
        const savingRate = ((income - expense) / income) * 100;
        if (savingRate > 20) score = 95;
        else if (savingRate > 10) score = 80;
        else if (savingRate > 0) score = 65;
        else score = 30;
    } else if (expense > 0) {
        score = 10;
    }

    const gauge = document.getElementById('health-gauge');
    const scoreText = document.getElementById('health-score');
    const msg = document.getElementById('health-message');

    let color = '#ef4444'; // danger
    if (score >= 80) color = '#10b981'; // success
    else if (score >= 50) color = '#f59e0b'; // warning

    scoreText.innerText = score;
    scoreText.style.color = color;
    gauge.style.background = `conic-gradient(${color} ${score}%, var(--glass-border) ${score}%)`;

    if (score >= 80) msg.innerText = "Excellent! You are saving like a pro.";
    else if (score >= 50) msg.innerText = "Good, but room for improvement.";
    else msg.innerText = "Warning: You are overspending.";
}

// --- Smart Insights ---
function updateSmartInsights() {
    insightsListEl.innerHTML = '';
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (transactions.length < 3) {
        insightsListEl.innerHTML = '<li class="insight-item">Add a few more transactions to get AI-powered insights.</li>';
        return;
    }

    const categoryTotals = {};
    expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
    });

    if (Object.keys(categoryTotals).length > 0) {
        const topCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b);
        addInsight(`💡 Your highest spending is on <strong>${topCategory}</strong> ($${categoryTotals[topCategory].toFixed(2)}). Consider setting a budget.`);
    }

    if (expenses.length > 0) {
        const lastTx = expenses[0];
        if (lastTx.amount > 100) {
            addInsight(`⚠️ Large recent expense: $${lastTx.amount} for ${lastTx.title}.`);
        }
    }
}

function addInsight(html) {
    const li = document.createElement('li');
    li.className = 'insight-item';
    li.innerHTML = html;
    insightsListEl.appendChild(li);
}

// --- Charts ---
function updateCharts(totalExpense) {
    // Prepare Pie Data
    const expenses = transactions.filter(t => t.type === 'expense');
    const catTotals = {};
    expenses.forEach(t => catTotals[t.category] = (catTotals[t.category] || 0) + Number(t.amount));
    
    const pieLabels = Object.keys(catTotals);
    const pieData = Object.values(catTotals);

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    if (pieChartInstance) pieChartInstance.destroy();
    
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.font.family = 'Outfit';

    pieChartInstance = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: pieLabels,
            datasets: [{
                data: pieData,
                backgroundColor: CHART_COLORS,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'right' } }
        }
    });

    // Mock Trend Data
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    if (trendChartInstance) trendChartInstance.destroy();

    trendChartInstance = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Expenses',
                data: [totalExpense * 0.2, totalExpense * 0.3, totalExpense * 0.1, totalExpense * 0.4],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

// --- Event Listeners ---
formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.innerText = 'Adding...';

    const newTx = {
        title: document.getElementById('tx-title').value,
        amount: Number(document.getElementById('tx-amount').value),
        type: document.getElementById('tx-type').value,
        category: document.getElementById('tx-category').value,
        date: new Date().toISOString()
    };

    if (useFirebase) {
        try {
            await window.addDoc(window.collection(db, "transactions"), newTx);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to add transaction to database.");
        }
    } else {
        newTx.id = Date.now().toString();
        transactions.unshift(newTx);
        updateUI();
    }

    formEl.reset();
    btn.innerText = 'Add Transaction';
});
