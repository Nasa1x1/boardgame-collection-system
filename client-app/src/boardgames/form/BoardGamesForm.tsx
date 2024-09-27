import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../../stores/store';
import { BoardGame } from '../../models/boardgame';
import DateInput from '../../form/DateInput';
import { categoryOptions } from '../../form/Options';
import SelectInput from '../../form/SelectInput';
import TextInput from '../../form/TextInput';
import TextAreaInput from '../../form/TextArea';
import NumberInput from '../../form/NumberInput';


export default observer(function BoardGameForm() {
    const {boardGameStore} = useStore();
    const {createBoardGame, updateBoardGame, 
        loading, loadBoardGame} = boardGameStore;
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [boardGame, setBoardGame] = useState<BoardGame>({
        id:'',
        title:'',
        releaseDate:null,
        description:'',
        category:'',
        maxPlayers:1,
        minPlayers:1
    });

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        releaseDate: Yup.string().required('Date is required').nullable(),
        description: Yup.string().required(),
        category: Yup.string().required(),
        maxPlayers: Yup.number().required(),
        minPlayers: Yup.number().required(),
    });

    useEffect(() => {
        if (id) loadBoardGame(id).then(boardGame => setBoardGame(boardGame!));
    }, [id, loadBoardGame]);
 

    function handleFormSubmit(boardGame: BoardGame) {
        if (boardGame.id.length === 0) {
            let newBoardGame = {
                ...boardGame,
                id: uuid()
            };
            createBoardGame(newBoardGame).then(() => navigate(`/boardgames/${newBoardGame.id}`))
        } else {
            updateBoardGame(boardGame).then(() => navigate(`/boardgames/${boardGame.id}`))
        }
    }

    

    return(
        <Segment clearing>
             <Header content='Boardgame Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={boardGame}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <TextInput name='title' placeholder='Title' />
                        <DateInput name='releaseDate' placeholderText='ReleaseDate' dateFormat='MMMM d' />
                        <TextAreaInput rows={3} name='description' placeholder='Description' />
                        <SelectInput options={categoryOptions} name='category' placeholder='Category' />
                        <NumberInput name='maxPlayers' placeholder='MaxPlayers' />
                        <NumberInput name='minPlayers' placeholder='MinPlayers' />

                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/boardgames' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})