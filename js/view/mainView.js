var MainView = function(container, model){
	
	this.container = container; 
	
	string = "";
	
	string += "<div id=\"picBox\">"+
			"<div id=\"dishDiv\" class='row'>"+
				"<h4>Select dish:</h4>"+
				"<hr class=\"blackLine\">"+
				"<div class='col-md-6'><input type=\"text\" placeholder=\"Enter key words\" id=\"searchValue\">"+
				"<button class=\"btn\" id=\"searchButton\">Search</button></div>"+
 				"<div class='col-md-6' align=\"right\">Sort by: <select id=\"foodDrop\">"+
				"</select></div>"+
				"</div>"+		
				"<div>"+
				"<div class=\"row\" id=\"foodDetail\">"+
				"</div>"+
			"</div>"+
		"</div>"
		
	container.html(string);
	
	this.foodDrop = container.find('#foodDrop');
	this.foodDetail = container.find('#foodDetail');
	this.searchButton = container.find("#searchButton");
	this.searchValue = container.find("#searchValue");

	var foodList;
	var foodDropListTxt = "";
		
	//drop down list
	foodDropListTxt = "<option value ='appetizer'>Appetizer</option>"+
				"<option value ='main dish'>Main Dish</option>"+
				"<option value ='dessert'>Dessert</option>"+
				"<option value='empty'>-</option>";
							
	this.foodDrop.html(foodDropListTxt);
	

	this.prepareView = function(type){
		//foodList = model.getAllDishes(type);
		foodList = model.getRecipeSearch(type);
	}

	
	// this.updateType = function(type){
		
	// 	var foodDetailTxt ="";

	// 	console.log(foodList);
		
	// 	//food box
	// 	for (var i=0 ;  i < foodList.length ; i++ ){

	// 		foodDetailTxt +="<div class=\"col-md-4\">"+
	// 								"<div class=\"thumbnail\">"+
	// 									"<img src=\"images/"+foodList[i].image+"\" id=\""+foodList[i].name +"\" class=\"foodPics\" style=\"width:128px;height:128px;\">"+
	// 									"<div class=\"caption\">"+
	// 									"<p><a href=\"#\" class=\"btn btn-primary btn-block\" role=\"button\" id=\""+foodList[i].id+"\">"+foodList[i].name+"</a></p>"+
	// 									"<p>"+foodList[i].description+"</p>"+
	// 							"</div></div></div>";
	// 	}
		
	// 	this.foodDetail.html(foodDetailTxt);
	// }

	this.updateSearch = function(){

		//var string = searchValue.value;
		//model.getRecipeSearch(string);

		var menu = model.getSearchDish();
		console.log("updateSearch = "+menu.length);
		//console.log(menu["Results"]);

		if(menu.length == 0){
			this.foodDetail.html("<h4>Try another keyword!</h4>");
		}else{	
			foodInfo = "";

			for(var i = 0; i < menu.length ; i++){
			//if (string == menu[i].name){

				foodInfo +="<div class=\"col-md-4\">"+
									"<div class=\"thumbnail\">"+
										"<img src=\""+menu[i].ImageURL120+"\" class=\"foodPics\" style=\"width:128px;height:128px;\">"+
										"<div class=\"caption\">"+
										"<p><a href=\"#\" class=\"btn btn-primary btn-block\" role=\"button\" id=\""+menu[i].RecipeID+"\">"+menu[i].Title+"</a></p>"+
										"<p>Here is how you cook it...</p>"+
								"</div></div></div>";
			}
			this.foodDetail.html(foodInfo);
		}
	}

	this.updateLoading = function(){
		this.foodDetail.html("Searching");
	}

	this.updateError = function(){
		this.foodDetail.html("Check your internet connection or try with another keyword");
	}


	
	this.update = function(model, arg) {
		//console.log("UPDATE mainView // arg = "+arg);

		if (arg == "appetizer" || arg == "main dish" || arg == "dessert"){
			this.prepareView(arg);
		}
		if (arg == "searchSuccess"){
			this.updateSearch();
		}
		if (arg == "loading"){
			this.updateLoading();
		}

		if (arg == "error"){
			alert("Error! Try to search again!");
			this.updateError();
		}
		
	}
	
	//console.log("this.addObserver = mainView");
	model.addObserver(this);
	

}