//DinnerModel Object constructor
var DinnerModel = function() {
		
	var guest = 1;
	
	var selectedMenu = [];

	var selectedDish = 0;

	var searchDishes;

	var preparedDish;

	var self = this;

	this.apiKey = "XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN";

	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu

	//num = value of minus and plus button
	this.setNumberOfGuests = function(num) {
		//TODO Lab 2
		guest += num;
		if (guest < 1){
			guest = 1;
		}
		this.notifyObservers("newGuestNumber");
		return guest;
	}
	
	this.getNumberOfGuests = function() {
		//TODO Lab 2
		return guest;
	}

	//Returns the dish that is on the menu for selected type
	// this.getSelectedDish = function(type) {
	//   for(var i = 0; i < dishes.length ; i++){
	// 		if(dishes[i].type == type) {
	// 			selectedMenu.push(dishes[i]);
	// 			this.notifyObservers();
	// 			return dishes[i];
	// 		}
	// 	}
	// }
	    //TODO Lab 2

	
	this.getSearchDish = function(){
		//for (var i=0; i<)
		return searchDishes.Results;
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		// for (var i = 0; i < selectedMenu.length ; i++){
		// 	return selectedMenu[i].name;
		// }

		//OR ONLY THIS ?!
		return selectedMenu;

		//TODO Lab 2
	}

	// this.getFullMenuBefore = function(){
	// 	return dishes;
	// }

	this.getDishFromMenu = function(id){
		// console.log("getDishFromMenu // selectedMenu.length = "+selectedMenu.length);
		for (var i = 0; i < selectedMenu.length ; i++){
			if(selectedMenu[i].RecipeID == id){
				return selectedMenu[i];
			}
		}
	}
	this.getDishIngredientsFromMenu = function(id){
		var dish = this.getDishFromMenu(id);
		// console.log("getDishIngredientsFromMenu // dish = vvv");
		// console.log(dish);
		// console.log(dish.Ingredients);

		return dish.Ingredients;
	}
	this.getFoodPriceFromMenu = function(id){

		var allIngredients = this.getDishIngredientsFromMenu(id);
		var foodPrice = 0;

		// console.log("getFoodPriceFromMenu // allIngredients = vvv");
		// console.log(allIngredients);

		for (var i = 0 ; i < allIngredients.length; i++){
			//var a = allIngredients[i].price;
			//console.log(allIngredients[i].Quantity);
			var a =allIngredients[i].Quantity*1;

			foodPrice += a;
		}

		// console.log("getFoodPriceFromMenu // foodPrice = "+foodPrice);
		return foodPrice;
	}
	

	this.getDishIngredients = function(){
		// var dish = this.getDish(id);
		var dish = this.getPreparedDish();
		return dish.Ingredients;
	}

	//TODO Lab 2

	this.getFoodPrice = function(){ //FOR PENDING DISH ONLY

		var allIngredients = this.getDishIngredients();
		var foodPrice = 0;

		for (var i = 0 ; i < allIngredients.length; i++){
			//var a = allIngredients[i].price;
			//console.log(allIngredients[i].Quantity);
			var a =allIngredients[i].Quantity*1;

			foodPrice += a;
		}
		return foodPrice;
	}

	
	
	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		// console.log("allIngredients // selectedMenu.length = "+selectedMenu.length);

		var allIngredients =[];

		//fullMenu[i]["ingredients"].length
		for (var i = 0; i < selectedMenu.length ; i++){
			//console.log("selectedMenu["+i+"].ingredients = "+selectedMenu[i]["ingredients"]);
			//return selectedMenu[i].ingredients;
			allIngredients.push(selectedMenu[i]["ingredients"]);
			// console.log("allIngredients // selectedMenu["+i+"].ingredients = "+selectedMenu[i]["ingredients"]);
		}
		return allIngredients;
	}
		
		
	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		//TODO Lab 2
		//var allIng = this.getAllIngredients();
		//console.log("allIng = "+allIng);
		//console.log("allIng.length = "+allIng.length);
		var totalPrice = 0;
		/*
		for (var i = 0; i < allIngredients.length ; i++){
			var a = allIngredients[i].price;
			console.log("allIngredients["+i+"].price = "+a);
			totalPrice += a;
		}*/

		for (var i=0; i<selectedMenu.length; i++){
			// console.log("getTotalMenuPrice // selectedMenu["+i+"].id = "+selectedMenu[i].RecipeID);
			totalPrice += this.getFoodPriceFromMenu(selectedMenu[i].RecipeID);
		}
		
		var grandPrice = totalPrice * this.getNumberOfGuests();
		//console.log("grandPrice = "+grandPrice+" = totalPrice "+totalPrice+" * numberofGuests "+this.getNumberOfGuests());
		return grandPrice;

	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function() {
		// console.log("addDishToMenu // this.getPreparedDish = vvv");
		// console.log(this.getPreparedDish());

		if(selectedMenu.length>0){
			//console.log("addDishToMenu // selectedMenu = vvv");
			//console.log(selectedMenu);

			for (var i=0 ;  i < selectedMenu.length ; i++ ){
				//console.log("addDishToMenu // this.getPreparedDish().Category = "+this.getPreparedDish().Category);
				//console.log("addDishToMenu // selectedMenu["+i+"].Category = "+selectedMenu[i].Category);
				if(this.getPreparedDish().Category == selectedMenu[i].Category){
					
					//console.log("selectedMenu.length = "+selectedMenu.length);

					 //check if selectedMenu is empty or not
						 	//check if the new dish is duplicate
					selectedMenu.splice(i, 1); //if so, remove that dish
				}
			}
		}
					 	//console.log("dishes[i].name = "+dishes[i].name);
		selectedMenu.push(this.getPreparedDish()); //add the new dish

		// console.log("addDishToMenu // after push selectedMenu = "+selectedMenu);

		this.notifyObservers("newMenu");
		//return selectedMenu;
					
				//selectedMenu.push(dishes[i]);
				//return selectedMenu;
	}
		//TODO Lab 2

	//Removes dish from menu - NOT SURE IT IS WORKING CORRECT!
	this.removeDishFromMenu = function(id) {
		for (var i=0 ; i < selectedMenu.length ; i++){
			if (selectedMenu[i].RecipeID == id){
				selectedMenu.splice(i, 1);
				this.notifyObservers("dishRemoved");
			}
		}
		
		//TODO Lab 2
	}

	// function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	// you can use the filter argument to filter out the dish by name or ingredient (use for search)
	// if you don't pass any filter all the dishes will be returned - WORKING!
	// this.getAllDishes = function (type,filter) {
	//   return $(dishes).filter(function(index,dish) {
	// 	var found = true;
	// 	if(filter){
	// 		found = false;
	// 		$.each(dish.ingredients,function(index,ingredient) {
	// 			if(ingredient.name.indexOf(filter)!=-1) {
	// 				found = true;
	// 			}
	// 		});
	// 		if(dish.name.indexOf(filter) != -1)
	// 		{
	// 			found = true;
	// 		}
	// 	}
	//   	return dish.type == type && found;
	//   });	
	// }

	// this.getAllDishes = function(type) {
	// 	console.log("getAllDishes = "+type);
	// 	this.notifyObservers("loading");
	// 	// var apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";
	// 	var category = type;
	// 	var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
 //                  + type 
 //                  + "&api_key="+self.apiKey;
	// 	$.ajax({
	//         type: "GET",
	//         dataType: 'json',
	//         cache: false,
	//         url: url,
	//         success: function (data) {
	//             console.log(data.Results);
	//             //return data.Results;
	//             },
	//         error: function(){
 //            	self.notifyObservers("error");
 //            }
	//          });
	// }

	this.getRecipeSearch = function(string) {
		this.notifyObservers("loading");
        // var apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";
        var titleKeyword = string;
        var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
                  + titleKeyword 
                  + "&api_key="+self.apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
            	//searchDishes = [];
            	searchDishes = data;
            	//console.log(searchDishes);
            	//console.log(this);
                self.notifyObservers("searchSuccess");
            },
            error: function(){
            	self.notifyObservers("error");
            }
        });
    }

	//function that returns the ID from the picture that is clicked in mainView
	this.addPicId = function(id){
		//console.log("addPicId");
		selectedDish = id;
		//console.log("selectedDish = "+id);
		this.notifyObservers("newPicId");
	}
	
	this.getPicId = function(){
		return selectedDish;
	}


	//function that returns a dish of specific ID - WORKING!!
	// this.getDish = function (id) {
	//   for(var i=0 ; i < dishes.length ; i++){
	// 		if(dishes[i].id == id) {
	// 			return dishes[i];				
	// 		}
	// 	}
	// }

	//http://api.bigoven.com/recipe/175658?api_key=1hg3g4Dkwr6pSt22n00EfS01rz568IR6
	//http://api.bigoven.com/recipe/1476937?api_key=1hg3g4Dkwr6pSt22n00EfS01rz568IR6

	this.keepPreparedDish = function(data){
		preparedDish = data;
	}

	this.getPreparedDish = function(){
		return preparedDish;
	}

	this.getDish = function(id){
		console.log("getDish id = "+id);
		this.notifyObservers("loadingDish");
        // var apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";
        var dishID = id;
        var url = "http://api.bigoven.com/recipe/"+id+"?api_key="+self.apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
            	//searchDishes = [];
            	console.log(data);
            	self.keepPreparedDish(data);
            	self.notifyObservers("dishPrepared");
            	//return data;
            },
            error: function(){
            	self.notifyObservers("GetDishError");
            }
        });
	}
	
	//////////Observable implementation
	
	this.observers = [];
	
	this.addObserver = function(observer) {
		//console.log("this.addObserver = "+observer);
		this.observers.push(observer);
	}
	
	this.notifyObservers = function(arg) {
		//console.log("notifyObservers arg = "+arg);
		for(var i=0; i<this.observers.length; i++) 
		{
			//console.log("this = "+this);
			//console.log("this.observers["+i+"]"+this.observers[i]);
			this.observers[i].update(this, arg);
		}	
	}


	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
