class Api::Ingredients::VisualizeNutritionController < ApplicationController
  def index
    data = JSON.parse(request.body.read)
    ingredients = VisualizeNutrition.new(data['ingredients'], 1)
    render :html => ingredients.get_nutrition_widget.html_safe
  end
end
