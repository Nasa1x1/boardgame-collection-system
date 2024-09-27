import { Link } from "react-router-dom";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { BoardGame } from "../../models/boardgame";
import { format } from "date-fns";

interface Props
{
    boardGame:BoardGame;
}
export default function BoardGameListItem({boardGame}:Props)
{
    return (
        <Segment>
            <Item.Group>
                <Item>
                    <Link to={`/boardgames/${boardGame.id}`}>
                        <Item.Image floated="left" size="small" src={'/assets/placeholder.png'} />
                    </Link>

                    <Item.Content>
                    <Item.Header as={Link} to={`/boardgames/${boardGame.id}`}> {boardGame.title}</Item.Header>
                        <Item.Meta>
                            <span>Released: {format(boardGame.releaseDate!, 'dd MM yyyy')}</span>
                        </Item.Meta>
                        <Item.Description>{boardGame.description}</Item.Description>
                        <Item.Extra>
                            <Label basic content={`Category: ${boardGame.category}`} />
                            <Label basic content={`Players: ${boardGame.minPlayers} - ${boardGame.maxPlayers}`} />

                            <Button 
                                as={Link} 
                                to={`/boardgames/${boardGame.id}`} 
                                floated="right" 
                                color="blue" 
                                content="View Details" 
                            />

                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    );
}