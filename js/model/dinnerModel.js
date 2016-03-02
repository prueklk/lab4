//DinnerModel Object constructor
var DinnerModel = function() {
	

	// var selectedMenu = [{ // FOR TESTING
		// 'id':1,
		// 'name':'French toast',
		// 'type':'starter',
		// 'image':'toast.jpg',
		// 'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		// 'ingredients':[{ 
			// 'name':'eggs',
			// 'quantity':0.5,
			// 'unit':'',
			// 'price':10
			// },{
			// 'name':'milk',
			// 'quantity':30,
			// 'unit':'ml',
			// 'price':6
			// },{
			// 'name':'brown sugar',
			// 'quantity':7,
			// 'unit':'g',
			// 'price':1
			// },{
			// 'name':'ground nutmeg',
			// 'quantity':0.5,
			// 'unit':'g',
			// 'price':12
			// },{
			// 'name':'white bread',
			// 'quantity':2,
			// 'unit':'slices',
			// 'price':2
			// }]
		// },{
		// 'id':2,
		// 'name':'Sourdough Starter',
		// 'type':'starter',
		// 'image':'sourdough.jpg',
		// 'description':"Here is how you make it... Lore ipsum...",
		// 'ingredients':[{ 
			// 'name':'active dry yeast',
			// 'quantity':0.5,
			// 'unit':'g',
			// 'price':4
			// },{
			// 'name':'warm water',
			// 'quantity':30,
			// 'unit':'ml',
			// 'price':0
			// },{
			// 'name':'all-purpose flour',
			// 'quantity':15,
			// 'unit':'g',
			// 'price':2
			// }]
		// }];
		
	var guest = 0;
	
	var selectedMenu = [];

	var selectedDish = 0;

	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu

	//num = value of minus and plus button
	this.setNumberOfGuests = function(num) {
		//TODO Lab 2
		guest += num;
		if (guest < 0){
			guest = 0;
		}
		this.notifyObservers("newGuestNumber");
		return guest;
	}
	
	this.getNumberOfGuests = function() {
		//TODO Lab 2
		return guest;
	}

	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
	  for(var i = 0; i < dishes.length ; i++){
			if(dishes[i].type == type) {
				selectedMenu.push(dishes[i]);
				this.notifyObservers();
				return dishes[i];
			}
		}
	}
	    //TODO Lab 2

	
	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		// for (var i = 0; i < selectedMenu.length ; i++){
		// 	return selectedMenu[i].name;
		// }

		//OR ONLY THIS ?!
		return selectedMenu;

		//TODO Lab 2
	}

	this.getFullMenuBefore = function(){
		return dishes;
	}

	this.getDishIngredients = function(id){
		var dish = this.getDish(id);
		return dish.ingredients;
	}

	//TODO Lab 2

	this.getFoodPrice = function(id){

		var allIngredients = this.getDishIngredients(id);
		var foodPrice = 0;

		for (var i = 0 ; i < allIngredients.length; i++){
			var a = allIngredients[i].price;
			foodPrice += a;
		}
		return foodPrice;
	}

	
	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		console.log("selectedMenu.length = "+selectedMenu.length);

		var allIngredients =[];

		//fullMenu[i]["ingredients"].length
		for (var i = 0; i < selectedMenu.length ; i++){
			//console.log("selectedMenu["+i+"].ingredients = "+selectedMenu[i]["ingredients"]);
			//return selectedMenu[i].ingredients;
			allIngredients.push(selectedMenu[i]["ingredients"]);
			console.log("selectedMenu["+i+"].ingredients = "+selectedMenu[i]["ingredients"]);
			//console.log("allIngredients = "+allIngredients);
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
			totalPrice += this.getFoodPrice(selectedMenu[i].id);
		}
		
		var grandPrice = totalPrice * this.getNumberOfGuests();
		//console.log("grandPrice = "+grandPrice+" = totalPrice "+totalPrice+" * numberofGuests "+this.getNumberOfGuests());
		return grandPrice;

	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {

		for (var i=0 ;  i < selectedMenu.length ; i++ ){

			if(this.getDish(id).type == selectedMenu[i].type){
				
				//console.log("selectedMenu.length = "+selectedMenu.length);

				 //check if selectedMenu is empty or not
					 	//check if the new dish is duplicate
					 		selectedMenu.splice(i, 1); //if so, remove that dish
					 	}
					 }
					 	//console.log("dishes[i].name = "+dishes[i].name);
					 	selectedMenu.push(this.getDish(id)); //add the new dish

					 	this.notifyObservers("newMenu");
						return selectedMenu;
					console.log("hello");

				//selectedMenu.push(dishes[i]);
				//return selectedMenu;
			}
		//TODO Lab 2

	//Removes dish from menu - NOT SURE IT IS WORKING CORRECT!
	this.removeDishFromMenu = function(id) {
		for (var i=0 ; i < selectedMenu.length ; i++){
			if (selectedMenu[i].id == id){
				selectedMenu.splice(i, 1);
				this.notifyObservers("dishRemoved");
			}else{

			}
		}
		
		//TODO Lab 2
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned - WORKING!
	this.getAllDishes = function (type,filter) {
	  return $(dishes).filter(function(index,dish) {
		var found = true;
		if(filter){
			found = false;
			$.each(dish.ingredients,function(index,ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return dish.type == type && found;
	  });	
	}
	
	//function that returns the ID from the picture that is clicked in mainView
	this.addPicId = function(id){
		selectedDish = id;
		this.notifyObservers("newPicId");
	}
	
	this.getPicId = function(){
		return selectedDish;
	}

	//function that returns a dish of specific ID - WORKING!!
	this.getDish = function (id) {
	  for(var i=0 ; i < dishes.length ; i++){
			if(dishes[i].id == id) {
				return dishes[i];				
			}
		}
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
