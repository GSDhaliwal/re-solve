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
// const game_id = 1;


//material-ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
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
  link: {
    margin: theme.spacing(1, 1.5),
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
  //make sure to SET FALSE TO JOIN PAGE
  const [isHost, setIsHost] = useState(false);
  const [loadGame, setLoadGame] = useState(false);

  const [loadManageAccount, setLoadManageAccount] = useState(false);

  const [displayCode, setDisplayCode] = useState('');
  
  const [quiz, setQuiz] = useState();
  const [title, setTitle] = useState();
  const [clicked, setClicked] = useState(false);
  const [userQuizzes, setUserQuizzes] = useState();


  //Material-UI
  const classes = useStyles();
  
  const createQuiz = (gameTitle, category, questions, numOfQuestions, difficulty, username)=>{
    socket.emit('createdQuiz', {gameTitle, category, questions, numOfQuestions, difficulty, username});
  }

  const loadProfilePage = (user) => {
    socket.emit('requestUserCreatedQuizzes', user);
    socket.on('receivedUserCreatedQuizzes', (data=>{
      console.log("did we get it back?", data );
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
      console.log("HERE", QAndAs)
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
  
  
  //===/gur//
  

  socket.once('playersCurrentRanking', (ranking=>{
    setPlayers(ranking);
    console.log("ranking?:",ranking);
  }));

  socket.on('waitStart', (start)=>{
    console.log("start:",start);
    console.log("current gameid", currentgame);
    if(lobbyFlag && start === currentgame){
      setStart(1);
    }else if(start === currentgame){
      console.log("my name: ", gamerTag);
      console.log("start: ", start);
      console.log("my game: ", currentgame);
      console.log("The host started without you");
    }
  })

  socket.once('gameslist', (data=>{
    console.log("inside socket games list");
    setQuizlist(data);
    setInitializedQuiz(true);
  }));

  socket.on('playersInLobby', (p)=>{
    if(p.game === currentgame && gamerTag){
      console.log(gamerTag);
      setLobbyFlag((x)=>{
        setLplayers(p.players);
        return true;
      });
    }
  });
  
  //------- Felipe -------------->//
  //   useEffect (() => {
  //   // socket.emit('hostGames', '1');
  //   // console.log("log after socket emit - hostGames");
  //   socket.emit('listplayers', gameCode);
  //   socket.on('playerslist', (data =>{
  //   setLplayers(data);
  //   console.log("players data --> ", lplayers);
  //   setInitialized(true);
  // }));
  //   console.log("listplayers loggoned on");
  // },[]);
  //------- Felipe -------------->//
  
  
  useEffect(()=>{
    console.log("update ranking?", players);
    
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
        console.log("user state: ", user);
        // console.log(logged);
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
        console.log("logged", logged);
      } else{
        alert("The username already taken");
      }
    })
  }
  const fetchAndSetQuestions = (id)=>{
    console.log("where am i");
    socket.emit('gameID', id);
    socket.on('GameroomQ', (qa)=>{
      console.log("questions and answers:", qa);
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
      console.log("current game info:", current_game);
      setCurrentgame(current_game);
      setJoinView(true);
    })
  };
  const enterRoom = (displayName, gameid)=>{
    socket.emit('playerJoin', {gamertag: displayName, game_id: gameid,
    is_host: isHost});
    // setLoadGame(true);
    setGamerTag(displayName);
    fetchAndSetQuestions(gameid);
    console.log(gamerTag);
  }

  //cancel selected game & delete game code from db
  const cancelGame = (gameid)=>{
    console.log("cancellled????");
    socket.emit('cancelGame', gameid);
    setJoinView(false);
    setCurrentgame(null);
    socket.on('confirmMessage', (message) => {
      console.log(message);
    })
  }

  const joinButton = (gameC)=>{
    setDisplayCode(gameC);
    socket.emit("joinGame", gameC);
    socket.on('joinedGame',(gamid)=>{
      setCurrentgame(gamid);
      console.log("joined id:", gamid);
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
    console.log("starting game:", currentgame);
  }
  


  // ----- Host Page for Games List -----//
  useEffect(()=>{
    socket.emit('hostGames', '1');
    console.log("log after socket emit - hostGames");
  },[userQuizzes]);
    
    
  
    

  // ---------------//


  const displayUser = () => {
    return (!user ? ( <div>
      <Button color="inherit" onClick={() => {} }>
         <Link to="/profile">Log In/Sign Up</Link>
      </Button>
    </div>) 
    : 
    // context.user.username
    (<div>
      {user.username}
      <button onClick = {logout}>
        Logout     
      </button>
    </div>)
    )
  }

  const managingAccount = () => {
    if (user) {
      return (<button>
        <Link to="/manageaccount" onClick={(() => loadProfilePage(user))}>Manage Account</Link>
      </button>)
    }
  }

  const navBar = () => {
    if (joinView && lobbyFlag) {
      return (<AppBar position="static">
          <Toolbar className="App-nav">
            <Typography variant="h6" className={classes.title} onClick={() => {}}>
              RE-SOLVE
            </Typography>
            <Toolbar className="App-nav">
              {!user ? ('') : (<Typography variant="h6">{user.username}</Typography>)}
            </Toolbar>
          </Toolbar>
        </AppBar>)
    } else {
      return (<AppBar position="static">
          <Toolbar className="App-nav">
            <Button className={classes.title}>
              <Link to="/">RE-SOLVE</Link>
            </Button>
            <Toolbar className="App-nav">
              <Button color="inherit">{managingAccount()}</Button>
              {displayUser()}
            </Toolbar>
          </Toolbar>
        </AppBar>)
    }
  }

    
  // if (!initilizedQuiz) {
  //   return null;
  // }

  return (

    
    <div className="App">
    
      <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      <Router>
        {navBar()}
        {/* <AppBar position="static">
          <Toolbar className="App-nav">
            <Button variant="h6" className={classes.title} onClick={() => {}}>
              <Link to="/">RE-SOLVE</Link>
            </Button>
            <Toolbar className="App-nav">
              <Button color="inherit">{managingAccount()}</Button>
              <Button color="inherit">{displayUser()}</Button>
            </Toolbar>
          </Toolbar>
        </AppBar> */}

        {/* <nav className="App-nav">
            <button onClick={() => {} }>
              <Link to="/">RE-SOLVE</Link>
            </button>
            <div>
              {displayUser()} */}

            {/* <UserContext.Provider value = {{user, setUser, verifyLogin, 
                username, setUsername, password, setPassword, logout, 
                gamerTag, answered, setAnswered, whichAns, setWhichAns, 
                sendAns, setPlayers, register, currentgame, setCurrentgame}}>
                <Login/>
              </UserContext.Provider> */}

            {/* {managingAccount()} */}

            {/* {!user ? ( <div>
                        <button onClick={() => {} }>
                        <Link to="/profile">Log In/Sign Up</Link>
                        </button>
                        </div>) 
                        : 
                        // context.user.username
                        (<div>
                          {username}
                          <button onClick = {logout}>
                          Logout     
                          </button>
                          </div>)
                        } */}

            {/* </div> */}
            {/* <button onClick={() => {} }>
              <Link to="/profile">Log In/Sign Up</Link>
            </button> */}
        {/* </nav> */}

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
                isHost, setIsHost,enterRoom}}>
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
                  isHost, setIsHost,enterRoom}}>
                {(start) ? gameDis : ((lobbyFlag && joinView) ? (<PlayerLobby players={lplayers}/>) :( (joinView && !lobbyFlag) ? <JoinLobby/> : <Join/>))}
                </UserContext.Provider>
              </createContext.Provider> 
            </Route>  

          </Switch>
        {/* </body> */}
        </header>
      </Router>

          {/*
            <createContext.Provider value = {{editQuiz, quiz, setQuiz, title, 
            setTitle, clickfunc, bar}}>
            { clicked ? <Edit />
            : <button onClick ={()=>{
              bar();
            }}>
              EDIT
              </button>
            }  
            </createContext.Provider>
          */}
          
            <UserContext.Provider value = {{user, setUser, verifyLogin, 
              username, setUsername, password, setPassword, logout, 
              gamerTag, answered, setAnswered, whichAns, setWhichAns, 
              sendAns, setPlayers, register, currentgame, setCurrentgame, 
              isHost, setIsHost,enterRoom}}>
            {/* {start===1 && gameDis} */}
            </UserContext.Provider>
          {/* <button
            onClick={()=>{
              
            }}
          >
            Start Game
          </button> */}
              
          <p>
            {/* home page testing */}
          </p>
    
          {/* <h3>Lobby</h3> */}
          {/* <ValueContext.Provider value={{value}}> */}
          {/* </ValueContext.Provider> */}
    </div>


  )
}

