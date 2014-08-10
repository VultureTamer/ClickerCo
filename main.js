var gold = 0;
var clicks = 0;
var ticks = 0;
var ticklength = 1000;
var incomepertick = 0;
var incomeperclick = 1; 



// workforce---------------------------------------------------------------------


var upgradedudecost = 1000;
var dudeincome = 0.1;

function DudeType(type){
	this.type = type;
	this.bought = 0;
	this.total = 0;
	this.trickled = 0;
	this.cost = 1;
	this.costid = String(this.type)+ "Cost" ;
	this.updateCost = function() {
		this.cost = Math.floor(100*this.cost*1.2)/100;	
		document.getElementById(this.costid).innerHTML = numeral(this.cost).format('0.00a');
	};
};


var dude = new DudeType('dude');
var betterdude = new DudeType('betterdude');
var superdude = new DudeType('superdude');
var bestdude = new DudeType('bestdude');
var Kay = new DudeType('Kay');





//equipment------------------------------------------------------------------------

var mouseincome = 0.2;

var mouse = {
	bought : 0,
	trickled : 0,
	total : 0,
	cost : 25
};
var cat = {
	bought : 0,
	trickled : 0,
	total : 0,
	cost : 2500
};
var dog = {
	bought : 0,
	trickled : 0,
	total : 0,
	cost : 20000
};
var hotdog = {
	bought : 0,
	trickled : 0,
	total : 0,
	cost : 3000000
};

//gameclock---------------------------	
var tickinterval = window.setInterval(tick,ticklength);
//---------------------------------------

function initializedudes(){
	dude.total = 0;
	dude.bought = 0;
	dude.trickled = 0;
	dude.cost = 1;
	betterdude.total = 0;
	betterdude.bought = 0;
	betterdude.trickled = 0;
	betterdude.cost = 500;
	superdude.total = 0;
	superdude.bought = 0;
	superdude.trickled = 0;
	superdude.cost = 15000;
	bestdude.total = 0;
	bestdude.bought = 0;
	bestdude.trickled = 0;
	bestdude.cost = 1500000;
	Kay.total = 0;
	Kay.bought = 0;
	Kay.trickled = 0;
	Kay.cost = 100000000
	dude.updateCost();
	betterdude.updateCost();
	superdude.updateCost();
	bestdude.updateCost();
	Kay.updateCost();
	updateDudes();
};


 
 //-------------------------------------------------------------------------

 function updateIncomePerTick(){
	incomepertick = Math.floor((dudeincome*dude.total)*100)/100;
	document.getElementById('goldpertick').innerHTML = numeral(incomepertick).format('0.00a');
 };

 function updateIncomePerClick(){
	incomeperclick = Math.floor((1+mouseincome*mouse.total)*100)/100;
	document.getElementById('goldperclick').innerHTML = numeral(incomeperclick).format('0.00a');
 };
 
 function updateGold(income){
	 gold = Math.floor((gold + income)*100)/100;
	 document.getElementById('gold').innerHTML = numeral(gold).format('0.00a');
 };

//workforce-------------------------------------------------------------------------

function buydude(dudetype){
	if (gold >= dudetype.cost){
		dudetype.bought = dudetype.bought + 1;
		updateGold(-dudetype.cost);
		dudetype.updateCost();
		calculateTotalDudes(dudetype);
		updateDudes();
		updateIncomePerTick();
	};
};
 
 function calculateNewDudes(){
	dude.trickled = dude.trickled + betterdude.total;
	betterdude.trickled = betterdude.trickled + superdude.total;
	superdude.trickled = superdude.trickled + bestdude.total;
	bestdude.trickled = bestdude.trickled + Kay.total;
};	

 function calculateTotalPerType(){
	calculateTotalDudes(dude);
	calculateTotalDudes(betterdude);
	calculateTotalDudes(superdude);
	calculateTotalDudes(bestdude);
	calculateTotalDudes(Kay);
};

function calculateTotalDudes(dudetype){
	dudetype.total = dudetype.trickled + dudetype.bought;
};

function updateDudes(){
	document.getElementById('dudesbought').innerHTML = dude.bought;
	document.getElementById('betterdudesbought').innerHTML = betterdude.bought;
	document.getElementById('superdudesbought').innerHTML = superdude.bought;
	document.getElementById('bestdudesbought').innerHTML = bestdude.bought;
	document.getElementById('Kaybought').innerHTML = Kay.bought;

	document.getElementById('dudestotal').innerHTML = dude.total;
	document.getElementById('betterdudestotal').innerHTML = betterdude.total;
	document.getElementById('superdudestotal').innerHTML = superdude.total;
	document.getElementById('bestdudestotal').innerHTML = bestdude.total;
	document.getElementById('Kaytotal').innerHTML = Kay.total;
};



//equipment--------------------------------------------------------------------------------------

function buyEquipment(equipmenttype){
	if (gold >= equipmenttype.cost){
		equipmenttype.bought = equipmenttype.bought + 1;
		updateGold(-equipmenttype.cost);
		updateEquipmentCost(equipmenttype);
		calculateTotalEquipment(equipmenttype);
		updateEquipment();
		updateIncomePerClick();//
	};
};

function updateEquipmentCost(equipmenttype){
	equipmenttype.cost = Math.floor(100*equipmenttype.cost*1.1)/100;
	switch(equipmenttype) {
    case mouse:
        document.getElementById('mouseCost').innerHTML = numeral(equipmenttype.cost).format('0.00a');
        break;
    case cat:
        document.getElementById('catCost').innerHTML = numeral(equipmenttype.cost).format('0.00a');
        break;
	case dog:
        document.getElementById('dogCost').innerHTML = numeral(equipmenttype.cost).format('0.00a');;
        break;
	case hotdog:
        document.getElementById('hotdogCost').innerHTML = numeral(equipmenttype.cost).format('0.00a');
        break;
	};
};

function calculateTotalEquipment(equipmenttype){
	equipmenttype.total = equipmenttype.trickled + equipmenttype.bought;
};

function updateEquipment(){
	document.getElementById('mousebought').innerHTML = mouse.bought;
	document.getElementById('catbought').innerHTML = cat.bought;
	document.getElementById('dogbought').innerHTML = dog.bought;
	document.getElementById('hotdogbought').innerHTML = hotdog.bought;
	

	document.getElementById('mousetotal').innerHTML = mouse.total;
	document.getElementById('cattotal').innerHTML = cat.total;
	document.getElementById('dogtotal').innerHTML = dog.total;
	document.getElementById('hotdogtotal').innerHTML = hotdog.total;
	
};

function calculateNewEquipment(){
	mouse.trickled = mouse.trickled + cat.total;
	cat.trickled = cat.trickled + dog.total;
	dog.trickled = dog.trickled + hotdog.total;
};

function calculateTotalPerEquipmentType(){
	calculateTotalEquipment(mouse);
	calculateTotalEquipment(cat);
	calculateTotalEquipment(dog);
	calculateTotalEquipment(hotdog);
};

//upgrades-------------------------------------------------------------------------------

function upgradeDude(){
	if (gold>=upgradedudecost){
		updateGold(-upgradedudecost);
		upgradedudecost = upgradedudecost*1000;
		document.getElementById('upgradecost').innerHTML = numeral(upgradedudecost).format('0.00a');;
		dudeincome = dudeincome*2;
		document.getElementById('dudeincome').innerHTML = dudeincome;
		updateIncomePerTick();
	};
};

//resets-----------------------------------------------------------------------------------------------

function reset1(){
	if(dude.total >= 10000000){
		var r = confirm("Are you sure? this will reset all your dudes!");
		if (r == true) {
			
			initializedudes();
			
			updateDudes();
			
			document.getElementById('KayButton').style.display = 'inline';
			document.getElementById('unlockKay').style.display = 'none';
		};
		
	} else {
		window.alert("you need at least 10 million dudes for that!");
	};
};




//-------------------------------------

function tick(){
	if (ticks < 1){
		initializedudes();
	};
	updateIncomePerTick();
	updateGold(incomepertick);
	if (ticks % 10 == 0){
		calculateNewDudes();
		calculateTotalPerType();
		updateDudes();
		updateIncomePerTick();
	};
	ticks = ticks + 1;
};

function goldClick(incomeperclick){
	 updateGold(incomeperclick);
	 clicks = clicks + 1;
	 if (clicks % 25 == 0){
		calculateNewEquipment();
		calculateTotalPerEquipmentType();
		updateEquipment();
		updateIncomePerClick();
	 };
 };
 
