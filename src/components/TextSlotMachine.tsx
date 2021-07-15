import React from "react";
import styled from "styled-components";

interface TextSlotMachineProps {
  texts: Array<string>;
}

const TextSlotMachine = ({ texts }: TextSlotMachineProps) => (
    <SlotMachineWrapper>
      {texts.map((text) =>
        <div key={text}>
          {text}
        </div>)}
    </SlotMachineWrapper>
);

export default TextSlotMachine;

const SlotMachineWrapper = styled.div`

`;
