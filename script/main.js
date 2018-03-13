async function populateListOfAuctionsInDiv() {

  // hämtar Auktion URL
  let auktionResponse = await fetchAuctions();
  console.log(auktionResponse);

  let auktionDiv = document.getElementById("auktion-container");
  let searchButton = document.getElementById("searchButton");

  //Sök Function inom Auktioner
  searchButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let result = auktionResponse.filter(value => value.Titel.includes(searchInput));
    var status = getAuctionStatus(endDate);

    auktionDiv.innerHTML = " ";

    if (result.length != 0 && searchInput !== "") {
      auktionDiv.className = "auktion-container";
      for (let value of result) {

        let content = document.createElement("div");
        content.setAttribute("class", "newDiv");

        var title = JSON.stringify(value.Titel).replace(/"/g, "");
        var description = JSON.stringify(value.Beskrivning).replace(/"/g, "");
        var startDate = JSON.stringify(value.StartDatum).replace(/"/g, "");
        var endDate = JSON.stringify(value.SlutDatum).replace(/"/g, "");
        var startingPrice = JSON.stringify(value.Utropspris).replace(/"/g, "");

        var text = "<h2>" + title + "</h2>" + "<p>" + description + "</p>" + "<p>" + startDate + "</p>" + "<p>" + endDate + "</p>" + "<p> Summa: " + startingPrice + "</p>" + "<p>Status: " + status + "</p>";

        content.innerHTML = text;

        auktionDiv.appendChild(content);
      }

    } else if(searchInput === "") {
      auktionDiv.className = "auktion-search";
      auktionDiv.innerHTML = "Du måste skriva in något";
    }
    else {
      auktionDiv.className = "auktion-search";
      auktionDiv.innerHTML = "Inga hittade matchningar";
    }
  });

  //Loopa genom alla Auktioner och lägg up de i varsin div
  for (let i = 0; i < auktionResponse.length; i++) {

    let content = document.createElement("div");
    content.setAttribute("class", "content");

    var title = JSON.stringify(auktionResponse[i].Titel).replace(/"/g, "");
    var description = JSON.stringify(auktionResponse[i].Beskrivning).replace(/"/g, "");
    var startDate = JSON.stringify(auktionResponse[i].StartDatum).replace(/"/g, "");
    var endDate = JSON.stringify(auktionResponse[i].SlutDatum).replace(/"/g, "");
    var startingPrice = JSON.stringify(auktionResponse[i].Utropspris).replace(/"/g, "");
    var status = getAuctionStatus(endDate);

    var text = "<h2>" + title + "</h2>" + "<p>" + description + "</p>" + "<p>" + startDate + "</p>" + "<p>" + endDate + "</p>" + "<p> Summa: " + startingPrice + "</p>" + "<p>Status: " + status + "</p>";

    content.innerHTML = text;

    auktionDiv.appendChild(content);

  }
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

populateListOfAuctionsInDiv();
populateBidsInDivofAuction(5);
