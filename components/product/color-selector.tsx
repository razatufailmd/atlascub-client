"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ColorOption } from "@/types/product";

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

export function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Select Color</h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(color.name)}
            className={`relative h-10 w-10 rounded-full border-2 transition-all ${
              selectedColor === color.name
                ? "border-primary scale-110"
                : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selectedColor === color.name && (
              <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-sm" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}