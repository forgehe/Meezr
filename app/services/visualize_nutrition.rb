require 'faraday'
require 'json'
require 'dotenv'
require "uri"
require "net/http"
Dotenv.load

#Displays the images of the ingredients used in a recipe.
class VisualizeNutrition

  attr_accessor :id, :defaultCss

  def initialize(ingredientList, servings)
    @ingredientList = ingredientList
    @servings = servings
  end

  def get_nutrition_widget
    begin
      data = {
        ingredientList: @ingredientList.join("\n"),
        defaultCss: true,
        servings: @servings,
        showBacklink: true
      }

      connection = Faraday.new(
        url: 'https://api.spoonacular.com/recipes/',
        params: {apiKey: ENV['API_KEY']},
      )
  
      response = connection.post('visualizeNutrition') do |request|
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        request.body = URI.encode_www_form(data)
      end
  
      data = response.body
      # data.delete! '\\'
      # pp data
      data
    rescue Exception => e 
      status = e.response[:status]
      response = JSON.parse(e.response[:body])
      puts "Error #{status} occurred. #{response["message"]}"
    end
  end
end

# ingredient_images = IngredientWidget.new('1082038')
# ingredient_images.get_nutrition_widget
