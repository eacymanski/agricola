import React from "react"
import PropTypes from "prop-types"
class WaitingRoom extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentPlayer:  props.currentPlayer,
      players:        props.players,
      editingName:    false
    }
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

  toggleEditName = (player) => {
    this.setState({editingName: !this.state.editingName});

    var newName = $('#new-name').val();
    if(newName && newName!=this.state.currentPlayer.name) {
      this.updatePlayerName(newName);
    }
  }

  updatePlayerName(newName) {
    console.log('updating player name:' + newName);
    $.ajax({
      url: '/players/'+this.state.currentPlayer.id,
      dataType: 'JSON',
      data: { player: { name: newName } },
      type: 'PUT',
      success: function(result) {
        console.log('Name changed!');
      }
    });
  }

  render () {
    var currentPlayer = this.state.currentPlayer;
    return (
      <React.Fragment>
        <h1>Game: { this.props.game.name } </h1>
        <h2>Welcome to the game { this.state.currentPlayer.name }!</h2>
        <h2>Players:</h2>
        <ul>
        {this.state.players.map((player, index) => {
            return(
                <React.Fragment>
                <li key= { index }>
                { (((player.id==currentPlayer.id) && !this.state.editingName) || !(player.id==currentPlayer.id)) && player.name }
                { (player.id==currentPlayer.id) && this.state.editingName && <input id='new-name' type='text' defaultValue={player.name} /> }
                { (player.id==currentPlayer.id) && <button onClick={()=>this.toggleEditName(player)}>Change Name</button> }
                </li>
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
  currentPlayer: PropTypes.object,
  players: PropTypes.array
};
export default WaitingRoom
