import { Grid, Header} from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../Loading";
import BoardGameList from "./BoardGameList";



export default observer(function BoardGameDashboard() 
{
    const {boardGameStore} = useStore();
    const {loadBoardGames, boardGameRegistry} = boardGameStore;
    useEffect(() => {
        if (boardGameRegistry.size <= 1) loadBoardGames();
    }, [loadBoardGames])
  
    if (boardGameStore.loadingInitial) return <LoadingComponent content='Loading app...' />
    return (
        <Grid>
            <Grid.Column width='16'>
                <Header as='h2' content='Newest BoardGames' textAlign='center' style={{ marginBottom: '20px' }} />
                <BoardGameList/>
            </Grid.Column>
            
        </Grid>
    )
})
