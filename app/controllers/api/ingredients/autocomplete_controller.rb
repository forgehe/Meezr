class Api::Ingredients::AutocompleteController < ApplicationController
  def index
    queryParams = request.query_parameters
    search = AutoCompleteIngredientSearch.new(queryParams['query'], 10)
    render :json => search.get_ingredient_info
  end
end
