class Api::V1::PlayersController < ApplicationController
  def index
    @players = Player.all
    render(:json => @players)
  end

  def show
    @player = Player.where(:id => params[:id])
    render(:json => @player)
  end
end
