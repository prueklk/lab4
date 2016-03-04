var MainViewCtrl = function(view, model) {
	
	searchButton.onclick = function(){
		var string = searchValue.value;
		model.getRecipeSearch(string);
		document.getElementById("foodDrop").value = 'empty';

	};

	view.foodDetail.click(function(event){
		var x = event.target;
		model.addPicId(x.id);
		overallStateCtrl.mainView.container.hide();
		overallStateCtrl.selectedDishView.container.show();
	})

	foodDrop.onchange = function(){
		var type = document.getElementById("foodDrop").value;
		if (type!="empty"){
			view.update(this, type);	
			searchValue.value = "";
		}
	};

}