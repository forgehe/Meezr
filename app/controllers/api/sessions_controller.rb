class Api::SessionsController < ApplicationController

  def new
  end
  def create

    @user = User.find_by(email: params[:email])
    
    if @user && @user.authenticate(params[:user_password])
      session[:user_id] = @user.id
      render :json => { user_id: @user.id }
    else
      render :json => { message: "403 Forbidden"}, :status => 403
    end
    
  end
  def destroy
    render :json => {user_id: nil}
    session[:user_id] = nil
  end
  
end
