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
    player   = Player.find(params[:id])
    old_level = player.level

    player.update_attributes(player_params)
    new_level = player.level

    entered_level = (old_level.nil?) && (!new_level.nil?)
    exited_level  = (!old_level.nil?) && (new_level.nil?)
    in_level      = !new_level.nil?

    # Publish our updated info to all clients subscribed our level.
    if (entered_level || in_level)
      channel_name = "level#{new_level.id}".to_sym
      json         = new_level.active_model_serializer.new(new_level).to_json
      WebsocketRails[channel_name].trigger(:updated, json)
    elsif (exited_level)
      channel_name = "level#{old_level.id}".to_sym
      json         = old_level.active_model_serializer.new(old_level).to_json
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
