var IndexView = function(container, model){
	
	this.container = container; 
	
	container.html('<div id="indexBox" class="blackBorder"><h2>A Home Dinner Service</h2><hr class="blackLine"><p>Lorem ipsum dolor.....</p><p>start quickly</p><button class="btn" id="createDinner">Create new dinner</button></div>');

	//console.log("this.addObserver = indexView");
	
	this.createDinner = container.find("#createDinner");


	this.update = function(model, arg) {
		//console.log("UPDATE indexView // arg = "+arg);
	}

	model.addObserver(this);
}	
	