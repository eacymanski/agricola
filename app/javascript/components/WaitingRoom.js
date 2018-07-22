import React from "react"
import PropTypes from "prop-types"
class WaitingRoom extends React.Component {

  state = {
    current_player:  this.props.current_player,
    players:         this.props.players
  }

  componentDidMount() {
    this.setupSubscription();
  }

  updatePlayerList(raw_players) {
    this.setState({players: raw_players});
  }

  setupSubscription(){

    App.comments = App.cable.subscriptions.create("WaitingRoomChannel", {
      game_id: this.props.game.id,
      context: this,

      connected: function () {
        setTimeout(() => this.perform('follow',
              { game_id: this.game_id}), 1000 );
      },

      received: function (data) {
        console.log('incoming message');
        this.context.updatePlayerList(data.players);
      },

      updatePlayerList: this.updatePlayerList

    });
  }

  render () {
    return (
      <React.Fragment>
        <h1>Game: { this.props.game.name } </h1>
        <h2>Welcome to the game { this.state.current_player.name }!</h2>
        <h2>Players:</h2>
        <ul>
        {this.state.players.map(function(player, index) {
            return(
                <React.Fragment>
                <li key= { index }>
                {player.name}
                </li>
                <div key={index}>{ if(player.id==this.state.current_player.id){ <a>Change Me</a>} }</div>
                </React.Fragment>
                );
        })}
        </ul>
      </React.Fragment>
    );
  }
}

WaitingRoom.propTypes = {
  game: PropTypes.object,
  current_player: PropTypes.object,
  players: PropTypes.array
};
export default WaitingRoom
