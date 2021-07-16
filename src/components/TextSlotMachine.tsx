import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const TEXT_HEIGHT_PX = 40;

interface TextSlotMachineProps {
  texts: Array<string>;
  lastText: string;
}

const TextSlotMachine: FC<TextSlotMachineProps> = ({ texts, lastText }: TextSlotMachineProps) => {
  const [slideHeight, setSlideHeight] = useState(0);
  const [slideTime, setSlideTime] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlideHeight(slideRef.current?.clientHeight ?? 0);
    setSlideTime((Math.floor(Math.random() * 30) + 10) / 10);
  }, [slideRef]);

  return (
    <SlotMachineWrapper>
      <SlideArea ref={slideRef} top={(slideHeight - TEXT_HEIGHT_PX) * -1} slideTime={slideTime}>
        {texts.map((text) => (
          <TextElement key={text}>{text.replace(" 스태프", "")}</TextElement>
        ))}
        <TextElement>{lastText.replace(" 스태프", "")}</TextElement>
      </SlideArea>
    </SlotMachineWrapper>
  );
};

export default TextSlotMachine;

const SlotMachineWrapper = styled.div`
  position: relative;
  width: 160px;
  height: ${TEXT_HEIGHT_PX}px;
  overflow: hidden;
`;

const SlideArea = styled.div<{ top: number; slideTime: number }>`
  position: absolute;
  top: ${(props) => (props.top ? `${props.top}px` : "0")};
  left: 0;
  width: 100%;
  transition: top ${(props) => props.slideTime ?? 0}s ease-in-out;
`;

const TextElement = styled.div`
  height: ${TEXT_HEIGHT_PX}px;
  overflow: hidden;
  font-size: 25px;
  line-height: ${TEXT_HEIGHT_PX}px;
  text-align: center;
`;
