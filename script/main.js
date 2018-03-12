

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


