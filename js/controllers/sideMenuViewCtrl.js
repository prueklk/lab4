var SideMenuViewCtrl = function(view, model) {

	view.plusButton.click(function(){
		model.setNumberOfGuests(1);
	});
	 
	view.minusButton.click(function(){
		model.setNumberOfGuests(-1);
	});

	view.confirmDinner.click(function(){
		var menu = model.getFullMenu();
		if(menu.length>0){
			overallStateCtrl.mainView.container.hide();
			overallStateCtrl.selectedDishView.container.hide();
			overallStateCtrl.sideMenuView.container.hide();
			overallStateCtrl.overView.container.show();
		}else{
			alert("Please add dish to menu.");
		}
	});

	view.menuList.click(function(event){ //click delete
		var x = event.target;
		console.log("menuList.click // x = vvv");
		console.log(x);
    	//document.getElementById("menuList").innerHTML = "Triggered by a " + x.id + " element";
    	model.removeDishFromMenu(x.id);
	});
}