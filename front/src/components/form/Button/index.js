import React from "react";
import { cn } from "../../ui/lib/utils";

const Button = React.forwardRef(({ variant = "black", className, Text, ...props }, ref) => {
  const baseStyles = "px-2 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all";
  const variants = {
    black: "bg-black text-white hover:bg-gray-900 focus:ring-gray-800",
    white: "bg-white text-black hover:bg-gray-100 focus:ring-gray-300 border border-gray-300",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {Text}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
