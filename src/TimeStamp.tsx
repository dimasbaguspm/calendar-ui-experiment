import React from "react";
import { BodyText, FlexContainer, Grid } from "@reapit/elements";
import dayjs from "dayjs";
import TimeStampBox from "./TimeStampBox";
import { DropTargetMonitor, useDrop } from "react-dnd";

interface ITimeStampChild {
  time: dayjs.Dayjs;
}

const TimeStampChild: React.FC<ITimeStampChild> = ({ time }) => {
  const [, dropRef] = useDrop(() => ({
    accept: ["TIMESTAMP"],
    // drop:(_item: unknown, monitor) {

    // }
    collect: (monitor: DropTargetMonitor) => ({})
  }));
  const timeAtFirstRender = dayjs();
  const timeDifferentWithCurrent = timeAtFirstRender.diff(time, "minutes");
  const isOnTime =
    timeDifferentWithCurrent >= 0 && timeDifferentWithCurrent <= 59;

  return (
    <FlexContainer
      key={time.format()}
      className="el-wfull"
      style={{
        backgroundColor: +time.format("hh") % 2 === 0 ? "#E5E5E5" : "unset",
        height: "auto",
        position: "relative"
      }}
    >
      <div className="el-w1">
        <BodyText
          hasBoldText={
            time.startOf("hour").isSame(timeAtFirstRender.startOf("hour")) &&
            time.startOf("day").isSame(timeAtFirstRender.startOf("day")) &&
            time.startOf("month").isSame(timeAtFirstRender.startOf("month")) &&
            time.startOf("year").isSame(timeAtFirstRender.startOf("year"))
          }
        >
          {time.format("hh A")}
        </BodyText>
      </div>
      <div ref={dropRef} className="el-wfull" style={{ position: "relative" }}>
        <Grid
          className="el-wfull"
          style={{
            gridTemplateColumns: "1fr",
            gridTemplateAreas: "repeat(4, 1fr)",
            gridRowGap: "0px"
          }}
        >
          {Array.from({ length: 4 }, (_, i) => i + 1).map((value) => {
            return <TimeStampBox key={value} />;
          })}
        </Grid>

        {isOnTime && (
          <div
            style={{
              width: "100%",
              height: "2px",
              position: "absolute",
              backgroundColor: "blue",
              top: `${(timeDifferentWithCurrent / 60) * 100}%`
            }}
          />
        )}
      </div>
    </FlexContainer>
  );
};

export default TimeStampChild;
