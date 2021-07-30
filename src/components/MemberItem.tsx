import React, { FC } from "react";
import styled from "styled-components";

interface MemberItemProps {
  text: string;
  checked: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

const MemberItem: FC<MemberItemProps> = ({
  text,
  checked,
  isCurrent,
  onClick,
}: MemberItemProps) => {
  const [team, name] = text.split(" ");

  return (
    <Wrapper checked={checked} isCurrent={isCurrent} onClick={onClick}>
      <Team>{team}</Team>
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default MemberItem;

const Wrapper = styled.button<{ checked: boolean, isCurrent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75px;
  font-size: 30px;
  cursor: pointer;
  border: 0;
  outline: 0;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  background-color: ${({ isCurrent }) => (isCurrent ? "#FFEAEA" : "#fff")};

  :hover {
    background-color: #F6F6F6;
  }

  ${({ checked }) => (checked && `
    background-color: #F6F6F6;
    color: #A6A6A6;
    text-decoration: line-through;
  `)}
`;

const Team = styled.div`
  font-size: 20px;
  margin-right: 12px;
  margin-bottom: 3px;
`;

const Name = styled.div`
  font-size: 30px;
`;
