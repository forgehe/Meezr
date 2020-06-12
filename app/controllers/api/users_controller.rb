class Api::UsersController < ApplicationController

  def create
    puts params
    newUser = User.new( 
      user_name: params['user_name'],
      email: params['email'],
      password: params['user_password']

    )

    newUser.save

    returnid = User.find_by_email(params[:email])
    render :json => { user_id: returnid['id'] } 

  end

  def show
    login = User.find(params['id'])
    meals = Meal.find_by_sql("
        select meals.id, meals.title, meal_categories.category, image_url from 
        ((meals left join meal_photos on meals.id = meal_photos.meal_id)
        left join meal_categories on meals.id = meal_categories.meal_id)
        where user_id = #{params['id']}"
      )
    favorites = Favorite.find_by_sql("
        select meals.id , meals.title, image_url, favorites.id as favorite_id from 
        ((meals left join favorites on meals.id = favorites.meal_id)
        left join meal_photos on meals.id = meal_photos.meal_id)
        where favorites.user_id = #{params['id']}"
      )
    render :json => {user_name: login['user_name'], meals: meals, favorites: favorites}
  end


end
