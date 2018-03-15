async function populateListOfAuctionsInDiv() {

  let auctions = await fetchAuctions();

  populateStartPageWithDataOfAuctions(auctions);

  addAnEventListenerToOrderByEndDateButton(auctions);
  addAnEventListenerToOrderByStartDateButton(auctions);
  addAnEventListenerToSearchButton(auctions);
  addAnEventListenerToCreateFunction();

}

function addAnEventListenerToCreateFunction() {


    let titelInput = document.getElementById("adminTitel").value;
    let startDateInput = document.getElementById("adminStartDate").value;
    let endDateInput = document.getElementById("adminEndDate").value;
    let prisInput = document.getElementById("adminPris").value;
    let beskrivningInput = document.getElementById("adminBeskrivning").value;


    createAuction(titelInput,startDateInput,endDateInput,prisInput,beskrivningInput);


}

function addAnEventListenerToOrderByEndDateButton(auctions) {
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

function addAnEventListenerToOrderByStartDateButton(auctions) {
  let auktionDiv = document.getElementById("auktion-container");
  let startDateButton = document.getElementById("startDateButton");
  startDateButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let filteredAuctions = auctions.filter(value => value.Titel.includes(searchInput));

    //Change to StartDatum for opposite sort order
    function custom_sort(a, b) {
      return new Date(a.StartDatum).getTime() - new Date(b.StartDatum).getTime();
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

function addAnEventListenerToSearchButton(auctions) {
  let auktionDiv = document.getElementById("auktion-container");
  let searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let filteredAuctions = auctions.filter(value => value.Titel.includes(searchInput));

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


function addEventListenerForShowingBid(auctionID, showBidsButton) {


  let auktionDiv = document.getElementById("auktion-container");
  let showBidsButtonRef = document.getElementById(showBidsButton);

   showBidsButtonRef.addEventListener("click", async function() {

    var bidsInJSONFormat = await fetchBidForAuction(auctionID);
    console.log(bidsInJSONFormat);
    var bidsText = "";

    for (let bid of bidsInJSONFormat) {
      bidsText += "<br>" + JSON.stringify(bid.Summa) + "kr";
    }

    /* auktionDiv.appendChild(input); */
    auktionDiv.innerHTML = " ";
    auktionDiv.className = "auktion-container2";
    auktionDiv.innerHTML = "<h3>Here are all the bids for auction" + auctionID + ":</h3>" + bidsText;

    var placeBidInput = document.createElement("input");
    placeBidInput.type = "text";
    placeBidInput.id = "placebid";
    document.getElementById("bid-form").appendChild(placeBidInput);

    var bidButton = document.createElement("Button"); // Create a <button> element
    var bidButtonText = document.createTextNode("Add bid"); // Create a text node
    bidButton.className = "bidButton";
    bidButton.appendChild(bidButtonText); // Append the text to <button>
    document.getElementById("bid-form").appendChild(bidButton);
    addBidButtonEventListener(bidButton, auctionID, placeBidInput);
  });

}


function addBidButtonEventListener(bidButton, auctionID, placeBidInput) {
  bidButton.addEventListener("click", async function() {

    let auktionDiv = document.getElementById("auktion-container");

    var bidsInJSONFormat = await fetchBidForAuction(auctionID);

    let bidsText = "";
    for (let bid of bidsInJSONFormat) {

      bidsText += "<br>" + JSON.stringify(bid.Summa);
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
      auktionDiv.innerHTML = "Here are all the bids for auction " + auctionID + ":" + bidsText + "<br>" + "Your bid is" + " " + bidValue;
    } 
    else {
      auktionDiv.innerHTML = "Here are all the bids for auction " + auctionID + ":" + "<br>" + "Your bid" + " " + bidValue + " " + "is lower than the highest bid which is " + highestBid;
    }

    document.getElementById("placebid").value = "";

  });


}

function populateStartPageWithDataOfAuctions(auctions) {
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
<<<<<<< HEAD

    var currentDate = new Date();
    var endTime = Date.parse(endDate);
    
    
	var buttonName = "showBidsFor_" + auctionID;
=======
    var currentdate = new Date();
    var buttonName = "showBidsFor_" + auctionID;
>>>>>>> master
    var button = "<button class='searchButton' id=" + buttonName + ">Show bids</button>";
    
    var text = "<h2>" + title + "</h2>" + button + "<p>" + description + "</p>" + "<p><span class='font-bold'>StartDatum:</span> " + startDate + "</p>" + "<p><span class='font-bold'>SlutDatum:</span> " + endDate + "</p>" + "<p><span class='font-bold'>Summa:</span> " + startingPrice + "kr</p>" + "<p><span class='font-bold'>Status:</span> " + status + "</p>";

    content.innerHTML = text;

    auktionDiv.appendChild(content);
    addEventListenerForShowingBid(auctionID, buttonName);

    if (getAuctionStatus(endDate) === "Stängd") {
      var newText = "<h2>" + title + "</h2>" + "<p>" + description + "</p>" + "<p><span class='font-bold'>StartDatum:</span> " + startDate + "</p>" + "<p><span class='font-bold'>SlutDatum:</span> " + endDate + "</p>" + "<p><span class='font-bold'>Summa:</span> " + startingPrice + "kr</p>" + "<p><span class='font-bold'>Status:</span> " + status + "</p>";
      content.innerHTML = newText;

      auktionDiv.appendChild(content);
    }


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
function createAuction(titel,startDate,endDate,pris,beskrivning) {
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
      SlutDatum: endDate + "T00:00:00",
      StartDatum: startDate + "T00:00:00",
      Titel: titel,
      Utropspris: pris
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
    body: JSON.stringify({AuktionID: auction, Summa: bid})
  }).then(res => res.json()).then(res => console.log(res));
}

// Ta bort bud
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
