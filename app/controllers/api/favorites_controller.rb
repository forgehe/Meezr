include ActionController::Cookies
class Api::FavoritesController < ApplicationController
  def new
  end 

  def index
    render json: {favorites: Favorite.select("meal_id").where(user_id: params[:user_id])}
  end
  
  def show
    render json: Favorite.includes([:user, :meal])
    .find(params[:id]), include: [:user => {:only => :user_name} ]
  end

  def create
    # pp user
    Favorite.create(meal_id: params[:meal_id], user_id: params[:user_id])
  
    render :json => { message: 'Favorite has been added'}
    # else0
    #   render :json => { message: "Something went wrong"}
    # end
    # favorite = Favorite.create(id: @user, meal: @meal)
    # render :json => { message: "Hit Create Entry" }

  end

  def destroy
    # Favorite.where(favorited_id: @meal.id, user_id: current_user.id).first.destroy
    # redirect_to @meal, notice: 'Project is no longer in favorites'
    favorites = Favorite.find_by_sql("select * from favorites where user_id = #{params[:user_id]} and meal_id = #{params[:meal_id]}")
    for item in favorites do
      Favorite.destroy(item['id'])
    end

    render :json => { message: "Deleted Entry" }
  end

  def update
  end

  private
  
  def set_project
    @meal = Meal.find(params[:meal] || params[:id])
  end
end
