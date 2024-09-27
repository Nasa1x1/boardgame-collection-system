import { makeAutoObservable, runInAction} from "mobx"
import { BoardGame } from "../models/boardgame";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { store } from "./store";
import { Profile } from "../models/profile";
import { router } from "../router/Routes";

export default class BoardGameStore{
    boardGameRegistry = new Map<string, BoardGame>();
    selectedBoardGame?: BoardGame = undefined;
    editMode = false; 
    loading = false;
    loadingInitial = false;
    loadingDelete = false;

    
    constructor(){
        makeAutoObservable(this);
    }

    get groupedBoardGames(){
        return Object.entries(
            this.boardGamesByDate.reduce((boardGames, boardGame)=> {
                const date=boardGame.releaseDate!.toISOString().split('T')[0];
                boardGames[date]=boardGames[date] ? [...boardGames[date],boardGame] : [boardGame];
                return boardGames;
            },{} as {[key:string]: BoardGame[]})
        )
    }

    get boardGamesByDate() {
        return Array.from(this.boardGameRegistry.values()).sort((a, b) => b.releaseDate!.getTime() - a.releaseDate!.getTime());
    }

    loadBoardGames= async() => {
        this.setLoadingInitial(true);
        try{
            const boardGames = await agent.BoardGames.list();
            boardGames.forEach(boardGame => {
                this.setBoardGame(boardGame);
            })
                this.setLoadingInitial(false);
        }catch (error){
            console.log(error);
            this.setLoadingInitial(false);

        }
    }

    loadBoardGame = async (id: string) => {
        let boardGame = this.getBoardGame(id);
        if (boardGame) {
            this.selectedBoardGame = boardGame;
            return boardGame;
        }
        else {
            this.setLoadingInitial(true);
            try {
                boardGame = await agent.BoardGames.details(id);
                this.setBoardGame(boardGame);
                runInAction(() => this.selectedBoardGame = boardGame);
                this.setLoadingInitial(false);
                return boardGame;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setBoardGame = (boardGame: BoardGame) => {
        const user = store.userStore.user;
        if (user) {
            boardGame.isOwning = boardGame.boardGameOwners!.some(
                a => a.username === user.username
            );
            
        }
        boardGame.releaseDate = new Date(boardGame.releaseDate!);
        this.boardGameRegistry.set(boardGame.id, boardGame);
    }

    private getBoardGame = (id: string) => {
        return this.boardGameRegistry.get(id);
    }

    setLoadingInitial = (state:boolean ) =>
    {
        this.loadingInitial = state;
    }

    
    createBoardGame = async (boardGame: BoardGame) => {
        this.loading = true;
        boardGame.id = uuid();
        try {
            await agent.BoardGames.create(boardGame);
            runInAction(() => {
                this.boardGameRegistry.set(boardGame.id, boardGame);
                this.selectedBoardGame = boardGame;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
    
    updateBoardGame = async (boardGame: BoardGame) => {
        this.loading = true;
        try {
            await agent.BoardGames.update(boardGame)
            runInAction(() => {
                this.boardGameRegistry.set(boardGame.id, boardGame);
                this.selectedBoardGame = boardGame;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateOwning = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.BoardGames.own(this.selectedBoardGame!.id);
            runInAction(() => {
                if (this.selectedBoardGame?.isOwning) {
                    this.selectedBoardGame.boardGameOwners = this.selectedBoardGame.boardGameOwners?.filter(a => a.username !== user?.username);
                    this.selectedBoardGame.isOwning = false;
                } else {
                    const owner = new Profile(user!);
                    this.selectedBoardGame?.boardGameOwners?.push(owner);
                    this.selectedBoardGame!.isOwning = true;
                }
                this.boardGameRegistry.set(this.selectedBoardGame!.id, this.selectedBoardGame!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }
    
    deleteBoardGame = async (id: string) => {
        this.loadingDelete = true;
        try {
            await agent.BoardGames.delete(id);
            runInAction(() => {
                this.boardGameRegistry.delete(id);
                this.loadingDelete = false;
                router.navigate('/boardgames');
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingDelete = false;
            })
        }
    }
}

    
