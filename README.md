A multi-purpose full-stack web application that allows users to design, host, and play through quizzes while competing against other players in real-time.

A user may create quizzes from scratch with our provided template in the form of multiple choice, host existing quizzes to invite friends to play via the sharable code or join other lobbies with a code. If a user is loggedin, quizzes created under their name can be edited and re-posted. The quiz name may not be empty when creating a new quiz. 

The project is deployed [Here](https://re-solve.netlify.app/).
The backend repository is [Here](https://github.com/GSDhaliwal/re-solve-api).

The frontend is built with React. The backend is built with Express and postgres. The real time interaction between players is enabled by socket.io. Without the use of cookies, user login does not persist through refreshes of the browser.
