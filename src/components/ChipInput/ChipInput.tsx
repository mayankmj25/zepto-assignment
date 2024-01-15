import React, { useState, useEffect } from "react";
import Chip from "../Chip/Chip";
import styles from "./ChipInput.module.scss";

interface ChipInputProps {
  users: User[];
}

interface User {
    id: number;
    name: string;
    email: string;
  }

const ChipInput: React.FC<ChipInputProps> = ({ users }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [selectedChips, setSelectedChips] = useState<User[]>([]);
  const [isLastChipHighlighted, setIsLastChipHighlighted] = useState(false);


  useEffect(() => {
    // Filter users based on input value and exclude selected users
    const filter = inputValue.toLowerCase();
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(filter) && 
      !selectedChips.find(chip => chip.id === user.id)
    );
    setFilteredUsers(filtered);
  }, [inputValue, users, selectedChips]);

    

  const handleSelectUser = (user: User) => {
    // Add user to selectedChips
    setSelectedChips((chips) => [...chips, user]);
    // Reset input value
    setInputValue('');
  };
  

  const handleRemoveChip = (userId: number) => {
    // Remove chip from selectedChips
    setSelectedChips((chips) => chips.filter((chip) => chip
  .id !== userId));
  // The user will be added back to the suggestions list via the useEffect
  // as the filteredUsers state depends on both selectedChips and inputValue.
  };
  
  
  // Logic to handle backspace key press 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '') {
      if (isLastChipHighlighted) {
        // If the last chip is already highlighted, remove it
        const lastChip = selectedChips[selectedChips.length - 1];
        if (lastChip) {
          handleRemoveChip(lastChip.id);
        }
        setIsLastChipHighlighted(false);
      } else if (selectedChips.length > 0) {
        // Highlight the last chip
        setIsLastChipHighlighted(true);
      }
    } else {
        //if any other key is pressed
      setIsLastChipHighlighted(false);
    }
  };


  return (
    <div className={styles.chipInput}>
      <div className={styles.chipContainer}>
        {selectedChips.map((user, index) => (
          <Chip
            key={user.id}
            label={user.name}
            onRemove={() => handleRemoveChip(user.id)}
            isHighlighted={isLastChipHighlighted && index === selectedChips.length - 1 ? true : false}
          />
        ))}
      </div>
      <input
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Start typing..."
      />
      {inputValue && (
        <ul className={styles.suggestions}>
          {filteredUsers.map((user) => (
            <li key={user.id} onClick={() => handleSelectUser(user)}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipInput;
