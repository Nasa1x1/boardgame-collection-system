import { Grid } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "../../Loading";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import BoardGameDetailsHeader from "./BoardGameDetailsHeader";



export default observer(function ActivityDetails() {
    const { boardGameStore, userStore } = useStore();
    const { selectedBoardGame: boardGame, loadBoardGame, loadingInitial } = boardGameStore;
    const { user } = userStore; 
    const { id } = useParams();

    useEffect(() => {
        if (id) loadBoardGame(id);
    }, [id, loadBoardGame]);

    if (loadingInitial || !boardGame) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='16'>
                <BoardGameDetailsHeader boardGame={boardGame} user={user!}/>
    
            </Grid.Column>
       
        </Grid>
    )
})