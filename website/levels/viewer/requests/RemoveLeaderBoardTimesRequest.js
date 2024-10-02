export async function removeLeaderboardTimes(server, removedTimes, accessToken) {
    const urlParams = new URLSearchParams(window.location.search);
    let levelIdentifier = urlParams.get('level');
    let levelIdentifierParts = levelIdentifier.split(':');
    for (let i = 0; i < removedTimes.length; i++) {
        const endpointUrl = server+`statistics_remove_user/${levelIdentifierParts[0]}/${levelIdentifierParts[1]}?user_id=${removedTimes[i][0]}`;
        try {
            const response = await fetch(endpointUrl, { headers: { 'Authorization': `Bearer ${accessToken}` } });
            if (response.ok) {
                // Remove from UI if server removal is successful
                removedTimes.splice(i, 1);
            } else {
                alert("Failed to remove user");
            }
        } catch (error) {
            alert("Error removing user: " + error.message);
        }
    }
    return removedTimes;
}