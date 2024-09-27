import { Header, Item,Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import BoardGameListItem from "./BoardGameListItem";
import { Fragment } from "react/jsx-runtime";


export default observer(function BoardGameList(){
    const {boardGameStore} = useStore();
    const {groupedBoardGames}=boardGameStore;
 

 
    return(
        <>
            {groupedBoardGames.map(([group, boardGames]) =>(
                <Fragment key={group}>
                    <Header sub color='black'>{group}</Header>
                    <Segment>
                        <Item.Group divided>
                        {boardGames.map(boardGame => (
                            <BoardGameListItem key={boardGame.id} boardGame={boardGame} />
                        ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>
        
    )
})