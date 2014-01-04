class Api::V1::PlayersController < ApplicationController
  def index
    render(:json => Player.all)
  end

  def show
    render(:json => Player.find(params[:id]))
  end

  def create
    player = Player.new(player_params)

    player.save
    render(:json => player)
  end

  def update
    player = Player.find(params[:id])
    player.update_attributes(player_params)

    level = player.level
    if (!level.nil?)
      # Publish our updated info to all clients subscribed our level.
      channel_name = "level#{level.id}".to_sym
      json         = level.active_model_serializer.new(level).to_json
      WebsocketRails[channel_name].trigger(:updated, json)
    end

    render(:json => player)
  end

  def destroy
    player = Player.find(params[:id])
    player.destroy

    render(:json => player, :status => 204)
  end

  private

    def player_params
      params.require(:player).permit(:name, :x, :y, :level_id)
    end
end
