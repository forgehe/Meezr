require 'faraday'
require 'json'
require 'dotenv'
require "uri"
Dotenv.load

#Extract an ingredient from plain text.
class ParsedIngredientInfo

  attr_accessor :ingredientList, :servings, :includeNutrition

  def initialize(ingredientList, servings)
    @ingredientList = ingredientList
    @servings = servings
  end


  def parsed_ingredient_info

    begin
      data = {
        ingredientList: @ingredientList.join("\n"),
        includeNutrition: true,
        servings: @servings
      }
  
      connection = Faraday.new(
        url: 'https://api.spoonacular.com/recipes/',
        params: {apiKey: ENV['API_KEY']},
      ) 
      # do |c|
      #   pp c
      # c.use Faraday::Response::RaiseError
      # end
  
      response = connection.post('parseIngredients') do |request|
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        request.body = URI.encode_www_form(data)
      end
    
      if response.status != 200
        # pp "error"
        Faraday::Response::RaiseError
      end
      data = JSON.parse(response.body)
      return data
    rescue Exception => e 
      status = e.response[:status]
      response = JSON.parse(e.response[:body])
      puts "Error #{status} occurred. #{response["message"]}"
    end
  end
end

# test = ParsedIngredientInfo.new(["3 oz pork shoulder", "banana"], 2)
# pp test.parsed_ingredient_info