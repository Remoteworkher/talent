import React from "react";

interface TrackBarProps {
  progress: number; // value between 0 and 100
}

const TrackBar: React.FC<TrackBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-[#E8E8E8] h-1.5 rounded-full overflow-hidden">
      <div
        className="bg-[#322FEB] h-1.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%`, maxWidth: "100%" }}
      />
    </div>
  );
};

export default TrackBar;
