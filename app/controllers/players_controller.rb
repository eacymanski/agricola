class PlayersController < ApplicationController

  def update
    player = Player.find(params[:id])
    player.update!(player_params)

    WaitingRoomChannel.broadcast_to(player.game, { players: player.game.players } )
  end

  def player_params
    params.require(:player).permit(:name)
  end

end
