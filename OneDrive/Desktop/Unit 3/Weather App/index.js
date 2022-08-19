
//const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=9e43504eefccc816d0cc3ecaf0376cac";
var d=new Date();
const month = d.getMonth();
        const date1 = d.getDate();
        console.log(month,date1)


function getData(){
    let city = document.getElementById("city").value;
    //console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9e43504eefccc816d0cc3ecaf0376cac`;
    
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        console.log(res);
        append(res)
    })
    .catch(function(err){
        console.log(err)
        document.getElementById("container1").innerHTML=null;
        
    })

}

function append(data){
    let container1 = document.getElementById("container1");
    //container1.innerHTML=null;

    let containerabove = document.getElementById("containerabove");
    containerabove.innerHTML=null;
    var weekday=new Array(7);
        weekday[0]="Sunday";
        weekday[1]="Monday";
        weekday[2]="Tuesday";
        weekday[3]="Wednesday";
        weekday[4]="Thursday";
        weekday[5]="Friday";
        weekday[6]="Saturday";
        

        var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        
        var d=new Date();
        var month = d.getMonth();
        let realmm = mm[month]
        const date1 = d.getDate();
        console.log(month,date1)
        var x = (d.getDay());
        var y = x-1;
        console.log(y)
    let date = document.createElement("h4"); 
    date.innerText= date1 +" " + realmm;

    let days = document.createElement("h4"); 
    days.innerText= (weekday[x++]);
    containerabove.append(date,days);
    console.log(data)
    let containerbelow = document.getElementById("containerbelow");
    let map = document.getElementById("gmap_canvas")
    containerbelow.innerHTML=null;
    
    let city = document.createElement("p"); 
    city.innerText= `City : ${data.name} ${data.sys.country}`;

    let cityi = document.createElement("img"); 
    cityi.src= "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    cityi.setAttribute("id","cityi")
    let mintemp = document.createElement("p");
    mintemp.innerText= `Min temp : ${Math.floor(data.main.temp_min-273)}\u00B0C`;

    let maxtemp = document.createElement("p");
    maxtemp.innerText=`Max temp : ${Math.floor(data.main.temp_max-273)}\u00B0C`;

    let temp = document.createElement("p");
    temp.innerText=`Temp : ${Math.floor(data.main.temp-273)}\u00B0C`;

    let wind = document.createElement("p");
    wind.innerText=`Wind : ${data.wind.speed} km/h`;
    let sunrise = document.createElement("p");
    let unixTime = data.sys.sunrise;
            let xdate = new Date(unixTime * 1000);
            console.log("date",xdate)
            var hours = xdate.getHours();
            var minutes = "0" + xdate.getMinutes();
            var seconds = "0" + xdate.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            sunrise.innerText = `Sunrise  : ${formattedTime}`;

    let sunset = document.createElement("p");
        let unixTime1 = data.sys.sunset;
            let xdate1 = new Date(unixTime1 * 1000);
            console.log("date",xdate1)
            var hours = xdate1.getHours();
            var minutes = "0" + xdate1.getMinutes();
            var seconds = "0" + xdate1.getSeconds();
            var formattedTime1 = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            sunset.innerText = `Sunset  : ${formattedTime1}`;
    
    //        sunset.innerText=`Sunset : ${data.sys.sunset}`;

    

    containerbelow.append(city,cityi,mintemp,maxtemp,temp,wind,sunrise,sunset)
    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    console.log(map.src)

    const url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current&appid=9e43504eefccc816d0cc3ecaf0376cac`

    fetch(url1)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
       getseven(res)
        console.log(res);
        
    })
    .catch(function(err){
        console.log(err)
    })
}

function getDataLocation(lat,lon){

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9e43504eefccc816d0cc3ecaf0376cac`;
    
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        console.log(res);
        append(res)
    })
    .catch(function(err){
        console.log(err)
    })

}


function getweather(){

    navigator.geolocation.getCurrentPosition(success);

    function success(position){
        let crd = position.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      getDataLocation(crd.latitude,crd.longitude)
    }
    
}

function getseven(res){
    containerseven.innerHTML=null
    var weekday=new Array(7);
        weekday[0]="Monday";
        weekday[1]="Tuesday";
        weekday[2]="Wednesday";
        weekday[3]="Thursday";
        weekday[4]="Friday";
        weekday[5]="Saturday";
        weekday[6]="Sunday";

        var d=new Date();
        console.log(d)
        var x = (d.getDay());

        
    res.daily.map(function(elem,index){
        
        if(x==7){
            x=0;
        }
        
        //console.log("Today is " + weekday[x]);

        let container2 = document.getElementById("containerseven");
        let div  = document.createElement("div");
        div.setAttribute("id","div")
        let week = document.createElement("h3");
        
            week.innerText=weekday[x++]
            week.setAttribute("id","week")
        
        let img = document.createElement("img"); 
        img.src= "http://openweathermap.org/img/wn/" + elem.weather[0].icon + ".png";
        img.setAttribute("id","img")
        let mintemp = document.createElement("p");
        mintemp.innerText= `${Math.floor(elem.temp.min-273)}\u00B0C`;
        mintemp.setAttribute("id","mintemp")
        let maxtemp = document.createElement("p");
        maxtemp.innerText=`${Math.floor(elem.temp.max-273)}\u00B0C`;
        maxtemp.setAttribute("id","maxtemp")
        div.append(week,img,maxtemp,mintemp)
         
        container2.append(div)
        
    })
    d++;
}
