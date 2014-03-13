class Api::V1::PlayersController < ApplicationController
  def index
    @players = Player.all
    render(:json => @players)
  end

  def show
    @player = Player.where(:id => params[:id]).first
    render(:json => @player)
  end

  def update
    @player = Player.where(:id => params[:id]).first
    @area   = Area.where(:id => params[:player][:area]).first

    @player.area = @area
    @player.save

    render(:json => @player)
  end
end
