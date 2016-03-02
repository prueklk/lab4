var MainViewCtrl = function(view, model) {
	
	searchButton.onclick = function(){
		//console.log("searchButton");
		view.updateSearch();

	};

	view.foodDetail.click(function(event){
		var x = event.target;
		//console.log(x.id);
		model.addPicId(x.id);
		overallStateCtrl.mainView.container.hide();
		overallStateCtrl.selectedDishView.container.show();
	})

	foodDrop.onchange = function(){
		var type = document.getElementById("foodDrop").value;
		view.update(this, type);
	};

}