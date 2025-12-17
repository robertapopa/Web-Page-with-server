var x=0,y=0,x2=0,y2=0;
function f(){
    console.log("hello");
    setInterval(g,1000);
    document.getElementById("urlPag").innerHTML=window.location.href;
    navigator.geolocation.getCurrentPosition((position)=>{
        document.getElementById("loc").innerHTML =
        "Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude; 
    })
    document.getElementById("browser").innerHTML=navigator.appVersion;
}
function g(){
    let elem=document.getElementById("dataMea");
    elem.innerHTML=new Date();
}
function draw(event){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    let rect=canvas.getBoundingClientRect();
    if(x==0 && y==0){
        x=event.clientX-rect.left;
        y=event.clientY-rect.top;
    }else{
        x2=event.clientX-rect.left;
        y2=event.clientY-rect.top;
        if(x2>x){
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.rect(x,y,x2-x,y2-y);
            console.log(x,y)
            ctx.strokeStyle=document.getElementById("Culoare-contur").value;
            ctx.strokeRect(x,y,x2-x,y2-y);
            ctx.fillStyle = document.getElementById("Culoare-desen").value;
            ctx.fill();
        }else{
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.rect(x2,y,x-x2,y2-y);
            console.log(x,y)
            ctx.strokeStyle=document.getElementById("Culoare-contur").value;
            ctx.strokeRect(x2,y,x-x2,y2-y);
            ctx.fillStyle = toString(document.getElementById("Culoare-desen"));
            ctx.fill();
        }
        x=0;
        y=0;
    }
}
function schimbaContinut(resursa,jsFisier,jsFunctie){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("continut").innerHTML =this.responseText;
      if (jsFisier) {
        var elementScript = document.createElement('script');
        elementScript.onload = function () {
            console.log("hello");
            if (jsFunctie) {
                window[jsFunctie]();
            }
        };
        elementScript.src = jsFisier;
        document.head.appendChild(elementScript);
    } else {
        if (jsFunctie) {
            window[jsFunctie]();
        }
    }
    }
  };
  xhttp.open("GET", resursa+".html", true);
  xhttp.send();
}
