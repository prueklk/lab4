var OverView = function(container, model){
	
	this.container = container; 
	
	var textString = "";
	
	textString += "<div id=\"instructions\">"+
		"<div class=\"col-md-12\" id=\"dinnerOverview\">"+
			"<div class=\"col-md-6\">"+
				"<h3>My Dinner: <span id=\"numberOfGuests\"/></h3>"+
			"</div>"+
			"<div class=\"col-md-6\" align=\"right\">"+
				"<button id=\"backButton\" class=\"btn\">Go back and edit dinner</button>"+
			"</div>"+
		"</div>"+
		//"<div id=\"preparationView\">"+
		//"</div>"+
		"</div>"+
		"<div id=\"overviewPics\" class=\"col-md-12 center\">"+
		"</div>"+
		'<div class="row">'+
		'<div class="col-md-12 center"><button class="btn" id="printButton">Print Full Recipe</button></div>'+
		"</div>";
	
	container.html(textString);
	
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests.html(model.getNumberOfGuests()+" people");
	this.backButton = container.find("#backButton");
	this.printButton = container.find("#printButton");

	var addOverviewText = function (){
		this.overviewPics = container.find("#overviewPics");

		var fullMenu = model.getFullMenu();
		var foodDetailTxt ='<div class="imgInstruction">';
		
		// function foodClick(){
		// 	console.log("foodClick");
		// }

		for (var i=0 ;  i < fullMenu.length ; i++ ){

			foodDetailTxt +="<div class=\"col-md-4\">"+
									"<div class=\"thumbnail\">"+
										"<img src=\"images/"+fullMenu[i].image+"\" id=\""+fullMenu[i].name +"\" class=\"foodPics\" style=\"width:128px;height:128px;\">"+
										"<div class=\"caption\">"+
										"<p><h4>"+fullMenu[i].name+"</h4></p>"+
										'<p class="costColor">SEK '+model.getFoodPrice(fullMenu[i].id)+'</p>'+
								"</div></div></div>";

		}
		
		foodDetailTxt += "</div>";

		foodDetailTxt += '<div class="col-md-12"><hr class="blackLine">'+
						'<div class="costColor"><h4>Total price: SEK '+model.getTotalMenuPrice()+'</h4></div>'+
						'<hr class="blackLine"></div>';

		this.overviewPics.html(foodDetailTxt);
	}
	
	this.update = function(model, arg) {
		//console.log("UPDATE overView // arg = "+arg);

		addOverviewText();
		
		if (arg == "newGuestNumber"){
			this.numberOfGuests.html(model.getNumberOfGuests());
		}
	}
	
	//console.log("this.addObserver = overView");
	model.addObserver(this);
	
	addOverviewText();
};