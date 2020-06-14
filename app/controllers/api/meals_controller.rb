require 'json'
class Api::MealsController < ApplicationController
  def index
    render json: Meal.includes([:meal_photos, :meal_ingredients, :meal_categories, :user]).where({is_deleted: false, is_public: true}).limit(10), include: [:meal_photos, :meal_ingredients, :meal_categories, :user => {:only => :user_name}]
  end

  def show
    render :json => Meal.includes([:meal_photos, :meal_ingredients, :meal_categories, :user]).find(params[:id]), include: [:meal_photos, :meal_ingredients, :meal_categories, :user => {:only => :user_name}]
  end

  def create
    data = JSON.parse(request.body.read)
    user = request.cookies["user_id"]
    if user = nil
      render :json => { message: "Please Login To Create A Meal" }, :status => 401
    end
    newMeal = Meal.create(
      user_id: request.cookies["user_id"],
      is_public: data['is_public'],
      title: data['title'],
      desc: data['description']
    )
    data['image_url'].each do |image|
      MealPhoto.create(
        image_url: image,
        meal_id: newMeal['id']
      )
    end
    data['ingredients'].to_a.each do |ingredient| 
      MealIngredient.create(
        meal_id: newMeal['id'],
        product: ingredient[1]['name'],
        serving_size: ingredient[1]['servings']
      )
    end
    MealCategory.create(
      meal_id: newMeal['id'],
      category: data['size']
    )
    MealCategory.create(
      meal_id: newMeal['id'],
      category: data['type']
    )
    if Meal.exists?(newMeal.id)
      render :json => { message: "Successfully Created Entry" }
    else
      render :json => { message: "Error Creating Entry" }, :status => 400
    end
  end

  def destroy
    Meal.find(params[:id]).update(is_deleted: true)
    render :json => { message: "Deleted Entry" }
  end

  def update
    data = JSON.parse(request.body.read)
    # newData = {title: "New Title", desc: "New Description"}
    Meal.find(params[:id]).update(data)
    render :json => { message: "Updated Entry" }
  end

  def search
    #render json: Meal.where("title LIKE ? " , "%#{params['query']}%")
    render json: Meal.includes([:meal_photos, :meal_ingredients, :meal_categories, :user]).where({is_deleted: false, is_public: true}).where("title LIKE ? " , "%#{params['query']}%").limit(10), include: [:meal_photos, :meal_ingredients, :meal_categories, :user => {:only => :user_name}]
  end

  # private

  # def meal
  #   Meal.includes([:meal_photos, :meal_ingredients, :meal_categories, :user])
  # end

end
