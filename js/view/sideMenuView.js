var SideMenuView = function(container, model){
	this.container = container; 
	
	string = "";
	
	string += "<div class=\"blackBorder\">"+
			"<div>"+
				"<h4>My dinner</h4>"+
				"<p>People: <span id=\"numberOfGuests\"/></span></p>"+
			"</div>"+
 			"<div>"+
            "<button id=\"minusGuest\" class=\"btn\"><span class=\"glyphicon glyphicon-minus\"></span></button>"+
				"<button id=\"plusGuest\" class=\"btn\"><span class=\"glyphicon glyphicon-plus\"></span></button>"+
			"</div>"+
			"<div>"+
				"<div id=\"menuList\">"+
				"</div>"+
			"</div>"+
			"<button id=\"confirmButton\" class=\"btn\">Confirm Dinner</button>"+
		"</div>";
		
	container.html(string);
	
	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.confirmDinner = container.find("#confirmButton");


	this.menuList = container.find("#menuList");

	this.numberOfGuests.html(model.getNumberOfGuests());
	
	this.updateTable = function(arg){
		var fullMenu = model.getFullMenu();
		var menuListTxt = '<table class="table">'+
							'<thead><tr>'+
								'<th>Dish name</th>'+
								'<th>Cost</th>'+
								'<th></th>'+
							'</tr></thead><tbody>';
		for (var i=0; i<fullMenu.length; i++){
			var fullPrice = model.getFoodPrice(fullMenu[i].RecipeID);

			menuListTxt += 	'<tr class="costColor"><td>'+fullMenu[i].Title+"</td>"+
						"<td>SEK </td>" + 
						"<td>"+fullPrice+"</td>"+
						"<td><button id='"+fullMenu[i].RecipeID+"'>Delete</button></td></tr>";	
		}

		menuListTxt += '</tbody><tfoot><tr>'+
							'<td>Total price (x '+model.getNumberOfGuests()+')</td>'+
							'<td>SEK</td>'+
							'<td>'+model.getTotalMenuPrice()+'</td></tr></tfoot></table>';

		if(arg=="pending"){
			var dishId = model.getPicId();
			var pickedFood = model.getPreparedDish();
			var found = false;
			if(fullMenu.length == 0){
				menuListTxt += 	'<p class="pendingTxt">'+pickedFood.Title+' SEK '+model.getFoodPrice(dishId)+' Pending</p>';
			}
			else{
				for (var i=0; i<fullMenu.length; i++){
					if(fullMenu[i].id == pickedFood.id){
					found = true;
					}
				}
				if (found == false){
					menuListTxt += 	'<p class="pendingTxt">'+pickedFood.Title+' SEK '+model.getFoodPrice(dishId)+' Pending</p>';
					}
			}
		}

		
		this.menuList.html(menuListTxt);
	}

	this.updateTable("normal");
	
	this.update = function(model, arg) {
		//console.log("UPDATE sideMenuView // arg = "+arg);
		
		if (arg == "newGuestNumber"){
			this.numberOfGuests.html(model.getNumberOfGuests());
			this.updateTable("normal");
		}
		if (arg == "newMenu"){
			this.updateTable("normal");
		}
		if (arg == "dishRemoved"){
			this.updateTable("normal");
		}
		if (arg == "updateSideView"){
			this.updateTable("pending");
		}
		if (arg == "GetDishError"){
			alert("Error!");
		}

	}

	//console.log("this.addObserver = sideMenuView");
	model.addObserver(this);

}	
	
