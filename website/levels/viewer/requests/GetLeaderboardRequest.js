export async function loadLeaderboardData(server) {
	const urlParams = new URLSearchParams(window.location.search);
	let levelIdentifier = urlParams.get('level');
	let levelIdentifierParts = levelIdentifier.split(':')
    const response = await fetch(server + 'statistics_top_leaderboard/' + levelIdentifierParts[0] + '/' + levelIdentifierParts[1])
    const text = await response.text();
    if(response.status != 200) {
        return false
    }
    return JSON.parse(text);
}
