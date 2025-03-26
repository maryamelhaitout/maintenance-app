// src/components/ui/button.js
import React from "react";

export function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
