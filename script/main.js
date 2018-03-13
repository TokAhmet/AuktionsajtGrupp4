

var url = "https://nackowskis.azurewebsites.net/api/auktion/400/";

async function getData(){

let auktionResponse = await fetchData("https://nackowskis.azurewebsites.net/api/auktion/400/4/");
let budResponse = await fetchData("https://nackowskis.azurewebsites.net/api/bud/400/1/");

document.getElementById("auktion").innerHTML = auktionResponse.Titel;

console.log(auktionResponse);
console.log(budResponse);
}

async function fetchData(url){

	let promise = await fetch(url);
	let data = await promise.json();

	return data;
}


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





