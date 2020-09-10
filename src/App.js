import React, { useEffect, useState } from 'react';
import './App.css';

import Gameroom from "./components/Gameroom/Gameroom";
import Login from "./components/Login"
import GamesList from "./components/host_games_list/GamesList";
import PlayerLobby from "./components/player_lobby/PlayerLobby";
import Create from "./components/Create/Create";
import Edit from "./components/Edit/Edit";
import JoinLobby from './components/JoinLobby';
import Join from './components/join_games_list/Join';
import ManageAccount from './components/ManageAccount/ManageAccount';
import ErrorLogIn from './components/Error/ErrorLogIn';
import createdContext from "./components/Create/createdContext";
import UserContext from "./components/Gameroom/UserContext";
import createContext from "./components/createContext";
import Profile from "./components/Profile/Profile";
import LandingPage from './components/landing_page/LandingPage'; //<-- new
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


//material-ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      // color: 'white'
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
    navPosition: {
      position: 'fixed'
    }
}));



export default function App(props) {
  const socket = props.socket;
  const [initilized, setInitialized] = useState(false);
  const [gameCode, setGameCode] = useState();
  const [lplayers, setLplayers] = useState({});
  const [user, setUser] = useState();
  const [gamerTag, setGamerTag] = useState();
  const [start, setStart] = useState(0);
  const [players, setPlayers] = useState();
  const [questions, setQuestions] = useState();
  const [gameDis, setGameDis] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [answered, setAnswered] = useState(false);
  const [whichAns, setWhichAns] = useState();
  const [sign, setSign] = useState(false);
  const [quizlist, setQuizlist] = useState({});
  const [category, setCategory] = useState({});
  const [initilizedQuiz, setInitializedQuiz] = useState(false);
  const [currentgame, setCurrentgame] = useState();
  const [joinView, setJoinView] = useState(false);
  const [lobbyFlag, setLobbyFlag] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [loadGame, setLoadGame] = useState(false);

  const [loadManageAccount, setLoadManageAccount] = useState(false);

  const [displayCode, setDisplayCode] = useState('');
  
  const [quiz, setQuiz] = useState();
  const [title, setTitle] = useState();
  const [clicked, setClicked] = useState(false);
  const [userQuizzes, setUserQuizzes] = useState();
  const [refresh, setRefresh] = useState(0);

  //Material-UI
  const classes = useStyles();
  
  const createQuiz = (gameTitle, category, questions, numOfQuestions, difficulty, username)=>{
    socket.emit('createdQuiz', {gameTitle, category, questions, numOfQuestions, difficulty, username});
  }

  const loadProfilePage = (user) => {
    socket.emit('requestUserCreatedQuizzes', user);
    socket.on('receivedUserCreatedQuizzes', (data=>{
      setUserQuizzes(data);
      setLoadManageAccount(true);
    }));
  };




  const editQuiz = (gameTitle, category, questions, numOfQuestions, difficulty, oldQuizId, username)=>{
    socket.emit('editedQuiz', {gameTitle, category, questions, numOfQuestions, difficulty, oldQuizId, username});
    setClicked(false);
    loadProfilePage(user);
  }
  

  const bar = (quizid) => {
    socket.emit('quizToEdit', quizid);
    socket.once('editThisQuiz', (QAndAs => {
      setQuiz(QAndAs);
      setClicked(true);
    }))
    socket.once('editThisQuizTitle', (res => {
      setTitle(res);
    }))
    
  }

  const clickfunc = () => {
    bar();
  }
  
  

  socket.once('playersCurrentRanking', (ranking=>{
    setPlayers(ranking);
  }));
  socket.once('refreshHost', (flag)=>{
    setInitializedQuiz(false);
    setRefresh(flag);
  })
  socket.on('waitStart', (start)=>{
    if(lobbyFlag && start === currentgame){
      setStart(1);
    }else if(start === currentgame){

    }
  })

  socket.once('gameslist', (data=>{
    setQuizlist(data);
    setInitializedQuiz(true);
  }));

  socket.on('playersInLobby', (p)=>{
    if(p.game === currentgame && gamerTag){
      setLobbyFlag((x)=>{
        setLplayers(p.players);
        return true;
      });
    }
  });
  
  useEffect(()=>{    
    setGameDis(<Gameroom
      key={currentgame}
      players={players}
      questions ={questions}
      />);
  },[players, questions]);

  const sendAns=(gamer, score)=>{
    socket.emit("updateScore", {gamer, score, currentgame});
  }

  const verifyLogin = (username, password)=>{
    socket.emit('userL', {username, password});
    socket.once("loggedUser", (logged)=>{
      if(logged){
        setUser(logged);
      }else{
        alert("Wrong username and password!");
      }
    })
  }
  const logout = ()=>{
    if(user){
      setUser(null);
    }
  }
  const register = (u, p)=>{
    socket.emit("register", {username: u, password: p});
    socket.once("reggedUser", (logged)=>{
      if(logged){
        setUser(logged);
      } else{
        alert("The username already taken");
      }
    })
  }
  const fetchAndSetQuestions = (id)=>{
    socket.emit('gameID', id);
    socket.on('GameroomQ', (qa)=>{
      setQuestions(qa);
    });
  }
    
  const gamecodeGen = ()=>{
    let result = '';
    const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 8; i++){
      result += alph.charAt(Math.floor(Math.random() * alph.length));
    }
    return result;
  }

  const createGame = async (quiz_id)=>{ // ---
    let gamecode = gamecodeGen();
    let is_active = true;
    setDisplayCode(gamecode);
    socket.emit('hostableGame', {quiz_id, gamecode, is_active});
    socket.on('hostedGame', (current_game)=>{
      setCurrentgame(current_game);
      setJoinView(true);
    })
  };
  const enterRoom = (displayName, gameid)=>{
    socket.emit('playerJoin', {gamertag: displayName, game_id: gameid,
    is_host: isHost});
    setGamerTag(displayName);
    fetchAndSetQuestions(gameid);
  }

  //cancel selected game & delete game code from db
  const cancelGame = (gameid)=>{
    socket.emit('cancelGame', gameid);
    setJoinView(false);
    setCurrentgame(null);
    socket.on('confirmMessage', (message) => {
    })
  }

  const joinButton = (gameC)=>{
    setDisplayCode(gameC);
    socket.emit("joinGame", gameC);
    socket.on('joinedGame',(gamid)=>{
      setCurrentgame(gamid);
      setJoinView(true);
    })
  }

  //goes back to join after you have entered code
  const cancelCodeInput = () => {
    setGameCode(null);
    setJoinView(false);
  };
  
  const startGame = ()=>{
    socket.emit("startgame", currentgame);
  }
  


  // ----- Host Page for Games List -----//
  useEffect(()=>{
    socket.emit('hostGames', '1');
  },[userQuizzes, refresh]);
    


  const displayUser = () => {
    return (!user ? ( <div className="App-login">

      <Link to="/profile" style={{ textDecoration: 'none' }} className="link-color">
                      <Typography variant="h7" className="typo-style-login typo-font-login">Login/Sign Up</Typography>
                    </Link>
    </div>) 
    : 
    (<div>
      <Typography variant="h7" className="typo-font-gameplay gamertag-nav">{user.username}</Typography>
      <button className="sizing-button-nav" onClick = {logout}>
        Logout     
      </button>
    </div>)
    )
  }

  const managingAccount = () => {
    if (user) {
      return (
      // <Link to="/manageaccount" style={{ textDecoration: 'none' }}>
      //   <Button onClick={(() => loadProfilePage(user))}>Manage Account</Button>
      // </Link>
      <Link to="/manageaccount" onClick={() => loadProfilePage(user)} style={{ textDecoration: 'none' }} className="link-color">
      <Typography variant="h7" className="typo-style-login typo-font-login">My Quizzes</Typography>
    </Link>)
    }
  }

  const navBar = () => {
    if (joinView || lobbyFlag) {

      return (<nav className="nav-style">
                <div className="App-nav">

                <Typography variant="h5" className="typo-style typo-font-gameplay">RE-SOLVE</Typography>
                  <div className="App-nav App-login-buttons">
                    {!user ? ('') : (<Typography variant="h6">{user.username}</Typography>)}
                  </div>
                </div>
              </nav>)
    } else {
      return (<nav className="nav-style">
                <div className="App-nav">
                    <Link to="/" style={{ textDecoration: 'none' }} className="link-color">
                      <Typography variant="h5" className="typo-style typo-font">RE-SOLVE</Typography>
                    </Link>
                  <div className="App-nav-login">
                    {managingAccount()}
                    {displayUser()}
                  </div>
                </div>
              </nav>)
    }
  }

  return (
    <div className="App">
      <Router>
        {navBar()}

        <header className="App-header">
        {/* <body> */}
          <Switch>
            {<Route path="/manageaccount">
              <createContext.Provider value = {{setUserQuizzes, userQuizzes, editQuiz, quiz, setQuiz, title, 
                setTitle, clickfunc, bar, username, user, loadProfilePage, setClicked}}>
                {(user && clicked) ? <Edit /> : ((user && loadManageAccount) ? <ManageAccount/> : <ErrorLogIn/>)}
              </createContext.Provider>
            </Route>}

            <Route exact path="/">
              <createContext.Provider>
              <LandingPage/>
              </createContext.Provider>
            </Route>

            <Route path="/profile">
              <UserContext.Provider value = {{user, setUser, verifyLogin, 
                username, setUsername, password, setPassword, logout, 
                gamerTag, answered, setAnswered, whichAns, setWhichAns, 
                sendAns, setPlayers, register, currentgame, setCurrentgame}}>
                <Profile/>
              </UserContext.Provider>
            </Route>


            <Route path="/create">
              <createContext.Provider value = {{createQuiz, user}}>
                <Create/>
              </createContext.Provider>
            </Route>

            <Route path="/host">
              <createContext.Provider value={{createGame, enterRoom, isHost, setIsHost, cancelGame, 
              currentgame, gamerTag, setGamerTag, startGame, displayCode, quizlist
              }}>
              <UserContext.Provider value = {{user, setUser, verifyLogin, 
                username, setUsername, password, setPassword, logout, 
                gamerTag, answered, setAnswered, whichAns, setWhichAns, 
                sendAns, setPlayers, register, currentgame, setCurrentgame, 
                isHost, setIsHost, enterRoom, setJoinView, setLobbyFlag, setStart}}>
                  {(start) ? gameDis : ((lobbyFlag && joinView) ? (<PlayerLobby players={lplayers}/>) :( (joinView && !lobbyFlag) ? <JoinLobby/> : (initilizedQuiz ? <GamesList/> : "")))}
              </UserContext.Provider>
              </createContext.Provider>
            </Route>

            <Route path="/join">
              <createContext.Provider value={{createGame, enterRoom, isHost, setIsHost, cancelGame, currentgame, gamerTag, setGamerTag, joinButton, gameCode, setGameCode, startGame, cancelCodeInput, displayCode
              }}>
                <UserContext.Provider value = {{user, setUser, verifyLogin, 
                  username, setUsername, password, setPassword, logout, 
                  gamerTag, answered, setAnswered, whichAns, setWhichAns, 
                  sendAns, setPlayers, register, currentgame, setCurrentgame, 
                  isHost, setIsHost, enterRoom, setJoinView, setLobbyFlag, setStart}}>
                {(start) ? gameDis : ((lobbyFlag && joinView) ? (<PlayerLobby players={lplayers}/>) :( (joinView && !lobbyFlag) ? <JoinLobby/> : <Join/>))}
                </UserContext.Provider>
              </createContext.Provider> 
            </Route>  

          </Switch>
        </header>
      </Router>
    </div>


  )
}

