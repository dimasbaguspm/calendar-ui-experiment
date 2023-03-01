import React from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";

// NOTE: expensive function is here, aware
function TimeStampBox() {
  // more better if I could retrieve the timestamp
  const [{ isDidDrop }, drag] = useDrag(
    () => ({
      type: "TIMESTAMP",
      canDrag: true,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
        isDidDrop: monitor.didDrop()
      })
    }),
    []
  );

  console.log("isDidDrop", isDidDrop);
  return (
    <div
      ref={drag}
      style={{
        height: "20px"
      }}
    />
  );
}

export default TimeStampBox;
