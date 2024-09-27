import React, { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import BoardGameListItem from "../boardgames/dashboard/BoardGameListItem";

export default observer(function BoardGameList({ boardGames }) {
  return (
    <>
      {boardGames.map((boardGame) => (
        <Fragment key={boardGame.id}>
          {/* Include any grouping headers if necessary */}
          {/* <Header sub color="black">{group}</Header> */}
          <Segment>
            <Item.Group divided>
              <BoardGameListItem key={boardGame.id} boardGame={boardGame} />
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
});