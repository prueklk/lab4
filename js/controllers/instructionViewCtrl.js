var InstructionViewCtrl = function(view, model) {

	view.backButton.click(function(){
		overallStateCtrl.instructionView.container.hide();
		overallStateCtrl.mainView.container.show();
		overallStateCtrl.sideMenuView.container.show();
	});
}