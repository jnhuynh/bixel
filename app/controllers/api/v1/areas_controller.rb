class Api::V1::AreasController < ApplicationController
  def index
    @areas = Area.all
    render(:json => @areas)
  end

  def show
    @area = Area.where(:id => params[:id]).first
    render(:json => @area)
  end
end
