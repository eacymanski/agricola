class WaitingRoomChannel < ApplicationCable::Channel

  def follow(data)
    game = Game.find(data['game_id'])
    stream_for game
  end

end
