<<<<<<< HEAD
 

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

document.getElementById("auktion1").innerHTML += auction + " - " + status + "<br />" ;
document.getElementById("auktion2").innerHTML += auction + " - " + status + "<br />" ;
document.getElementById("auktion3").innerHTML += auction + " - " + status + "<br />" ;
document.getElementById("auktion4").innerHTML += auction + " - " + status + "<br />" ;
document.getElementById("auktion5").innerHTML += auction + " - " + status + "<br />" ;
}
=======
async function populateListOfAuctionsInDiv() {

  let auktionResponse = await fetchAuctions();

  console.log(auktionResponse);
	let auktionDiv = document.getElementById("auktion-container");

  for (let i = 0; i < auktionResponse.length; i++) {
    let newDiv = document.createElement("div");
		newDiv.setAttribute("class", "auktion-wrapper");

		let h3 = document.createElement("h3");
		let test = "Aukton";
		h3.innerHTML = test;
		var title = JSON.stringify(auktionResponse[i].Titel).replace(/"/g, "");
		var description = JSON.stringify(auktionResponse[i].Beskrivning).replace(/"/g, "");
		var startDate = JSON.stringify(auktionResponse[i].StartDatum).replace(/"/g, "");
		var endDate = JSON.stringify(auktionResponse[i].SlutDatum).replace(/"/g, "");
		var startingPrice = JSON.stringify(auktionResponse[i].Utropspris).replace(/"/g, "");

		var text = title + "<br />" + description + "<br />" + startDate + "<br />" + endDate + "<br /> Summa: " + startingPrice;

    newDiv.innerHTML = test + "<br />" +  text;
    auktionDiv.appendChild(newDiv);
	}
  // for (let auktionContent of auktionResponse) {
  //
  //   var title = JSON.stringify(auktionContent.Titel).replace(/"/g, "");
  //   var description = JSON.stringify(auktionContent.Beskrivning).replace(/"/g, "");
  //   var startDate = JSON.stringify(auktionContent.StartDatum).replace(/"/g, "");
  //   var endDate = JSON.stringify(auktionContent.SlutDatum).replace(/"/g, "");
  //   var startingPrice = JSON.stringify(auktionContent.Utropspris).replace(/"/g, "");
  //
  //   var status = getAuctionStatus(endDate);
  //
  //   var auction = title + "<br />" + description + "<br />" + startDate + "<br />" + endDate + "<br /> Summa: " + startingPrice;
  //
  //   document.getElementById("auktion1").innerHTML += auction + "<br />" + status + "<br />";
  //   document.getElementById("auktion2").innerHTML += auction + "<br />" + status + "<br />";
  //   document.getElementById("auktion3").innerHTML += auction + "<br />" + status + "<br />";
  //   document.getElementById("auktion4").innerHTML += auction + "<br />" + status + "<br />";
  //   document.getElementById("auktion5").innerHTML += auction + "<br />" + status + "<br />";
  // }
>>>>>>> master

}

function getAuctionStatus(endDate) {
  var currentdate = new Date();
  var endTime = Date.parse(endDate);
  var status;
  if (currentdate < endTime)
    status = "Öppen";
  else
    status = "Stängd";
  return status;
}

async function populateBidsInDivofAuction(auction) {

  let budResponse = await fetchBidForAuction(auction);
  document.getElementById("auction").innerHTML = "Bids for auction" + auction + ": " + JSON.stringify(budResponse) + "<br />";

}

async function fetchAuctions() {
  var urlForGettingAuction = "https://nackowskis.azurewebsites.net/api/auktion/400/";

  let auctionData = await fetch(urlForGettingAuction);
  let auctionInJsonFormat = await auctionData.json();

  return auctionInJsonFormat;
}

async function fetchBidForAuction(auction) {
  var urlForGettingBid = "https://nackowskis.azurewebsites.net/api/bud/400/" + auction;

  let bidForAuction = await fetch(urlForGettingBid);
  let bidInJsonFormat = await bidForAuction.json();

  return bidInJsonFormat;
}

<<<<<<< HEAD
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

=======
function createAuction() {
  fetch("https://nackowskis.azurewebsites.net/api/auktion/400/", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      AuktionID: 75,
      Beskrivning: "Träna med världens mest kända Jujutsu tränare",
      Gruppkod: 400,
      SlutDatum: "2018-03-20T00:00:00",
      StartDatum: "2018-03-15T00:00:00",
      Titel: "Alex Jujutsu träning",
      Utropspris: 2000
    })
  }).then(res => res.json()).then(res => console.log(res));
}

function removeAuction(id) {
  fetch("https://nackowskis.azurewebsites.net/api/auktion/400/" + id, {
    method: "DELETE",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(res => console.log(res));
}

function createBud() {
  fetch("https://nackowskis.azurewebsites.net/api/bud/400/", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({BudID: 3, Summa: 1800, AuktionID: 1})
  }).then(res => res.json()).then(res => console.log(res));
}

function removeBud(id) {
  fetch("https://nackowskis.azurewebsites.net/api/bud/400/" + id, {
    method: "Delete",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(res => console.log(res));
}

>>>>>>> master
populateListOfAuctionsInDiv();
populateBidsInDivofAuction(4);
