class GamesController < ApplicationController
  def play
  end

  def lobby
    @games = Game.all
  end

  def waiting_room
    @game = Game.find(params[:id])
    @players = @game.players

    @player = Player.find_or_create_by(user: current_user, game: @game) do |new_player|
      new_player.name = random_name
      new_player.save!
    end

    WaitingRoomChannel.broadcast_to(@game, { players: @game.players } )
  end

  def random_name
    [
      ['Mr', 'Mrs', 'Sir', 'Lady', 'Poor'].sample,
      ['Fanny', 'Dick', 'Sam', 'Yellow', 'White'].sample,
      ['Duster', 'Clumpkin', 'Dick', 'Noodle', 'Popper', 'Queen', 'Rumpler'].sample,
    ].join(' ')
  end
end
