
async function populateListOfAuctionsInDiv(){

let auktionResponse = await fetchAuctions();



for(let auktionContent of auktionResponse){

var title = JSON.stringify(auktionContent.Titel).replace (/"/g,"");
var description = JSON.stringify(auktionContent.Beskrivning).replace (/"/g,"");
var startDate = JSON.stringify(auktionContent.StartDatum).replace (/"/g,"");
var endDate = JSON.stringify(auktionContent.SlutDatum).replace (/"/g,"");
var startingPrice = JSON.stringify(auktionContent.Utropspris).replace (/"/g,"");

var status = getAuctionStatus(endDate);

var auction = title + " - " + description + " - " + startDate + " - " + endDate + " - " + startingPrice;

document.getElementById("listOfAuctions").innerHTML += auction + " - " + status + "<br />" ;
}

}

function getAuctionStatus(endDate){
	var currentdate = new Date();
	var endTime = Date.parse(endDate);
	var status;
	if(currentdate < endTime) status = "Öppen";
	else status = "Stängd";
	return status;
}

async function populateBidsInDivofAuction(auction){

let budResponse = await fetchBidForAuction(auction);
document.getElementById("auction").innerHTML = "Bids for auction" + auction + ": " + JSON.stringify(budResponse) + "<br />";

}

async function fetchAuctions(){
	var urlForGettingAuction = "https://nackowskis.azurewebsites.net/api/auktion/400/";

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

function create() {
	fetch("https://nackowskis.azurewebsites.net/api/auktion/400/", {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			AuktionID: 75,
			Beskrivning: "Ahmet",
			Gruppkod: 400,
			SlutDatum: "2018-03-31T00:00:00",
			StartDatum: "2018-03-10T00:00:00",
			Titel: "Ahmet är bäst",
			Utropspris: 1500
		})
	}).then(res=>res.json())
	.then(res => console.log(res));
}


function remove() {
	fetch("https://nackowskis.azurewebsites.net/api/auktion/400/" + id, {
		method: "DELETE",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
	}).then(res=>res.json())
	.then(res => console.log(res));
}

populateListOfAuctionsInDiv();
populateBidsInDivofAuction(4);
<<<<<<< HEAD


=======
>>>>>>> master
