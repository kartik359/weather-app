const searchbtn=document.getElementById('searchbtn');
const inputcity=document.getElementById('inputloc');
const locationbtn=document.getElementById('lower');
const Access_Key='b4284ca5b2b60d05ec943bb0db8383c9';
inputcity.addEventListener('click',()=>{
document.getElementById('parent').innerHTML='';
})
searchbtn.addEventListener('click',()=>{
    let value=inputcity.value;
    fetchdatabysearch(value);
    inputcity.value='';
})
async function fetchdatabysearch(city)
{  try{
   let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Access_Key}&units=metric&lang{en}`);
   let result=await response.json();
   console.log(result);
   displaydata(result);
}
catch(error)
{
    document.getElementById('parent').innerHTML='<h1 style="text-align:center">data not found</h1>'
}
}

function displaydata({main,name,sys,weather,wind})
{
    const parent=document.getElementById('parent');
    parent.innerHTML=` <div class="seconddiv">
        <h1 id="tempreture">${main.temp} &#8451 </h1>
        <h1 id="city">${name}</h1>
        <p>(${sys.country})</p>
        <p>${weather[0].main} </p>
    </div>
    <div class="thirddiv">
        <div class="left">
            <h2 id="wind">Wind Speed</h2>
            <h4 id="windval"> ${Math.round(wind.speed*3.6)} km&#47;h</h4>
        </div>
        <div class="middle">
            <h2 id="pressure">Pressure</h2>
            <h4 id="pressureval">${Math.round(main.pressure*0.0145038)} psi</h4>
        </div>
        <div class="right">
            <h2 id="Humidity">Humidity</h2>
            <h4 id="pressureval">${main.humidity} %</h4>
        </div>
    </div>`
}

async function fetchdatabycord(lat,long)
{
     try{
   let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={Access_Key}&units=metric`);
   let result=await response.json();
   console.log(result);
   displaydata(result);
}
catch(error)
{
    document.getElementById('parent').innerHTML='<h1 style="text-align:center">data not found</h1>'
}
}
locationbtn.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition((location)=>{
        let lat=location.coords.latitude;
        let long=location.coords.longitude;
        fetchdatabycord(lat,long);
    })
})