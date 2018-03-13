<<<<<<< HEAD


var url = "https://nackowskis.azurewebsites.net/api/auktion/400/";

async function getData(){
=======
>>>>>>> master


async function populateListOfAuctionsInDiv(){

let auktionResponse = await fetchAuctions();



for(let auktionContent of auktionResponse){

var title = JSON.stringify(auktionContent.Titel).replace (/"/g,'');
var description = JSON.stringify(auktionContent.Beskrivning).replace (/"/g,'');
var startDate = JSON.stringify(auktionContent.StartDatum).replace (/"/g,'');
var endDate = JSON.stringify(auktionContent.SlutDatum).replace (/"/g,'');
var startingPrice = JSON.stringify(auktionContent.Utropspris).replace (/"/g,'');

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

<<<<<<< HEAD

getData();


var minJSON = [{"AuktionID":4,"Titel":"ALEXANDERS oljemålning över Stockholm","Beskrivning":"Tidig Lisa Lind målning. Olja på duk, signerad och daterad -71","StartDatum":"2018-03-10T00:00:00","SlutDatum":"2018-03-31T00:00:00","Gruppkod":400,"Utropspris":1500}];

/*ar parsad = JSON.parse(minJSON);*/


postData("https://nackowskis.azurewebsites.net/api/auktion/400/", minJSON);

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // *manual, follow, error
    //referrer: 'client', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}




=======
async function fetchBidForAuction(auction){
	var urlForGettingBid = "https://nackowskis.azurewebsites.net/api/bud/400/" + auction;

	let bidForAuction = await fetch(urlForGettingBid);
	let bidInJsonFormat = await bidForAuction.json();

	return bidInJsonFormat;
}

populateListOfAuctionsInDiv();
populateBidsInDivofAuction(4);
>>>>>>> master

