var lat;
var long;
const url1 = "https://api.geoapify.com/v1/geocode/reverse?";
var url2;  
var url;  
const result = document.getElementById("result");



if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position)=> {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat, long); 

    url2 = `lat=${lat}&lon=${long}&apiKey=0d7e0434effa4ea3825e16245d95ba24`;
    url = url1 + url2;

    // Move the fetch call inside the callback
    getLoc();
  });
}

var data;
var getLoc = async () => {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

     data = await response.json();
    console.log(data);

     country=data.features[0].properties.country;
     statename=data.features[0].properties.state;
     countryCode=data.features[0].properties.country_code;
     stateCode=data.features[0].properties.state_code;
     district=data.features[0].properties.state_district;
     county=data.features[0].properties.county;
     city=data.features[0].properties.city;
     street=data.features[0].properties.street;
     postCode=data.features[0].properties.postcode;
     address=data.features[0].properties.formatted;
     timeZone=data.features[0].properties.timezone;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
 
};


let locationP=document.querySelector(".Location p");
let submit=document.querySelector(".Location button");


let check = 0;

submit.addEventListener("click", () => {
  if (check === 0) {
    locationP.innerHTML = locationP.innerHTML + ":- " + address + " || time zone:- " + timeZone.name
      + " "+timeZone.offset_STD ;
    
    result.innerHTML = ":- " + address + " || time zone:- " + timeZone.name
    + " "+timeZone.offset_STD ;
    check = 1;
  } else {
    locationP.innerHTML = "";
    check = 0;
    result.innerHTML = "";

  }
});

let loader=document.querySelector(".loader");

window.addEventListener("load",(e)=>{
  loader.removeAttribute("class","loader");
})

async function mean(element) {
  let but=element.target;
  but.innerHTML="loading";
  

  let word = document.getElementById("word").value.toLowerCase();
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  let final_url = url + word;

  try {
    let response = await fetch(final_url);
    let data = await response.json();
    console.log(data);
    console.log(data[0].meanings[0].definitions[0].definition);
    result.innerHTML = data[0].meanings[0].definitions[0].definition;

    but.innerHTML="check";
  } catch(error) {
    console.error("Error:", error);
    result.innerHTML = "No result found";
    but.innerHTML="check";
  }
}





