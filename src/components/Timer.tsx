import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { Input, Button } from "semantic-ui-react";
import styled from "styled-components";

const toMillisecondes = (hours: number, minutes: number, seconds: number) => (
  (hours * 60 * 60 * 1000) +
  (minutes * 60 * 1000) +
  (seconds * 1000)
);

const pad2Zero = (number: number) => {
  const str = number.toString();
  return str.length > 1 ? str : `0${str}`;
};

const Timer: FC = () => {
  const [hoursString, setHoursString] = useState("00");
  const [minutesString, setMinutesString] = useState("00");
  const [secondsString, setSecondsString] = useState("00");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isProgress, setIsProgress] = useState(false);
  const [timerPercent, setTimerPercent] = useState(100);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [timeoutId, setTimeoutId] = useState<any>(null);

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHoursString(e.target.value);
  };
  const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinutesString(e.target.value);
  };
  const handleSecondChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondsString(e.target.value);
  };

  const handleStart = () => {
    setIsProgress((prev) => !prev);
    const newIntervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    setIntervalId(newIntervalId);

    const newTimeoutId = setTimeout(() => {
      clearInterval(newIntervalId);
      setIsProgress((prev) => !prev);
    }, toMillisecondes(hours, minutes, seconds));
    setTimeoutId(newTimeoutId);
  };

  const handlePause = () => {
    setIsProgress((prev) => !prev);
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  const handleReset = () => {
    setHours(parseInt(hoursString, 10));
    setMinutes(parseInt(minutesString, 10));
    setSeconds(parseInt(secondsString, 10));
  };

  useEffect(() => {
    const total = toMillisecondes(
      parseInt(hoursString, 10),
      parseInt(minutesString, 10),
      parseInt(secondsString, 10),
    );
    const percent = (toMillisecondes(hours, minutes, seconds) / total) * 100;
    setTimerPercent(percent);
  }, [hours, minutes, seconds, hoursString, minutesString, secondsString]);

  return (
    <Wrapper>
        <TimeText isProgress={isProgress}>
          {pad2Zero(hours)}:{pad2Zero(minutes)}:{pad2Zero(seconds)}
        </TimeText>
        <ControllSection>
          <InputWrapper>
            <StyledInput disabled={isProgress} type="text" value={hoursString} onChange={handleHourChange} />
            <TimeSeparator>:</TimeSeparator>
            <StyledInput disabled={isProgress} type="text" value={minutesString} onChange={handleMinuteChange} />
            <TimeSeparator>:</TimeSeparator>
            <StyledInput disabled={isProgress} type="text" value={secondsString} onChange={handleSecondChange} />
          </InputWrapper>
          <ButtonWrapper>
            <StartButton isProgress={isProgress} onClick={isProgress ? handlePause : handleStart}>
                {isProgress ? "Pause" : "Start"}
            </StartButton>
            <ResetButton disabled={isProgress} onClick={handleReset}>
                Reset
            </ResetButton>
          </ButtonWrapper>
        </ControllSection>
        <ProgressBar>
        <CurrentProgress timerPercent={timerPercent} isProgress={isProgress} />
        </ProgressBar>
    </Wrapper>
  );
};

export default Timer;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 40px;
  width: 790px;
  height: 200px;

  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const TimeText = styled.div<{ isProgress: boolean }>`
  width: 600px;
  height: 100px;
  padding-top: 10px;
  padding-left: 5px;
  color: ${({ isProgress }) => (isProgress ? "#000" : "#777")};
  font-size: 150px;
  font-family: Helvetica,Arial;
`;

const ControllSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -40px;
`;

const TimeSeparator = styled.span`
  margin: 5px 1px;
  font-size: 35px;
  font-family: Helvetica,Arial;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  width: 47px;
`;

const ButtonWrapper = styled.div`
`;

const StyledButton = styled(Button)`
  width: 80px;
  height: 80px;
  font-size: 18px;
  margin: 5px;
  color: #fff !important;
  cursor: pointer;
  border: 0;

  :hover {
    background-color: #000 !important;
  }
`;

const StartButton = styled(StyledButton)<{ isProgress: boolean }>`
  background-color: ${({ isProgress }) => (isProgress ? "#fb647f" : "#17a69d")} !important;
`;

const ResetButton = styled(StyledButton)`
  background-color: #4387d0 !important;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 32px;
  background-color: #aaa;
`;

const CurrentProgress = styled.div<{ timerPercent: number, isProgress: boolean }>`
  width: ${({ timerPercent }) => (`${timerPercent}%`)};
  height: 32px;
  background-color: ${({ isProgress }) => (isProgress ? "#fb647f" : "#17a69d")};
  transition: width 1s;
`;
