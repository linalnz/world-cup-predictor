// ===== TEAMS STRENGTH ENGINE =====

const teamStrength = {
    "Brazil": 90,
    "Argentina": 88,
    "France": 92,
    "Portugal": 87,
    "England": 86,
    "Spain": 85,
    "Germany": 84,
    "Italy": 83,
    "Netherlands": 82,
    "Belgium": 81,
    "Croatia": 80,
    "Morocco": 78,
    "USA": 76,
    "Mexico": 75,
    "Japan": 74,
    "South Korea": 73
};

// ===== MATCH SIMULATION ENGINE =====

function simulateMatch(teamA, teamB) {

    let powerA = teamStrength[teamA] + Math.random() * 10;
    let powerB = teamStrength[teamB] + Math.random() * 10;

    let goalsA = Math.floor(powerA / 20);
    let goalsB = Math.floor(powerB / 20);

    // منع التعادل كثيرًا
    if (goalsA === goalsB) {
        if (Math.random() > 0.5) goalsA++;
        else goalsB++;
    }

    return {
        teamA,
        teamB,
        goalsA,
        goalsB,
        winner: goalsA > goalsB ? teamA : teamB
    };
}

// ===== GROUP MATCH GENERATOR =====

function simulateGroupMatch(group) {

    let results = [];

    for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {

            let match = simulateMatch(group[i], group[j]);
            results.push(match);
        }
    }

    return results;
}// ===== GROUP STANDINGS =====

function calculateGroupRanking(group, results) {

    let table = {};

    group.forEach(team => {
        table[team] = {
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0
        };
    });

    results.forEach(match => {

        let A = match.teamA;
        let B = match.teamB;

        table[A].goalsFor += match.goalsA;
        table[A].goalsAgainst += match.goalsB;

        table[B].goalsFor += match.goalsB;
        table[B].goalsAgainst += match.goalsA;

        if (match.goalsA > match.goalsB) {
            table[A].points += 3;
        } else {
            table[B].points += 3;
        }
    });

    return Object.entries(table).sort((a, b) => {
        return b[1].points - a[1].points;
    });
}

// ===== KNOCKOUT ROUND =====

function simulateKnockoutRound(teams) {

    let winners = [];

    for (let i = 0; i < teams.length; i += 2) {

        let match = simulateMatch(teams[i], teams[i + 1]);
        winners.push(match.winner);

        logMatch(match);
    }

    return winners;
}

// ===== FULL TOURNAMENT =====

function runTournament(groups) {

    let roundOf16 = [];

    // 1. Group Stage
    groups.forEach(group => {

        let results = simulateGroupMatch(group);
        let ranking = calculateGroupRanking(group, results);

        // top 2 qualify
        roundOf16.push(ranking[0][0]);
        roundOf16.push(ranking[1][0]);
    });

    // 2. Knockout Stages
    let quarter = simulateKnockoutRound(roundOf16);
    let semi = simulateKnockoutRound(quarter);
    let final = simulateKnockoutRound(semi);

    let champion = final[0];

    return champion;
}

// ===== LOG FUNCTION =====

function logMatch(match) {

    let logBox = document.getElementById("matchLog");

    if (!logBox) return;

    let text = `${match.teamA} ${match.goalsA} - ${match.goalsB} ${match.teamB} → Winner: ${match.winner}`;

    let p = document.createElement("p");
    p.textContent = text;

    logBox.appendChild(p);
}