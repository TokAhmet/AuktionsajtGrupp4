

async function getData(){

let auktionResponse = await fetchData("http://nackowskis.azurewebsites.net/api/auktion/400/");
let budResponse = await fetchData("http://nackowskis.azurewebsites.net/api/bud/400/1");
console.log(auktionResponse);
console.log(budResponse);

}

async function fetchData(url){

	let promise = await fetch(url);
	let data = await promise.json();

	return data;
}

getData();


