var OverViewCtrl = function(view, model) {

	view.backButton.click(function(){
		//console.log("back");
		overallStateCtrl.mainView.container.show();
		overallStateCtrl.sideMenuView.container.show();
		overallStateCtrl.overView.container.hide();
	});

	view.printButton.click(function(){
		overallStateCtrl.overView.container.hide();
		overallStateCtrl.instructionView.container.show();
	});

}