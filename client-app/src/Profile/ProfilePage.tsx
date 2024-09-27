import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Segment, Item } from "semantic-ui-react";
import LoadingComponent from "../mainpage/Loading";
import { useStore } from "../stores/store";
import BoardGameListItem from "../boardgames/dashboard/BoardGameListItem";

export default observer(function ProfilePage() {
    const { username } = useParams();
    const { profileStore } = useStore();
    const { loadProfile, profile, loadingProfile } = profileStore;

    useEffect(() => {
        if (username) loadProfile(username);
    }, [username, loadProfile]);

    if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

    if (!profile) return <p>Profile not found</p>;

    return (
        <Grid>
            <Grid.Column width='16'>
                <h1>{profile.displayName}'s Profile</h1>
               

                <h3>Owned Board Games: {profile.boardGames?.length}</h3>

                {profile.boardGames && profile.boardGames.length > 0 ? (
                    <Segment>
                        <Item.Group divided>
                            {profile.boardGames.map(boardGame => (
                                <BoardGameListItem key={boardGame.id} boardGame={boardGame} />
                            ))}
                        </Item.Group>
                    </Segment>
                ) : (
                    <p>No board games found.</p>
                )}
            </Grid.Column>
        </Grid>
    );
});