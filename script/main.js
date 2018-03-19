//Här läggs in alla Funktioner som sedan kör igenom allt
async function populateListOfAuctionsInDiv() {

  let auctions = await fetchAuctions();

  populateStartPageWithDataOfOpenAuctions(auctions);

  addAnEventListenerToOrderByPrice(auctions);
  addAnEventListenerToOrderByEndDateButton(auctions);
  addAnEventListenerToSearchButton(auctions);
  addAnEventListenerToCreateAuction();
  addAnEventListenerToRemoveAuction();

}

//Funktion för att skapa en Auktion genom Admin-sidan
function addAnEventListenerToCreateAuction() {

  let titelInput = document.getElementById("adminTitel").value;
  let startDateInput = document.getElementById("adminStartDate").value;
  let endDateInput = document.getElementById("adminEndDate").value;
  let prisInput = document.getElementById("adminPris").value;
  let beskrivningInput = document.getElementById("adminBeskrivning").value;

  createAuction(titelInput, startDateInput, endDateInput, prisInput, beskrivningInput);
}

//Ta bort Auktion beroende på AuktionID
function addAnEventListenerToRemoveAuction() {

  let removeInput = document.getElementById("adminRemove").value;
  removeAuction(removeInput);

}

//Funktion för att kunna söka igenom Auktionerna och få ut det man har skrivit
function addAnEventListenerToSearchButton(auctions) {
  let auktionDiv = document.getElementById("auktion-container");
  let searchButton = document.getElementById("searchButton");
  let searchInput = document.getElementById("searchInput");

  searchButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let filteredAuctions = auctions.filter(value => value.Titel.toLowerCase().includes(searchInput.toLowerCase()) != 0);
    if (filteredAuctions.length != 0) {
      auktionDiv.className = "auktion-container";
      auktionDiv.innerHTML = " ";
      populateStartPageWithDataOfAuctions(filteredAuctions);
    } else {
      auktionDiv.className = "auktion-search";
      auktionDiv.innerHTML = "Inga hittade matchningar";
    }
  });
  searchInput.addEventListener("keypress", function(e) {
    var key = e.keyCode;
    if (key == 13) {
      let filteredAuctions = auctions.filter(value => value.Titel.toLowerCase().includes(searchInput.value.toLowerCase()) != 0);
      if (filteredAuctions.length != 0) {
        auktionDiv.className = "auktion-container";
        auktionDiv.innerHTML = " ";
        populateStartPageWithDataOfAuctions(filteredAuctions);
      } else {
        auktionDiv.className = "auktion-search";
        auktionDiv.innerHTML = "Inga hittade matchningar";
      }
    }
  });
}

// Funktion för att kunna sortera Auktionerna genom deras Slutdatum
function addAnEventListenerToOrderByEndDateButton(auctions) {
  let auktionDiv = document.getElementById("auktion-container");
  let endDateButton = document.getElementById("endDateButton");
  endDateButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let filteredAuctions = auctions.filter(value => value.Titel.toLowerCase().includes(searchInput.toLowerCase()) != 0);

    //Change to SlutDatum for opposite sort order
    function custom_sort(a, b) {
      return new Date(a.SlutDatum).getTime() - new Date(b.SlutDatum).getTime();
    }
    filteredAuctions.sort(custom_sort);

    if (filteredAuctions.length != 0) {
      auktionDiv.className = "auktion-container";
      auktionDiv.innerHTML = " ";
      populateStartPageWithDataOfAuctions(filteredAuctions);
    } else {
      auktionDiv.className = "auktion-search";
      auktionDiv.innerHTML = "Inga hittade matchningar";
    }
  });
}

//Funktion för att sortera Auktionern genom deras Utropspris
function addAnEventListenerToOrderByPrice(auctions) {
  let auktionDiv = document.getElementById("auktion-container");
  let priceButton = document.getElementById("priceButton");
  priceButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let filteredAuctions = auctions.filter(value => value.Titel.toLowerCase().includes(searchInput.toLowerCase()) != 0);

    //Change to price for opposite sort order
    function custom_sort(a, b) {
      return a.Utropspris - b.Utropspris;
    }
    filteredAuctions.sort(custom_sort);
    if (filteredAuctions.length != 0) {
      auktionDiv.className = "auktion-container";
      auktionDiv.innerHTML = " ";
      populateStartPageWithDataOfAuctions(filteredAuctions);
    } else {
      auktionDiv.className = "auktion-search";
      auktionDiv.innerHTML = "Inga hittade matchningar";
    }
  });
}

// Loopa igenom alla auktioner och lägg de in i varsin div med deras info
async function populateStartPageWithDataOfAuctions(auctions) {
  let auktionDiv = document.getElementById("auktion-container");
  for (let auction of auctions) {
    let content = document.createElement("div");
    content.setAttribute("class", "content");
    let title = JSON.stringify(auction.Titel).replace(/"/g, "");
    let description = JSON.stringify(auction.Beskrivning).replace(/"/g, "");
    let startDate = JSON.stringify(auction.StartDatum).replace(/"/g, "");
    let endDate = JSON.stringify(auction.SlutDatum).replace(/"/g, "");
    let startingPrice = JSON.stringify(auction.Utropspris).replace(/"/g, "");
    let auctionID = JSON.stringify(auction.AuktionID).replace(/"/g, "");

    let status = getAuctionStatus(startDate, endDate);

    let buttonName = "showBidsFor_" + auctionID;
    let button = "<button class='addAuktion' id=" + buttonName + ">Show bids</button>";

    let bidsInJSONFormat = await fetchBidForAuction(auctionID);
    let highestBid = 0;

    if (bidsInJSONFormat.length > 0) {

      highestBid = parseInt(JSON.stringify(bidsInJSONFormat.reduce(
        (a, b) => a.Summa > b.Summa
        ? a
        : b).Summa));
    }

    let text = "<h2>" + title + "</h2>" + "<p>" + description + "</p>" + "<p><span class='font-bold'>StartDatum:</span> " + startDate + "</p>" +
    "<p><span class='font-bold'>SlutDatum:</span> " + endDate + "</p>" + "<p><span class='font-bold'>Utropspris:</span> " + startingPrice + "kr</p>" + "<p class='status-open'><span class='font-bold'>Status:</span> " + status + "</p>" + button;
    content.innerHTML = text;
    auktionDiv.appendChild(content);

    addEventListenerForShowingBid(auctionID, buttonName);

    if (status === "Stängd") {
      let newText = "<h2>" + title + "</h2>" + "<p>" + description + "</p>" + "<p><span class='font-bold'>StartDatum:</span> " + startDate + "</p>" +
      "<p><span class='font-bold'>SlutDatum:</span> " + endDate + "</p>" + "<p><span class='font-bold'>Utropspris:</span> " + startingPrice + "kr</p>" + "<p><span class='font-bold'>Högsta Bud:</span> " + highestBid + "kr</p>" +
      "<p class='status-closed'><span class='font-bold'>Status:</span> " + status + "</p>";
      content.innerHTML = newText;
      auktionDiv.appendChild(content);
    }

  }
}
// Loopa igenom alla auktioner och lägg de in i varsin div med deras info
async function populateStartPageWithDataOfOpenAuctions(auctions) {
  let auktionDiv = document.getElementById("auktion-container");

    function custom_sort(a, b) {
      return new Date(a.SlutDatum).getTime() - new Date(b.SlutDatum).getTime();
    }
    auctions.sort(custom_sort);

  for (let auction of auctions) {
    let content = document.createElement("div");
    content.setAttribute("class", "content");
    let title = JSON.stringify(auction.Titel).replace(/"/g, "");
    let description = JSON.stringify(auction.Beskrivning).replace(/"/g, "");
    let startDate = JSON.stringify(auction.StartDatum).replace(/"/g, "");
    let endDate = JSON.stringify(auction.SlutDatum).replace(/"/g, "");
    let startingPrice = JSON.stringify(auction.Utropspris).replace(/"/g, "");
    let auctionID = JSON.stringify(auction.AuktionID).replace(/"/g, "");

    let status = getAuctionStatus(startDate, endDate);

    let buttonName = "showBidsFor_" + auctionID;
    let button = "<button class='addAuktion' id=" + buttonName + ">Show bids</button>";

    let bidsInJSONFormat = await fetchBidForAuction(auctionID);
    let highestBid = 0;

    if (bidsInJSONFormat.length > 0) {

      highestBid = parseInt(JSON.stringify(bidsInJSONFormat.reduce(
        (a, b) => a.Summa > b.Summa
        ? a
        : b).Summa));
    }

    let text = "<h2>" + title + "</h2>" + "<p>" + description + "</p>" + "<p><span class='font-bold'>StartDatum:</span> " + startDate + "</p>" +
    "<p><span class='font-bold'>SlutDatum:</span> " + endDate + "</p>" + "<p><span class='font-bold'>Utropspris:</span> " + startingPrice + "kr</p>" + "<p class='status-open'><span class='font-bold'>Status:</span> " + status + "</p>" + button;
    if (status != "Stängd") {
    content.innerHTML = text;
    auktionDiv.appendChild(content);
    addEventListenerForShowingBid(auctionID, buttonName);
    }  
  }
}

// Kolla om datum stämmer med Auktionens
function getAuctionStatus(startDate, endDate) {
  var currentdate = new Date();
  var startTime = Date.parse(startDate);
  var endTime = Date.parse(endDate);
  var status;
  if (currentdate < endTime && currentdate > startTime)
    status = "Öppen";
  else
    status = "Stängd";
  return status;
}

// Funktion för en knapp som visar Budhistoriken för Auktionen
function addEventListenerForShowingBid(auctionID, showBidsButton) {

  let auktionDiv = document.getElementById("auktion-container");
  let showBidsButtonRef = document.getElementById(showBidsButton);
  showBidsButtonRef.addEventListener("click", async function() {

    let auction = await fetchOneAuction(auctionID);
    let bidsInJSONFormat = await fetchBidForAuction(auctionID);
    console.log(bidsInJSONFormat);
    var bidsText = "";

    for (let bid of bidsInJSONFormat) {
      bidsText += "<br>" + JSON.stringify(bid.Summa) + "kr";
    }

    /* auktionDiv.appendChild(input); */
    auktionDiv.innerHTML = " ";
    auktionDiv.className = "auktion-container2";
    auktionDiv.innerHTML = "<h3>Here are all the bids for <br><span class='font-bold'>" + auction.Titel + "</span>" + "</h3>" + bidsText;

    var placeBidInput = document.createElement("input");
    placeBidInput.type = "text";
    placeBidInput.id = "placebid";
    placeBidInput.placeholder = "Add your bid here";
    document.getElementById("bid-form").appendChild(placeBidInput);

    var bidButton = document.createElement("Button"); // Create a <button> element
    var bidButtonText = document.createTextNode("Add bid"); // Create a text node
    bidButton.className = "bidButton";
    bidButton.appendChild(bidButtonText); // Append the text to <button>
    document.getElementById("bid-form").appendChild(bidButton);

    addBidButtonEventListener(bidButton, auctionID, placeBidInput);
  });

}

// Funktionen för att kunna lägga bud till Auktioner
function addBidButtonEventListener(bidButton, auctionID, placeBidInput) {
  bidButton.addEventListener("click", async function() {

    let auktionDiv = document.getElementById("auktion-container");

    let auction = await fetchOneAuction(auctionID);
    let bidsInJSONFormat = await fetchBidForAuction(auctionID);

    let bidsText = "";
    for (let bid of bidsInJSONFormat) {

      bidsText += "<br>" + JSON.stringify(bid.Summa) + "kr";
    }

    let bidValue = document.getElementById("placebid").value;

    let highestBid = 0;

    if (bidsInJSONFormat.length > 0) {

      highestBid = parseInt(JSON.stringify(bidsInJSONFormat.reduce(
        (a, b) => a.Summa > b.Summa
        ? a
        : b).Summa));
    }

    let sortedBid = bidsInJSONFormat.sort((a, b) => a.Summa < b.Summa);

    console.log(sortedBid);

    if (bidValue > highestBid) {

      addBid(bidValue, auctionID);
      auktionDiv.innerHTML = "Here are all the bids for <span class='font-bold'>" + auction.Titel + "</span>" + bidsText + "<br>" + "Your bid is" + " " + bidValue + "kr";
    } else if (bidValue==highestBid){
      auktionDiv.innerHTML = "Here are all the bids for <span class='font-bold'>" + auction.Titel + "</span>" + "<br>" + "Your bid" + " " + bidValue + "kr  " + "is equal to the highest bid which is " + highestBid + "kr";
    }
    else {
      auktionDiv.innerHTML = "Here are all the bids for <span class='font-bold'>" + auction.Titel + "</span>" + "<br>" + "Your bid" + " " + bidValue + "kr  " + "is lower than the highest bid which is " + highestBid + "kr";
    }

    document.getElementById("placebid").value = "";
  });
}

//Hämta ut specifik auction beronde på AuktionID
async function fetchOneAuction(id) {
  var urlForGettingAuction = "https://nackowskis.azurewebsites.net/api/auktion/400/" + id;

  let auctionData = await fetch(urlForGettingAuction);
  let auctionInJsonFormat = await auctionData.json();
  return auctionInJsonFormat;
}

//Hämta ut alla Auktoner
async function fetchAuctions() {
  var urlForGettingAuction = "https://nackowskis.azurewebsites.net/api/auktion/400/";

  let auctionData = await fetch(urlForGettingAuction);
  let auctionInJsonFormat = await auctionData.json();
  console.log(auctionInJsonFormat);
  return auctionInJsonFormat;
}

//Hämta ut alla bud för Autkionen
async function fetchBidForAuction(auction) {
  var urlForGettingBid = "https://nackowskis.azurewebsites.net/api/bud/400/" + auction;

  let bidForAuction = await fetch(urlForGettingBid);
  let bidInJsonFormat = await bidForAuction.json();

  return bidInJsonFormat;
}

//Skapa Auction genom javascript
function createAuction(titel, startDate, endDate, pris, beskrivning) {
  fetch("https://nackowskis.azurewebsites.net/api/auktion/400/", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      AuktionID: 80,
      Beskrivning: beskrivning,
      Gruppkod: 400,
      SlutDatum: endDate  + " T00:00:00",
      StartDatum: startDate + " T00:00:00",
      Titel: titel,
      Utropspris: pris
    })
  }).then(res => res.json()).then(res => console.log(res));
}

//Ta bort Auktion beronde på AuktionID
function removeAuction(id) {
  fetch("https://nackowskis.azurewebsites.net/api/auktion/400/" + id, {
    method: "DELETE",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(res => console.log(res));
}

//Skapa bud genom javascript
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

// Ta bort bud beronde på budID
function removeBid(id) {
  fetch("https://nackowskis.azurewebsites.net/api/bud/400/" + id, {
    method: "Delete",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(res => console.log(res));
}

populateListOfAuctionsInDiv();
