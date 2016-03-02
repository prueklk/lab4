var SideMenuViewCtrl = function(view, model) {

	view.plusButton.click(function(){
		model.setNumberOfGuests(1);
	});
	 
	view.minusButton.click(function(){
		model.setNumberOfGuests(-1);
	});

	view.confirmDinner.click(function(){
		overallStateCtrl.mainView.container.hide();
		overallStateCtrl.selectedDishView.container.hide();
		overallStateCtrl.sideMenuView.container.hide();
		overallStateCtrl.overView.container.show();
	});

	view.menuList.click(function(event){
		var x = event.target;
    	//document.getElementById("menuList").innerHTML = "Triggered by a " + x.id + " element";
    	model.removeDishFromMenu(x.id);
	});
}