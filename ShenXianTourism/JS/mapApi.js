const progressDone = document.querySelectorAll('#progress-done');
progressDone.forEach(progress => {
  progress.style.width = progress.getAttribute('data-done') + '%';
});

let spot= getMsg();
spot=spot.substring(6,spot.length-5);
console.log(spot);

let map = new BMap.Map(document.getElementById('mapShow'));
map.centerAndZoom(spot,15);
map.enableScrollWheelZoom(true);
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());  
map.addControl(new BMap.MapTypeControl());

let opts = {
  width: 250,     
  height: 100,    
  title: spot  
}
let infoWindow = new BMap.InfoWindow(null, opts);  
document.getElementById('mapShow').addEventListener("click", function(){          
  map.openInfoWindow(infoWindow, point); 
}); 
