// ===== GLOBAL STATE =====

let currentChampion = null;
let simulationRunning = false;

// ===== BUTTONS =====

const startBtn = document.getElementById("startSimulation");
const aiBtn = document.getElementById("generateAI");
const resetBtn = document.getElementById("resetTournament");

// ===== EVENTS =====

startBtn?.addEventListener("click", () => {
    startTournament();
});

aiBtn?.addEventListener("click", () => {
    startTournament(true);
});

resetBtn?.addEventListener("click", resetTournament);

// ===== START TOURNAMENT =====

function startTournament(aiMode = false) {

    if (simulationRunning) return;

    simulationRunning = true;

    document.getElementById("matchLog").innerHTML = "";
    document.getElementById("aiResult").innerHTML = "";

    // مثال مجموعات (يمكن تطويرها لاحقًا)
    const groups = [
        ["Brazil", "Serbia", "Switzerland", "Cameroon"],
        ["France", "Denmark", "Peru", "Australia"],
        ["Argentina", "Mexico", "Poland", "Saudi Arabia"],
        ["Portugal", "Uruguay", "Korea", "Ghana"]
    ];

    currentChampion = runTournament(groups);

    showChampion(currentChampion);

    updateStats();

    simulationRunning = false;
}// ===== SHOW CHAMPION =====

function showChampion(team) {

    currentChampion = team;

    // تحديث واجهة البطل
    const champEl = document.getElementById("finalChampion");
    const champName = document.getElementById("championName");

    if (champEl) champEl.textContent = team;
    if (champName) champName.textContent = team;

    // تأثير بسيط احتفالي
    alert("🏆 Champion: " + team);
}

// ===== UPDATE STATS =====

function updateStats() {

    const predictionCount = document.getElementById("predictionCount");

    if (predictionCount) {
        let current = parseInt(predictionCount.textContent) || 0;
        predictionCount.textContent = current + 1;
    }
}

// ===== RESET TOURNAMENT =====

function resetTournament() {

    simulationRunning = false;
    currentChampion = null;

    // مسح السجلات
    document.getElementById("matchLog").innerHTML = "<p>Waiting for simulation...</p>";
    document.getElementById("aiResult").innerHTML = "";

    document.getElementById("finalChampion").textContent = "-";
    document.getElementById("championName").textContent = "-";

    document.getElementById("predictionCount").textContent = "0";

    alert("🔄 Tournament Reset!");
}

// ===== MODAL HANDLER (جاهز للتطوير لاحقاً) =====

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
});

// إغلاق عند الضغط خارج النافذة
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};