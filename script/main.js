async function populateListOfAuctionsInDiv() {

  let auctions = await fetchAuctions();

  populateStartPageWithDataOfAuctions(auctions);

  addAnEventListenerToOrderByEndDateButton(auctions)
  addAnEventListenerToOrderByStartDateButton(auctions);
  addAnEventListenerToSearchButton(auctions);

}

function addAnEventListenerToOrderByEndDateButton(auctions){
    let auktionDiv = document.getElementById("auktion-container");
    let endDateButton = document.getElementById("endDateButton");
    endDateButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let filteredAuctions = auctions.filter(value => value.Titel.includes(searchInput));
 
 	//Change to SlutDatum for opposite sort order
	function custom_sort(a, b) {
	    return new Date(a.SlutDatum).getTime() - new Date(b.SlutDatum).getTime();
	}
	filteredAuctions.sort(custom_sort);

    if (filteredAuctions.length != 0) {
      auktionDiv.className = "auktion-container";
      auktionDiv.innerHTML = " ";
	  populateStartPageWithDataOfAuctions(filteredAuctions);
    } 
    else {
      auktionDiv.className = "auktion-search";
      auktionDiv.innerHTML = "Inga hittade matchningar";
    }
  });
}


function addAnEventListenerToOrderByStartDateButton(auctions){
    let auktionDiv = document.getElementById("auktion-container");
    let startDateButton = document.getElementById("startDateButton");
    startDateButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let filteredAuctions = auctions.filter(value => value.Titel.includes(searchInput));
 
 	//Change to StartDatum for opposite sort order
	function custom_sort(a, b) {
	    return new Date(a.StartDatum).getTime() - new Date(b.StartDatum).getTime();
	}
<<<<<<< HEAD
  // for(let auktionContent of auktionResponse) {
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
=======
	filteredAuctions.sort(custom_sort);

    if (filteredAuctions.length != 0) {
      auktionDiv.className = "auktion-container";
      auktionDiv.innerHTML = " ";
	  populateStartPageWithDataOfAuctions(filteredAuctions);
    } 
    else {
      auktionDiv.className = "auktion-search";
      auktionDiv.innerHTML = "Inga hittade matchningar";
    }
  });
}

function addAnEventListenerToSearchButton(auctions){
  let auktionDiv = document.getElementById("auktion-container");
	  let searchButton = document.getElementById("searchButton");
	  searchButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let filteredAuctions = auctions.filter(value => value.Titel.includes(searchInput));
 
    if (filteredAuctions.length != 0) {
      auktionDiv.className = "auktion-container";
      auktionDiv.innerHTML = " ";
	  populateStartPageWithDataOfAuctions(filteredAuctions);
    } 
    else {
      auktionDiv.className = "auktion-search";
      auktionDiv.innerHTML = "Inga hittade matchningar";
    }
  });
}

 function addEventListenerForShowingBid(auctionID, showBidsButton){
	  let auktionDiv = document.getElementById("auktion-container");
	  let showBidsButtonRef = document.getElementById(showBidsButton);
	  showBidsButtonRef.addEventListener("click", async function() {
	  var bidsInJSONFormat = await fetchBidForAuction(auctionID);
	  var bidsText = ""
  	for (let bid of bidsInJSONFormat) {
  		 bidsText += "<br>" + JSON.stringify(bid.Summa);
	  	}
      auktionDiv.innerHTML = "Here are all the bids for auction " + auctionID  + ":" + bidsText;
      // add an input for text
      // add a button for adding bid
      //add an event listener for this
      //Similar to adding of eventlistener in populateStartPageWithDataOfAuctions


  });
}

function populateStartPageWithDataOfAuctions(auctions){
	let auktionDiv = document.getElementById("auktion-container");



	for (let auction of auctions) {



	    let content = document.createElement("div");
	    content.setAttribute("class", "content");

	    var title = JSON.stringify(auction.Titel).replace(/"/g, "");
	    var description = JSON.stringify(auction.Beskrivning).replace(/"/g, "");
	    var startDate = JSON.stringify(auction.StartDatum).replace(/"/g, "");
	    var endDate = JSON.stringify(auction.SlutDatum).replace(/"/g, "");
	    var startingPrice = JSON.stringify(auction.Utropspris).replace(/"/g, "");
	    var status = getAuctionStatus(endDate);
	    var auctionID = JSON.stringify(auction.AuktionID).replace(/"/g, ""); 

	    var buttonName = 'showBidsFor_' + auctionID;
	    var button = "<button class='searchButton' id=" + buttonName + ">Show bids</button>";

	    var text = "<h2>" + title + "</h2>" + button + "<p>" + description + "</p>" + "<p>" + startDate + "</p>" + "<p>" + endDate + "</p>" + "<p> Summa: " + startingPrice + "</p>" + "<p>Status: " + status + "</p>";

	    content.innerHTML = text;

	    auktionDiv.appendChild(content);
	    addEventListenerForShowingBid(auctionID, buttonName);
  }
>>>>>>> master

}




// Kolla om datum stämmer med Auktionens
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
  console.log(budResponse);
}

async function fetchAuctions() {
  var urlForGettingAuction = "https://nackowskis.azurewebsites.net/api/auktion/400/";

  let auctionData = await fetch(urlForGettingAuction);
  let auctionInJsonFormat = await auctionData.json();
  console.log(auctionInJsonFormat);
  return auctionInJsonFormat;
}

async function fetchBidForAuction(auction) {
  var urlForGettingBid = "https://nackowskis.azurewebsites.net/api/bud/400/" + auction;

  let bidForAuction = await fetch(urlForGettingBid);
  let bidInJsonFormat = await bidForAuction.json();

  return bidInJsonFormat;
}

//Skapa Auction
function createAuction() {
  fetch("https://nackowskis.azurewebsites.net/api/auktion/400/", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      AuktionID: 75,
      Beskrivning: "Fräscha skor som passar till allt, fanns i storlek 36-45",
      Gruppkod: 400,
      SlutDatum: "2018-03-23T00:00:00",
      StartDatum: "2018-03-13T00:00:00",
      Titel: "Nike Skor",
      Utropspris: 500
    })
  }).then(res => res.json()).then(res => console.log(res));
}

//Ta bort Auktion
function removeAuction(id) {
  fetch("https://nackowskis.azurewebsites.net/api/auktion/400/" + id, {
    method: "DELETE",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(res => console.log(res));
}

//Skapa bud
function addBid(bid, auction) {
  fetch("https://nackowskis.azurewebsites.net/api/bud/400/", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      AuktionID: auction,
      Summa: bid
    })
  }).then(res => res.json()).then(res => console.log(res));
}

// Ta bort bud
function removeBud(id) {
  fetch("https://nackowskis.azurewebsites.net/api/bud/400/" + id, {
    method: "Delete",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(res => console.log(res));
}







async function searchFunction(){

  let searchResultList = document.getElementById('searchResult');

  let searchValue = document.getElementById('search').value;

  let aktionAPI = await fetchAuctions("http://nackowskis.azurewebsites.net/api/Auktion/400");

  let createPtag = document.createElement('p')

  var search = aktionAPI.filter(name => name.Titel.includes(searchValue));

  console.log(JSON.stringify(search));

  let textNode = document.createTextNode(JSON.stringify(search));
  
  createPtag.appendChild(textNode);
  searchResultList.appendChild(createPtag);


}











/*

populateListOfAuctionsInDiv();
<<<<<<< HEAD
populateBidsInDivofAuction(4);

*/
=======

>>>>>>> master
