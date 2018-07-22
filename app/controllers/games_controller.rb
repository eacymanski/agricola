class GamesController < ApplicationController
  def play
  end

  def lobby
    @games = Game.all
  end

  def waiting_room
    @game = Game.find(params[:id])
  end
end
