class Api::V1::LevelsController < ApplicationController
  def index
    render(:json => Level.all)
  end

  def show
    render(:json => Level.find(params[:id]))
  end

  def create
    level = Level.new(level_params)

    level.save
    render(:json => level)
  end

  def update
    level = Level.find(params[:id])
    level.update_attributes(level_params)

    render(:json => level)
  end

  def destroy
    level = Level.find(params[:id])
    level.destroy

    render(:json => level, :status => 204)
  end

  private

    def level_params
      params.require(:level).permit(:name, :width, :height)
    end
end
