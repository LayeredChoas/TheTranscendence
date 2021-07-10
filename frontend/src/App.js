// import { BrowserRouter, Route as Route } from "react-router-dom";
// import Navbar from "./elements/navbar";
// import Body from "./elements/Body";
// import Footer from "./elements/Footer";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import MembersScreen from "./screens/MembersScreen";
// // import "./App.css";
// import RedirectScreen from "./screens/RedirectScreen";
// import { auth } from "./functions/auth";
// import { useEffect, useState } from "react";
// import { userContext } from "./functions/userContext";
// import NewUserScreen from "./screens/NewUserScreen";
// import LogoutScreen from "./screens/LogoutScreen";
// import SettignsScreen from "./screens/SettingsScreen";
// import ChannelsScreen from "./screens/ChannelsScreen"
// import UserProfileScreen from "./screens/UserProfileScreen";
// import FriendsScreen from "./screens/FriendsScreen";
// import FriendsRequestScreen from "./screens/FriendsRequestScreen";
// import MessagesScreen from "./screens/MessagesScreen";
// import MatchScreen from "./screens/MatchScreen";
// import GameScreen from "./screens/GameScreen";
// import ChannelScreen from "./screens/ChannelScreen";
// import { io } from "socket.io-client";
// // import "./../pages/Main.css"

// // import {io} from "socket.io-client";

// // const socket = io('http://localhost:5000');
// const socket = "pl";

// function App() {
//   const [user, setUser] = useState({
//     isLoggedIn: false,
//     isLoading: true,
//     token: undefined,
//     user: undefined,
//     socket
//   });

//   useEffect(async () => {
//     setUser(await auth());
//   }, []);

//   return (
//     <BrowserRouter value={user}>
//       <userContext.Provider value={{ user, setUser }}>
//         {/* <Navbar /> */}
//         <div className="MainBody">
//           {/* <Route path="/" exact component={Body}></Route>
//           <Route path="/login" component={LoginScreen}></Route>
//           <Route path="/register" component={RegisterScreen}></Route>
//           <Route path="/logout" component={LogoutScreen}></Route>

//            Private Directories
//           <Route path="/redirect" component={RedirectScreen}></Route>
//           <Route path="/member" component={MembersScreen}></Route>
//           <Route path="/new-user" component={NewUserScreen}></Route>
//           <Route path="/settings" component={SettignsScreen}></Route>
//           <Route path="/user" component={UserProfileScreen}></Route>
//           <Route path="/channels" component={ChannelsScreen}></Route>
//           <Route path="/friends" component={FriendsScreen}></Route>
//           <Route path="/friends_request" component={FriendsRequestScreen}></Route>
//           <Route path="/messages" component={MessagesScreen}></Route>
//           <Route path="/match" component={MatchScreen}></Route>
//           <Route path="/game" component={GameScreen}></Route>
//           <Route path="/channel" component={ChannelScreen}></Route> */}
          
//         </div>
//       </userContext.Provider>
//     </BrowserRouter>
//   );
// }

// export default App;
