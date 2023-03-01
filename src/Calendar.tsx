import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import {
  FlexContainer,
  Button,
  BodyText,
  Grid,
  Title,
  elFlexAlignSelfCenter,
  PageContainer,
  Subtitle
} from "@reapit/elements";
import TimeStampChild from "./TimeStamp";

export default function Calendar() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [currentDate, setCurrentDate] = useState(dayjs());

  const buttonHandler = (type: "prev" | "next") =>
    ({
      prev: () => {
        setCurrentDate(currentDate.subtract(1, "week"));
      },
      next: () => {
        setCurrentDate(currentDate.add(1, "week"));
      }
    }[type]);

  const renderSelectedWeek = (format: string) => {
    let dateCalledOften = 0;
    const days = [];

    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");

    while (startOfWeek.add(dateCalledOften, "day").isBefore(endOfWeek)) {
      days.push(startOfWeek.add(dateCalledOften, "day"));
      dateCalledOften++;
    }

    return days.map((day) => {
      const isTheDay =
        day.startOf("day").isSame(currentDate.startOf("day")) &&
        day.startOf("month").isSame(currentDate.startOf("month")) &&
        day.startOf("year").isSame(currentDate.startOf("year"));

      return (
        <div
          key={day.format()}
          className="el-mx3"
          onClick={() => setCurrentDate(day)}
          style={{ cursor: "pointer" }}
        >
          <BodyText hasBoldText={isTheDay}>{day.format(format)}</BodyText>
        </div>
      );
    });
  };

  const renderTimestamp = () => {
    let oftenCalled = 0;
    const startTimeOfSelectedDate = currentDate.startOf("d");
    const endTimeOfSelectedDate = currentDate.endOf("d");
    const times = [];

    while (
      startTimeOfSelectedDate
        .add(oftenCalled, "hour")
        .isBefore(endTimeOfSelectedDate)
    ) {
      times.push(startTimeOfSelectedDate.add(oftenCalled, "hour"));
      oftenCalled++;
    }

    return times.map((time) => (
      <TimeStampChild key={time.format()} time={time} />
    ));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prev) => prev.add(1, "second"));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <PageContainer>
      <FlexContainer isFlexJustifyCenter isFlexAlignCenter className="el-mb12">
        <FlexContainer isFlexColumn>
          <div className="el-my5" />
          <Button
            onClick={buttonHandler("prev")}
            intent="primary"
            className="el-mr8"
          >
            Prev Week
          </Button>
        </FlexContainer>
        <div>
          <Title className={elFlexAlignSelfCenter}>
            {currentDate.format("DD MMMM YYYY")}
          </Title>
          <Subtitle>{currentTime.format("hh:mm:ss")}</Subtitle>
        </div>
        <FlexContainer isFlexColumn>
          <div className="el-my5" />
          <Button
            onClick={buttonHandler("next")}
            intent="secondary"
            className="el-ml8"
          >
            Next Week
          </Button>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer isFlexJustifyCenter>
        <Grid
          className="el-wfull"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "1px"
          }}
        >
          {renderSelectedWeek("ddd")}
          {renderSelectedWeek("D")}
        </Grid>
      </FlexContainer>
      <FlexContainer isFlexJustifyCenter className="el-mt12">
        <Grid
          className="el-wfull"
          style={{
            gridTemplateColumns: "1fr",
            gridRowGap: "0px"
          }}
        >
          {renderTimestamp()}
        </Grid>
      </FlexContainer>
      {/* <h1>split</h1> */}
      {/* <FlexContainer isFlexJustifyCenter>{renderDays()}</FlexContainer> */}
    </PageContainer>
  );
}
