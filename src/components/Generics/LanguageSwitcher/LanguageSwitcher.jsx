import React, { useState, useRef, useEffect } from "react";
import styles from "./language.module.css";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  getLabel = (opt) => opt.label,
  getImage = (opt) => opt.img,
  disabled = false,
  placeholder = "Select...",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div
      className={`${styles.customSelect} ${className}`}
      ref={ref}
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <div
        className={`${styles.selectedOption} ${
          disabled ? styles.disabled : ""
        }`}
        onClick={() => !disabled && setOpen((v) => !v)}
      >
        <span className={styles.selectedLabel}>
          {selected && getImage(selected) && (
            <img src={getImage(selected)} alt="" />
          )}
          {selected ? getLabel(selected) : placeholder}
        </span>
        {/* <span className={styles.arrow}>{open ? "▲" : "▼"}</span> */}
      </div>
      {open && (
        <div className={styles.optionsList}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`${styles.optionItem} ${
                value === opt.value ? styles.active : ""
              }`}
              onClick={() => {
                if (!disabled) {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
            >
              {getImage(opt) && <img src={getImage(opt)} alt="" />}
              {getLabel(opt)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example usage for language switcher
const LANGS = [
  { value: "uz", label: "UZ", img: "https://flagcdn.com/uz.svg" },
  { value: "ru", label: "RU", img: "https://flagcdn.com/ru.svg" },
  { value: "en", label: "EN", img: "https://flagcdn.com/gb.svg" },
];

const LanguageSwitcher = ({ value, onChange }) => {
  const [lang, setLang] = useState(value || LANGS[0].value);

  console.log("LANG", lang);

  return (
    <CustomSelect
      options={LANGS}
      value={lang}
      onChange={(val) => {
        setLang(val);
        onChange && onChange(val);
      }}
      placeholder="Til"
    />
  );
};

export default LanguageSwitcher;
