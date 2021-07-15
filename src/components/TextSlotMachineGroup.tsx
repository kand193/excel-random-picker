import React, { FC } from "react";
import styled from "styled-components";

import TextSlotMachine from "./TextSlotMachine";

interface TextSlotMachineGroupProps {
  texts: Array<string>;
  pickedMembers: Array<string>;
}

const TextSlotMachineGroup: FC<TextSlotMachineGroupProps> = ({
  texts,
  pickedMembers,
}: TextSlotMachineGroupProps) => (
  <GroupWrapper>
    {pickedMembers.map((p) => (
      <TextSlotMachine key={p} texts={texts} lastText={p} />
    ))}
  </GroupWrapper>
);

export default TextSlotMachineGroup;

const GroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;

  > *:not(:first-child) {
    margin-left: 20px;
  }
`;
