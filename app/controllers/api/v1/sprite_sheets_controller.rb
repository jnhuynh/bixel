class Api::V1::SpriteSheetsController < ApplicationController
  def index
    render(:json => SpriteSheet.all)
  end

  def show
    render(:json => SpriteSheet.find(params[:id]))
  end

  def create
    sprite_sheet = SpriteSheet.new(sprite_sheet_params)

    sprite_sheet.save
    render(:json => sprite_sheet)
  end

  def update
    sprite_sheet = SpriteSheet.find(params[:id])
    sprite_sheet.update_attributes(sprite_sheet_params)

    render(:json => sprite_sheet)
  end

  def destroy
    sprite_sheet = SpriteSheet.find(params[:id])
    sprite_sheet.destroy

    render(:json => sprite_sheet, :status => 204)
  end

  private

    def sprite_sheet_params
      params.require(:sprite_sheet).permit(:player_id, :state)
    end
end
