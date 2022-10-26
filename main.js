//variables
var saveCodeVersion = 2;
var saveText = 0;
var icecream = 0;
var chocalateIcecream = 0;
var icecreamEarnedPerSecond = 0;
//
if (document.cookies != null){
  loadSave(document.cookies);
}

//objects/lists
const saveData = {
  versionOfSave: saveCodeVersion,
  icecream: 0,
  icecreamPerSecond: 0,
  buildings: {"null": "null",},
}
var yourBuildings =
{
  "grandpas": 1,
  "icecream machine": 1,
  "milk farm and proccesing room": 1,
  "icecream factory": 1,
}

const buildingStartCost =
{
  "grandpas": 5,
  "icecream machine": 50,
  "milk farm and proccesing room": 300,
  "icecream factory": 1500,
}

const buildingIcecreamPerSecond =
{
  "grandpas": 0.3,
  "icecream machine": 3,
  "milk farm and proccesing room": 6,
  "icecream factory": 48,
}


//function
function buyNewBuilding(buildingName) {  //spaghett code I forgot how it works
  console.log("buying...")
  if (icecream >= buildingStartCost[buildingName] * yourBuildings[buildingName]) {
    console.log("successfuly bought: " + buildingName);
    icecream -= buildingStartCost[buildingName] * yourBuildings[buildingName];
    yourBuildings[buildingName] += 1;
    icecreamEarnedPerSecond += buildingIcecreamPerSecond[buildingName];
    renderIcecreamAmount()
    renderBuilding(buildingName)
  }
}

function renderIcecreamAmount() {
  
  document.getElementById("icecreamAmount").innerHTML = "Icecream: ".concat(Math.round(icecream));
}

function renderBuilding(buildingName) { //spaghett code I forgot how it works
  let yourBuildingsLocalDisplay = yourBuildings[buildingName] - 1;
  document.getElementById(buildingName).innerHTML = buildingName + "--- cost in icecream: " + buildingStartCost[buildingName] * yourBuildings[buildingName] + " how many you own: " + yourBuildingsLocalDisplay;
}

function icecreamclicked() {
  icecream += 1;
  renderIcecreamAmount();
}

function clicktest() {
  console.log("Click")
}





function save(showOutput){
  

  saveData.icecream = icecream;
  saveData.buildings = yourBuildings;
  saveData.icecreamPerSecond = icecreamEarnedPerSecond;
  saveText = btoa( JSON.stringify( saveData ) );

}
  
  
  function loadSave(save){
  let decodedSave = atob(save)
  let loadedSave = JSON.parse(decodedSave)
    yourBuildings = loadedSave.buildings;
    icecream = loadedSave.icecream;
    icecreamEarnedPerSecond = loadedSave.icecreamPerSecond;
      
    
  startRender()
  }

  function loadSaveButton(){

   let saveDataFromBox = document.getElementById("textBoxForSave").value
   loadSave(saveDataFromBox)
   document.getElementById("textBoxForSave").value = ""
  }
  
  function showSaveInSaveBox() {
   save()
   document.getElementById("saveCode").value = saveText;
   localStorage.setItem('Data', saveText)
  }


  function autoClick() {
    icecream+=icecreamEarnedPerSecond;
    renderIcecreamAmount()
  }





//loops
function loopHandler(){

  setInterval(function() {
    autoClick()
    showSaveInSaveBox()
    save()
    localStorage.setItem('Data', saveText)

  }, 1000);

}

//game startup stuff


//render
function startRender(){
renderIcecreamAmount()
renderBuilding("grandpas")
renderBuilding("icecream machine")
renderBuilding("milk farm and proccesing room")
renderBuilding("icecream factory")

}

function deleteSave() {

  if (confirm("Delete save?")) {
    console.log("Deleted save")
    loadSave('eyJ2ZXJzaW9uT2ZTYXZlIjoyLCJpY2VjcmVhbSI6MCwiaWNlY3JlYW1QZXJTZWNvbmQiOjAsImJ1aWxkaW5ncyI6eyJncmFuZHBhcyI6MSwiaWNlY3JlYW0gbWFjaGluZSI6MSwibWlsayBmYXJtIGFuZCBwcm9jY2VzaW5nIHJvb20iOjEsImljZWNyZWFtIGZhY3RvcnkiOjF9fQ')
  } else {
    console.log("Delete save canceled")
  }

  
}


if (localStorage.getItem('Data') == null){
  console.log("No save data detected")
}else{
  loadSave(localStorage.getItem('Data'));
}
startRender()
//start loops
loopHandler()


