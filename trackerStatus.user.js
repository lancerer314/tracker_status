// ==UserScript==
// @name         Tracker status
// @version      0.1.0
// @namespace    https://github.com/lancerer314/tracker_status
// @description  display tracker status  from TrackerStatus API.
// @include      https://redacted.ch/
// @include      https://redacted.ch/index.php
// @grant        GM.xmlHttpRequest
// @grant    		 GM.getValue
// @grant    		 GM.setValue
// ==/UserScript==
// inspired from https://greasyfork.org/en/scripts/395736-is-it-down

let structure_msg = "Redacted site structure not recognized by tracker_status user script, please update it or notify dev.";
let stats_ul = document.getElementById('userinfo_stats');
if(!stats_ul){
  alert(structure_msg);
}
const DomNodeId = "stats_services"
let response = null;
var messageDiv =  document.createElement("DIV");
messageDiv.setAttribute("id", "services_detail_container");
let rect = document.getElementById('stats_seeding').getBoundingClientRect();
messageDiv.style.cssText=`display:none;position:absolute;width:200px;overflow: auto;z-index:200;background-color:black`;
messageDiv.style.top=rect.bottom+"px";
messageDiv.style.left=rect.left+"px";
document.body.prepend(messageDiv);

  
//sometimes the DOM node has already been set
let stats_container = document.getElementById("stats_services");
if(stats_container){
  if(stats_ul.contains(stats_container)){
    stats_ul.removeChild(stats_container);
  } else {
    alert(structure_msg);
  }
}
stats_container =  document.createElement("li");
stats_container.setAttribute("id", "stats_services");
stats_container.setAttribute("class", "tooltip");
stats_container.innerHTML='Services:<span class="stat">-</span>'
stats_ul.prepend(stats_container);
stats_container.addEventListener('mouseover', eventHandler, false);
stats_container.addEventListener('mouseout', eventHandler, false);
stats_container.addEventListener('click', eventHandler, false);
  

function eventHandler(event) {
  if(event.target.id!=DomNodeId){return;}
  switch(event.type) {
    case "mouseover":
      messageDiv.style.display="block";
      break;
    case "mouseout":
      messageDiv.style.display="none";
      break;
    case "click":
      var newtab = window.open("https://red.trackerstatus.info/", '_blank');
      newtab.focus();
      break
  } 
}

GM.xmlHttpRequest({
  method: "POST",
  url: 'https://red.trackerstatus.info/api/all/',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(res) { 
    let overallOk=true;
    let htmlMessage = "<ul>";
    let response = JSON.parse(res.responseText);
    Object.entries(response).forEach(service => {
      console.log(service[0]+":"+service[1].Status);
      if(service[1].Status === "0"){
        overallOk=false;
        htmlMessage+=`<li style=\"color:red\">${service[0]}: Down</li>`;
      } else {
        if(service[1].Latency){
          if(service[1].Latency.endsWith('ms')){
            htmlMessage+=`<li style=\"color:green\">${service[0]}: Up Latency:${service[1].Latency}</li>`;
          } else {
            htmlMessage+=`<li style=\"color:green\">${service[0]}:${service[1].Latency}</li>`;
          }
        }
      }
    })
    stats_container.style.color=overallOk?'green':'red';
    stats_container.innerHTML=`Services:<span class="stat">${overallOk?'Ok':'Ko'}</span>`
    messageDiv.innerHTML=htmlMessage+"</ul>";
  }
});
