import React, { useState } from "react";
import Chip from "./components/Chip/Chip";
import ChipInput from './components/ChipInput/ChipInput';
import userData from './data/user.json'; 
import "./App.scss";

interface User {
  id: number;
  name: string;
  email: string;
}

// const users: User[] = userData;



const App: React.FC = () => {
  // const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // const handleRemoveUser = (userId: number) => {
  //   setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  // };

  return (
    <div className="app">
      {/* <div className="chip-container">
        {selectedUsers.map((user) => (
          <Chip
            key={user.id}
            label={user.name}
            onRemove={() => handleRemoveUser(user.id)}
          />
        ))}
      </div> */}
      <ChipInput users={userData} />
    </div>
  );
};

export default App;
