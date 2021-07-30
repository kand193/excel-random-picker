import React, { FC } from "react";
import styled from "styled-components";

interface CandidateProps {
  text: string;
  isCurrent: boolean;
}

const Candidate: FC<CandidateProps> = ({ text, isCurrent }: CandidateProps) => {
  const [team, name] = text.split(" ");

  return (
    <Wrapper isCurrent={isCurrent}>
      <Title>{isCurrent ? "소개중" : "다음 순서"}</Title>
      <Team>{team}</Team>
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default Candidate;

const Wrapper = styled.div<{ isCurrent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85px;
  font-size: 30px;
  border: 0;
  outline: 0;
  background-color: ${({ isCurrent }) => (isCurrent ? "#FFEAEA" : "#fff")};
`;

const Title = styled.div`
    margin-right: 30px;
`;

const Team = styled.div`
  font-size: 28px;
  margin-right: 12px;
  margin-bottom: 5px;
`;

const Name = styled.div`
  font-size: 50px;
`;
