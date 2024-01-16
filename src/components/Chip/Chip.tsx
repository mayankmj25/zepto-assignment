import React from "react";
import styles from "./Chip.module.scss";
import { ChipProps } from "../../types";

const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  isHighlighted,
}): JSX.Element => {
  return (
    <div
      className={`${styles.chip} ${isHighlighted ? styles.highlighted : ""}`}
    >
      <span className={styles.label}>{label}</span>
      <button
        className={styles.removeButton}
        onClick={onRemove}
        aria-label="Remove"
      >
        ✕
      </button>
    </div>
  );
};

export default Chip;
