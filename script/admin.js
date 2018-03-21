
async function setupAdmin() {
  addAnEventListenerToCreateAuction();
  addAnEventListenerToRemoveAuction();
}

//Funktion för att skapa en Auktion genom Admin-sidan
function addAnEventListenerToCreateAuction() {

  let addAuktion = document.getElementById("addAuktion");

    addAuktion.addEventListener("click", function() {

    let titelInput = document.getElementById("adminTitel").value;
    let startDateInput = document.getElementById("adminStartDate").value;
    let endDateInput = document.getElementById("adminEndDate").value;
    let prisInput = document.getElementById("adminPris").value;
    let beskrivningInput = document.getElementById("adminBeskrivning").value;

    createAuction(titelInput, startDateInput, endDateInput, prisInput, beskrivningInput);

  });
}

function addAnEventListenerToRemoveAuction() {

  let removeAuktion = document.getElementById("removeAuktion");

  removeAuktion.addEventListener("click", async function() {

      let removeInput = document.getElementById("adminRemove").value;
      removeAuction(removeInput);

    });
    
}

async function fetchBidForAuction(auction) {
  var urlForGettingBid = "https://nackowskis.azurewebsites.net/api/bud/400/" + auction;

  let bidForAuction = await fetch(urlForGettingBid);
  let bidInJsonFormat = await bidForAuction.json();

  return bidInJsonFormat;
}

async function fetchAuctions() {
  var urlForGettingAuction = "https://nackowskis.azurewebsites.net/api/auktion/400/";

  let auctionData = await fetch(urlForGettingAuction);
  let auctionInJsonFormat = await auctionData.json();
  console.log(auctionInJsonFormat);
  return auctionInJsonFormat;
}

function createAuction(titel, startDate, endDate, pris, beskrivning) {
  fetch("https://nackowskis.azurewebsites.net/api/auktion/400/", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Beskrivning: beskrivning,
      Gruppkod: 400,
      SlutDatum: endDate  + " T00:00:00",
      StartDatum: startDate + " T00:00:00",
      Titel: titel,
      Utropspris: pris
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


setupAdmin();
