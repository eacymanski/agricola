import React from "react"
import PropTypes from "prop-types"
class GameList extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h1>Join Game</h1>
        <ul>
        {this.props.games.map(function(game, index) {
            var path = "/games/" + game.id + "/waiting_room"
            return <li key= { index }><a href= {path}> {game.name}</a></li>;
                                         })}
        </ul>
      </React.Fragment>
    );
  }
}

GameList.propTypes = {
  games: PropTypes.array
};
export default GameList
