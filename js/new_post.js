const postLocation = document.querySelector(".location-field");
const ACCESS_TOKEN = 'pk.8abb152d62923fd639258172ddc3175f';


const success = (position) => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    GetCurrentLocation(latitude, longitude);
};

const err = ()=>{
    postLocation.setAttribute("value","Unable to find location");
}

navigator.geolocation.getCurrentPosition(success,err);


async function GetCurrentLocation(latitude, longitude) {
    const response = await fetch("https://us1.locationiq.com/v1/reverse?key="
        + ACCESS_TOKEN + "&lat=" + latitude + "&lon=" + longitude + "&format=json");
    const data= await response.json();
    console.log(data.address);
    const address= await data.address
    const city =(await address.city)? await address.city:await address.state_district;
    DisplayLocation(city , await address.country, await address.postcode)
}

const DisplayLocation=(city,country,pin)=>{
    postLocation.setAttribute("value",city+", "+country+", "+pin);
}