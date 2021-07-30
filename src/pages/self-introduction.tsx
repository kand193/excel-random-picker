import pickRandom from "pick-random";
import React, { ChangeEvent, FC, useCallback, useState } from "react";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import { Header, Input, Form, Button, Container } from "semantic-ui-react";
import styled from "styled-components";

import Candidate from "../components/Candidate";
import MemberItem from "../components/MemberItem";
import Timer from "../components/Timer";

const IndexPage: FC = () => {
  const [xlsxFile, setXlsxFile] = useState<Array<Array<string>>>([]);
  const [shuffledMembers, setShuffledMembers] = useState<Array<string>>([]);
  const [memberCheckList, setMemberCheckList] = useState<Array<boolean>>([]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const excelFile = files?.[0];

    if (
      !excelFile ||
      (!excelFile.type.includes("xlsx") && !excelFile.type.includes("spreadsheet"))
    ) {
      alert("엑셀 올리라고");
      return;
    }

    const parseRes: Array<Array<string>> = await readXlsxFile(excelFile);

    if (!parseRes) {
      alert("파싱 에러라고");
      return;
    }

    setXlsxFile(parseRes);
  };

  const handleSubmit = useCallback(() => {
    const members = xlsxFile.map((p: Array<string>) => p.join(" "));
    const results: Array<string> = pickRandom(members, { count: members.length });

    setShuffledMembers(results);
    setMemberCheckList(new Array(members.length).fill(false));
  }, [xlsxFile, pickRandom, setShuffledMembers]);

  const handleClick = useCallback((index) => () => {
    setMemberCheckList((prev) => (
      [...prev.slice(0, index), !prev[index], ...prev.slice(index + 1)]
    ));
  }, [memberCheckList]);

  const getProgress = () => {
    if (!memberCheckList.length) return "";
    return `${memberCheckList.filter(Boolean).length} / ${memberCheckList.length}`;
  };
  const getTopIndex = () => memberCheckList.indexOf(false);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Header size="huge" as="h2">
        <Header.Content>
          Mash-Up 자기소개
          <Header.Subheader>30초! 너를 알려줘 🧐</Header.Subheader>
        </Header.Content>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Input
            type="file"
            label="엑셀 파일"
            labelPosition="left"
            accept=".xlsx"
            onChange={handleUpload}
          />
        </Form.Field>
        <Button type="submit" primary disabled={!xlsxFile.length}>
          섞어!
        </Button>
      </Form>

      <FlexBox>
        <div>
          <Timer />
          <MT40 />
          {shuffledMembers.length ?
            <>
              <Candidate text={shuffledMembers[getTopIndex()]} isCurrent={true}/>
              <Candidate text={shuffledMembers[getTopIndex() + 1]} isCurrent={false} />
              <Candidate text={shuffledMembers[getTopIndex() + 2]} isCurrent={false} />
            </> :
            null}
        </div>
        <div>
          <Progress>{getProgress()}</Progress>
          <ScrollList>
          {shuffledMembers.map((r, index) => (
            <MemberItem
              key={index}
              text={r}
              checked={memberCheckList[index]}
              isCurrent={index === getTopIndex()}
              onClick={handleClick(index)}
            />
          ))}
          </ScrollList>
        </div>
      </FlexBox>
    </Container>
  );
};

export default IndexPage;

const MT40 = styled.div`
  margin-top: 40px;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 20px;
`;

const Progress = styled.div`
  display: flex;
  justify-content: center;
  height: 35px;
  font-size: 30px;
`;

const ScrollList = styled.div`
  width: 220px;
  height: 500px;
  overflow-y: auto;
  
  ::-webkit-scrollbar {
    width: 8px;
  }
`;
