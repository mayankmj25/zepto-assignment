import React, { useState, useEffect, useCallback } from "react";
import Chip from "../Chip/Chip";
import styles from "./ChipInput.module.scss";
import { User, ChipInputProps } from "../../types";

const ChipInput: React.FC<ChipInputProps> = ({ users }): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [selectedChips, setSelectedChips] = useState<User[]>([]);
  const [isLastChipHighlighted, setIsLastChipHighlighted] =
    useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    const filter = inputValue.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(filter) &&
        !selectedChips.find((chip) => chip.id === user.id)
    );
    setFilteredUsers(filtered);
  }, [inputValue, users, selectedChips]);

  const handleSelectUser = useCallback((user: User) => {
    setSelectedChips((chips) => [...chips, user]);
    setInputValue("");
    //assumption that last chip should not be highlighted if new one is added after backpress
    setIsLastChipHighlighted(false);
  }, []);

  const handleRemoveChip = useCallback((userId: number) => {
    setSelectedChips((chips) => chips.filter((chip) => chip.id !== userId));
  }, []);

  // Logic to handle backspace key press
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && inputValue === "") {
        if (isLastChipHighlighted) {
          const lastChip = selectedChips[selectedChips.length - 1];
          if (lastChip) {
            handleRemoveChip(lastChip.id);
          }
          setIsLastChipHighlighted(false);
        } else if (selectedChips.length > 0) {
          setIsLastChipHighlighted(true);
        }
      } else {
        setIsLastChipHighlighted(false);
      }
    },
    [handleRemoveChip, inputValue, isLastChipHighlighted, selectedChips]
  );

  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Use a timeout to delay hiding the suggestions to allow for selection
      const currentTarget = event.currentTarget;

      setTimeout(() => {
        // Check if the new active element is not within the suggestions box
        if (!currentTarget.contains(document.activeElement)) {
          setIsInputFocused(false);
        }
      }, 0);
    },
    []
  );

  return (
    <div className={styles.chipInputWrapper}>
      <div className={styles.chipContainer}>
        {selectedChips.map((user, index) => (
          <Chip
            key={user.id}
            label={user.name}
            onRemove={() => handleRemoveChip(user.id)}
            isHighlighted={
              isLastChipHighlighted && index === selectedChips.length - 1
            }
          />
        ))}
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Add New User"
          />
          {isInputFocused && (
            <div className={styles.suggestions}>
              {filteredUsers.map((user) => (
                <div
                  className={styles.listItem}
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent the blur event when mousedown occurs
                >
                  <div className={styles.name}>{user.name}</div>
                  <div className={styles.email}>{user.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipInput;
