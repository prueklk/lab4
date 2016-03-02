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
	foodDropListTxt = "<option value ='starter'>Starters</option>"+
				"<option value ='main dish'>Main</option>"+
				"<option value ='dessert'>Dessert</option>";
							
	this.foodDrop.html(foodDropListTxt);
		
	
	this.updateType = function(type){
		
		var foodList = model.getAllDishes(type);
		var foodDetailTxt ="";
		
		this.foodBtnId = [];
		this.foodBtnArr =[];

		//food box
		for (var i=0 ;  i < foodList.length ; i++ ){

			foodDetailTxt +="<div class=\"col-md-4\">"+
									"<div class=\"thumbnail\">"+
										"<img src=\"images/"+foodList[i].image+"\" id=\""+foodList[i].name +"\" class=\"foodPics\" style=\"width:128px;height:128px;\">"+
										"<div class=\"caption\">"+
										"<p><a href=\"#\" class=\"btn btn-primary btn-block\" role=\"button\" id=\""+foodList[i].id+"\">"+foodList[i].name+"</a></p>"+
										"<p>"+foodList[i].description+"</p>"+
								"</div></div></div>";

			this.foodBtnId.push(foodList[i].id);
		}
		
		this.foodDetail.html(foodDetailTxt);
		//console.log("this.foodBtnId = "+this.foodBtnId);

		for (var j=0; j<this.foodBtnId.length;j++){
			this.foodBtnArr.push(container.find("#"+this.foodBtnId[j]));

		}
		//console.log(this.foodBtnArr);

		 // for(var k=0;k<this.foodBtnArr.length;k++){
		 // 	//console.log(this.foodBtnArr[k]);
		 	
			//  for(var l=0;l<this.foodBtnArr[k].length; l++){
		 // 	 	//console.log(this.foodBtnArr[k][l]);
	  //  			this.foodBtnArr[k][l].onclick = function(){
	  //   			//console.log(this.id);//food id
			// 		model.addPicId(this.id);
	  //   		}
	  // 		}	
		 // }


	}

	
	
	this.updateType("starter");
	
	this.update = function(model, arg) {
		//console.log("UPDATE mainView // arg = "+arg);

		if (arg == "starter" || arg == "main dish" || arg == "dessert"){
			this.updateType(arg);
		}
		
	}
	
	//console.log("this.addObserver = mainView");
	model.addObserver(this);
	

}