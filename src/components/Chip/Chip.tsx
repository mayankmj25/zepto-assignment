// Chip.tsx
import React from 'react';
import styles from './Chip.module.scss';

interface ChipProps {
  label: string;
  onRemove: () => void;
  isHighlighted?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove, isHighlighted }) => {
  return (
    <div className={`${styles.chip} ${isHighlighted ? styles.highlighted : ''}`}>
      <span className={styles.label}>{label}</span>
      <button className={styles.removeButton} onClick={onRemove} aria-label="Remove">
        ✕
      </button>
    </div>
  );
};

export default Chip;
