var SelectedDishView = function(container, model){
	
	this.container = container; 
	
	var textString = "";
	
	textString += "<div id=\"dishDetails\" class=\"row\">"+
			"<div id=\"selectedDishDetails\" class=\"col-md-7\">"+
			"</div>"+"<div id=\"ingredientsBox\" class=\"col-md-5\">"+
			'<div id="tableHead"></div>'+
			'<div><table id="tableContent" class="table">'+
				"</table>"+
			"</div>"+
			"<div id=\"buttonDiv\">"+"<button class=\"btn btn-block\" id=\"confirmDish\">Confirm Dish</button>"+"</div>"+
			"</div>"+
			'<div class=\"col-md-12\"><button class="btn" id="backButton">Back to Select Dish</button></div>'+"</div>"+
			"<div id=\"preparation\" class=\"col-md-12\">"+
				"<h2>Preparation</h2>"+
				"<div id=\"prepDiv\">"+
				"</div>"+
		"</div>";
		
	container.html(textString);
	
	//console.log("CONTAINER");
	//console.log(container);
	
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests.html(model.getNumberOfGuests()+" people");
	
	this.confirmDish = container.find("#confirmDish");
	this.backButton = container.find("#backButton");
	// this.tableContent = container.find("#tableContent");
	// this.totalCostTwo = container.find("#totalCostTwo");

	
	
	var dishInfo = function(){
		
	
		this.pickedFoodDiv = container.find("#selectedDishDetails");
		
		var dishId = model.getPicId();
		var pickedFood = model.getDish(dishId);
		var foodDescription = "";
		foodDescription += "<h2>"+pickedFood.name+"</h2>"+
							"<img src=\"images/"+pickedFood.image+"\" id=\""+pickedFood.name+"\" class=\"foodPics\" style=\"width:128px;height:128px;\">"+
							"<div>"+ pickedFood.description+"</div>"
		
		//foodDescription += '<br><button class="btn" id="backButton">Back to Select Dish</button>';

		this.pickedFoodDiv.html(foodDescription);

		this.prepDiv = container.find("#prepDiv");
		this.prepDiv.html("<p>"+pickedFood.description);


		//this.ingredientsBox = container.find("#ingredientsBox");
		this.totalPriceIngr = container.find("#totalCostIngr");
		
		var ingredientList = model.getDishIngredients(dishId);
		var ingredientTxt = '';
		var tableHeader = '<h4>Ingredients for '+model.getNumberOfGuests()+' people</h4>';
		
		for (var i=0 ;  i < ingredientList.length ; i++ ){
		
			ingredientTxt += '<tbody>'+"<tr>"+
						"<td>"+ingredientList[i].quantity*model.getNumberOfGuests() + ingredientList[i].unit+"</td>"+
						"<td>"+ingredientList[i].name+"</td>"+
						"<td>SEK</td>"+
						"<td>"+ingredientList[i].price*model.getNumberOfGuests()+"</td>"+
						"</tr>";
		}

		 ingredientTxt += '</tbody><tfoot>'+
						 "<tr><td></td>"+
						 "<td>Total cost</td>"+
						 "<td>SEK</td>"+
						 "<td>"+model.getFoodPrice(dishId)*model.getNumberOfGuests()+"</td>"+
						 "</tr></tfoot>";
		
		
		//this.totalPriceIngr.html(model.getFoodPrice(dishId));
		this.tableRows = container.find("#tableContent");
		this.tableCost = container.find("#totalCostTwo");
		this.tableHead = container.find("#tableHead");
		
		this.tableHead.html(tableHeader); 
		this.tableRows.html(ingredientTxt);
		this.tableCost.html(model.getFoodPrice(dishId)*model.getNumberOfGuests());
		//this.tablePeople = container.find("#h4num");
		//this.tablePeople.html = ('Ingredients for'+model.getNumberOfGuests()+'people');
	}
	
	this.update = function(model, arg) {
		//console.log("UPDATE selectedDishView // arg = "+arg);
		
		if (arg == "newPicId"){
			dishInfo();
		}
		if (arg == "newGuestNumber"){
			dishInfo();
		}
		
	}
	
	//console.log("this.addObserver = selectedDishView");
	model.addObserver(this);
	
	//dishInfo();
}