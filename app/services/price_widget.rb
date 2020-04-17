require 'faraday'
require 'json'
require 'dotenv'
require "uri"
require "net/http"
Dotenv.load

#

#Uses the meal id to retreive the nutrition widet. 
class PriceWidget

  attr_accessor :id, :defaultCss

  def initialize(id)
    self.id = id
    self.defaultCss = true
  end

  def get_nutrition_widget
    connection = Faraday.new(
      url: 'https://api.spoonacular.com/recipes/',
      params: {apiKey: ENV['API_KEY']},
    )

    response = connection.get(self.id+'/ingredientWidget') do |request|
      request.params['id'] = self.id
      request.params['defaultCss'] = self.defaultCss
    end

    return nil if response.status != 200
  
    data = response.body
    data.delete! '\\'
    puts data
  end
end

# meal_cals = PriceWidget.new('1082038')
# meal_cals.get_nutrition_widget