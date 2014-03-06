class Api::V1::AreasController < ApplicationController
  def index
    @areas = Area.all
    render(:json => @areas)
  end
end
