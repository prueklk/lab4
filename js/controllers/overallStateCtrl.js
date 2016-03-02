var OverallStateCtrl = function(model){
	this.indexView = new IndexView ($("#indexView"), model);
	this.indexCtrl = new IndexCtrl(this.indexView, model);
	
	this.sideMenuView = new SideMenuView($("#sideMenuView"), model);
	this.sideMenuViewCtrl = new SideMenuViewCtrl(this.sideMenuView,model);
	
	this.mainView = new MainView($("#mainView"), model);
	this.mainViewCtrl = new MainViewCtrl(this.mainView,model);
	
	this.selectedDishView = new SelectedDishView($("#selectedDishView"), model);
	this.selectedDishViewCtrl = new SelectedDishViewCtrl(this.selectedDishView, model);
	
	this.overView = new OverView($("#overView"), model);
	this.overViewCtrl = new OverViewCtrl(this.overView,model);
	
	this.instructionView = new InstructionView($("#instructionView"), model);
	this.instructionViewCtrl = new InstructionViewCtrl(this.instructionView, model);


	//this.indexView.container.hide();
	this.sideMenuView.container.hide();
	this.mainView.container.hide();
	this.selectedDishView.container.hide();
	this.overView.container.hide();
	this.instructionView.container.hide();

}