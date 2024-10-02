export async function reportLevel(server, accessToken, reason) {
	const urlParams = new URLSearchParams(window.location.search);
	let levelIdentifier = urlParams.get('level');
	let levelIdentifierParts = levelIdentifier.split(':')
    const response = await fetch(server + 'report/' + levelIdentifierParts[0] + '/' + levelIdentifierParts[1]+'reason='+reason, { headers: { 'Authorization': `Bearer ${accessToken}` }})
    const text = await response.text();
    if(response.status != 200) {
        return false
    }
    return JSON.parse(text);
}
