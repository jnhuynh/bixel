class Api::V1::AreasController < ApplicationController
  def index
    @areas = Area.all
    render(:json => @areas)
  end

  def show
    @area = Area.where(:id => params[:id]).first
    render(:json => @area)
  end

  def update
    if params[:area][:players].present?
      @players = params[:area][:players].map do |player_id|
        Player.where(:id => player_id).first
      end
      @players = @players.uniq.compact
    else
      @players = []
    end

    @area = Area.where(:id => params[:id]).first
    @area.players = @players
    @area.save

    render(:json => @area)
  end
end
