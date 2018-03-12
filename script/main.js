

async function getAuctionContent(){

let auktionResponse = await fetchAuction(4);
let budResponse = await fetchBidForAuction(1);

document.getElementById("auktion").innerHTML = auktionResponse.Titel;

console.log(auktionResponse);
console.log(budResponse);
}

async function fetchAuction(auction){
	var urlForGettingAuction = "https://nackowskis.azurewebsites.net/api/auktion/400/" + auction;

	let auctionData = await fetch(urlForGettingAuction);
	let auctionInJsonFormat = await auctionData.json();

	return auctionInJsonFormat;
}

async function fetchBidForAuction(auction){
	var urlForGettingBid = "https://nackowskis.azurewebsites.net/api/bud/400/" + auction;

	let bidForAuction = await fetch(urlForGettingBid);
	let bidInJsonFormat = await bidForAuction.json();

	return bidInJsonFormat;
}

getAuctionContent();


