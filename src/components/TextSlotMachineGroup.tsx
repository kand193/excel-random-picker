import React, { FC } from "react";
import styled from "styled-components";

import TextSlotMachine from "./TextSlotMachine";

interface TextSlotMachineGroupProps {
  texts: Array<string>;
  pickedMembers: Array<string>;
  index: number;
}

const TextSlotMachineGroup: FC<TextSlotMachineGroupProps> = ({
  texts,
  pickedMembers,
  index,
}: TextSlotMachineGroupProps) => (
  <GroupWrapper>
    <IndexLabel>{index}조</IndexLabel>
    {pickedMembers.map((p) => (
      <TextSlotMachine key={p} texts={texts} lastText={p} />
    ))}
  </GroupWrapper>
);

export default TextSlotMachineGroup;

const GroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 40px;

  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const IndexLabel = styled.div`
  width: 50px;
  font-size: 20px;
  text-align: center;
`;
