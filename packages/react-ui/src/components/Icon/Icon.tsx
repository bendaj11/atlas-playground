import React, { type ReactNode } from "react";

interface IconProps {
  icon: string;
}

export const Icon = ({ icon }: IconProps) => {
  return <div style={{ background: "red" }}>react?{icon}?!</div>;
};
