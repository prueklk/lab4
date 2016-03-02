var IndexCtrl = function(view, model) {

	//console.log("IndexCtrl");

	createDinner.onclick = function(){
		// console.log("onclick");
		// console.log(this);
		// console.log(overallStateCtrl);

		overallStateCtrl.indexView.container.hide();
		overallStateCtrl.sideMenuView.container.show();
		overallStateCtrl.mainView.container.show();
	}	

}