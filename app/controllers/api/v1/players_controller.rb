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

    x         = params[:player][:x]
    y         = params[:player][:y]
    direction = params[:player][:direction]

    @player.x         = x.present? ? x : 0
    @player.y         = y.present? ? y : 0
    @player.direction = direction.present? ? direction : 0

    @player.save

    render(:json => @player)
  end
end
