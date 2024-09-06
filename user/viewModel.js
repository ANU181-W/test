const userViewModel = {};
 
  userViewModel.createViewModel = (body) =>{
    const viewModel={}
    if(viewModel.name){
      viewModel.name = body.name;
    }
    if(viewModel.email){
      viewModel.email = body.email;
    }
   
    return viewModel;
  }
  module.exports = userViewModel;