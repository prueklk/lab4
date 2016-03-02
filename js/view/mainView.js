var MainView = function(container, model){
	
	this.container = container; 
	
	string = "";
	
	string += "<div id=\"picBox\">"+
			"<div id=\"dishDiv\">"+
				"<h4>Select dish:</h4>"+
				"<hr class=\"blackLine\">"+
				"<span><input type=\"text\" placeholder=\"Enter key words\" id=\"searchValue\">"+
				"<button class=\"btn\" id=\"searchButton\">Search</button></span>"+
 				"<select id=\"foodDrop\">"+
				"</select>"+
				"</div>"+		
				"<div>"+
				"<div class=\"row\" id =\"foodDetail\">"+
				"</div>"+
			"</div>"+
		"</div>"
		
	container.html(string);
	
	this.foodDrop = container.find('#foodDrop');
	this.foodDetail = container.find('#foodDetail');
	this.searchButton = container.find("#searchButton");
	this.searchValue = container.find("#searchValue");

	
	var foodDropListTxt = "";
		
	//drop down list
	foodDropListTxt = "<option value ='appetizer'>Appetizer</option>"+
				"<option value ='main dish'>Main Dish</option>"+
				"<option value ='dessert'>Dessert</option>"+
				"<option value='empty'>-</option>";
							
	this.foodDrop.html(foodDropListTxt);
		
	
	this.updateType = function(type){
		
		var foodList = model.getAllDishes(type);
		var foodDetailTxt ="";
		
		//food box
		for (var i=0 ;  i < foodList.length ; i++ ){

			foodDetailTxt +="<div class=\"col-md-4\">"+
									"<div class=\"thumbnail\">"+
										"<img src=\"images/"+foodList[i].image+"\" id=\""+foodList[i].name +"\" class=\"foodPics\" style=\"width:128px;height:128px;\">"+
										"<div class=\"caption\">"+
										"<p><a href=\"#\" class=\"btn btn-primary btn-block\" role=\"button\" id=\""+foodList[i].id+"\">"+foodList[i].name+"</a></p>"+
										"<p>"+foodList[i].description+"</p>"+
								"</div></div></div>";
		}
		
		this.foodDetail.html(foodDetailTxt);
	}

	this.updateSearch = function(){

		//var string = searchValue.value;
		//model.getRecipeSearch(string);

		var menu = model.getSearchDish();
		console.log(menu.length);
		//console.log(menu["Results"]);

		foodInfo = "";

		for(var i = 0; i < menu.length ; i++){
			//if (string == menu[i].name){

				foodInfo +="<div class=\"col-md-4\">"+
									"<div class=\"thumbnail\">"+
										"<img src=\""+menu[i].ImageURL120+"\" id=\""+menu[i].Title +"\" class=\"foodPics\" style=\"width:128px;height:128px;\">"+
										"<div class=\"caption\">"+
										"<p><a href=\"#\" class=\"btn btn-primary btn-block\" role=\"button\" id=\""+menu[i].RecipeID+"\">"+menu[i].Title+"</a></p>"+
										"<p>\"Here is how you make it... Lore ipsum...\"</p>"+
								"</div></div></div>";

				//this.foodBtnId.push(menu[i].id);

		 	//}
		}
		this.foodDetail.html(foodInfo);
	}

	this.updateType("starter");

	
	this.update = function(model, arg) {
		//console.log("UPDATE mainView // arg = "+arg);

		if (arg == "starter" || arg == "main dish" || arg == "dessert"){
			this.updateType(arg);
		}
		if (arg == "searchSuccess"){
			this.updateSearch();
		}
		
	}
	
	//console.log("this.addObserver = mainView");
	model.addObserver(this);
	

}