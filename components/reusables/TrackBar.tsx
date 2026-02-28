import React from "react";

interface TrackBarProps {
  progress: number; // value between 0 and 100
}

const TrackBar: React.FC<TrackBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-[#E8E8E8] h-2 rounded-full">
      <div
        className="bg-[#322FEB] h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%`, maxWidth: "100%" }}
      />
    </div>
  );
};

export default TrackBar;
