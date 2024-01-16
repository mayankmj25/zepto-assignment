import React from "react";
import ChipInput from './components/ChipInput/ChipInput';
import userData from './data/user.json'; 
import { User } from './types';
import "./App.scss";

// as it might slow the app by little
// Validate or transform userData to ensure it matches the User[] type
// const validatedUserData: User[] = userData.map(user => ({
//   id: user.id,
//   name: user.name,
//   email: user.email,
// }));


const App: React.FC = () : JSX.Element => {

  return (
    <div className="app">
      <div>
      <h1 className="title">Pick Users</h1>
      </div>
      <ChipInput users={userData as User[]} />
    </div>
  );
};

export default App;
