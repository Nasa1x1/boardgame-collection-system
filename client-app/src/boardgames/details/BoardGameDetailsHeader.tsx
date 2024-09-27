import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Image, Grid, Icon, Divider } from 'semantic-ui-react';
import { BoardGame } from '../../models/boardgame';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { User } from '../../models/user';
import { useStore } from '../../stores/store';


interface Props {
    boardGame: BoardGame;
    user: User;
}

export default observer(function BoardGameDetails({ boardGame,user }: Props) {
    const isAdmin = user?.roles?.includes("admin");
    const {boardGameStore :{ loading, updateOwning, deleteBoardGame,loadingDelete} } = useStore();
    
    return (
        <Segment padded>
            <Grid>
              
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                        <Image 
                            src='./../assets/placeholder.png' 
                            size='large'
                            bordered 
                            rounded 
                            centered 
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header as='h1' textAlign='center'>
                            {boardGame.title}
                        </Header>
                        <Divider />
                        <Header as='h3' color='grey' textAlign='center'>
                            Released: {format(boardGame.releaseDate!, 'dd MM yyyy')}
                        </Header>
                        <p style={{ fontSize: '1.2em', textAlign: 'center', marginTop: '1em' }}>
                            Category: {boardGame.category}
                            <br></br><br></br>
                            {boardGame.description}
                            
                            </p>

               
                      
                        <p style={{ fontSize: '1.2em', textAlign: 'center' }}>
                            <Icon name='users' size='large' />
                            {boardGame.minPlayers} - {boardGame.maxPlayers} players
                        </p>

                        <p style={{ fontSize: '1.2em', textAlign: 'center' }}> People owning game: {boardGame.boardGameOwners && boardGame.boardGameOwners.length}</p>
                    </Grid.Column>
                </Grid.Row>

                <Divider />

                <Grid.Row>
                    <Grid.Column textAlign='center'>
                    {isAdmin && (
                        <>
                        <Button as={Link} to={`/manage/${boardGame.id}`} primary icon labelPosition='left' style={{ marginRight: '10px' }}>
                            <Icon name='settings' />
                            Manage Board Game
                        </Button>
                        <Button onClick={(event, data) => deleteBoardGame(boardGame.id)}   loading={loadingDelete} color='red' icon labelPosition='left' style={{ marginRight: '10px' }}>
                        <Icon name='trash' />
                        Delete Board Game
                    </Button>
                    </>
                    )}
                          {boardGame.isOwning ? (
                        <Button onClick={updateOwning}  loading={loading} color='red' icon labelPosition='left'>
                        <Icon name='trash' />
                        Remove from Collection
                    </Button>
                            ) : (
                                <Button onClick={updateOwning}  loading={loading} color='green' icon labelPosition='left' style={{ marginRight: '10px' }}>
                                <Icon name='plus' />
                                Add to Collection
                            </Button>
                         )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
});

