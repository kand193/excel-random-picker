import pickRandom from "pick-random";
import React, { ChangeEvent, FC, useCallback, useState } from "react";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import { Header, Icon, Input, Label, Form, Button, Container } from "semantic-ui-react";

import TextSlotMachineGroup from "../components/TextSlotMachineGroup";

const IndexPage: FC = () => {
  const [memberSize, setMemberSize] = useState(0);
  const [rookies, setRookies] = useState<Array<string>>([]);
  const [remainRookies, setRemainRookies] = useState<Array<string>>([]);
  const [pickedMembersList, setPickedMembersList] = useState<Array<Array<string>>>([]);

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

    const members = parseRes.map((p: Array<string>) => p.join(" "));
    setRookies(members);
    setRemainRookies(members);
  };

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberSize(Number(e.target.value) ?? 0);
  };

  const handleSubmit = useCallback(() => {
    if (!remainRookies.length) {
      alert("남은 멤버가 없습니다.");
      return;
    }

    try {
      let results: Array<string> = [];
      while (true) {
        results = pickRandom(remainRookies, { count: memberSize });

        if (results.filter((r) => r.includes("스태프")).length === 1) {
          break;
        } else if (remainRookies.length < memberSize * 2) {
          break;
        }

        if (!remainRookies.filter((r) => r.includes("스태프")).length) {
          break;
        }
      }

      setPickedMembersList([...pickedMembersList, results]);

      setRemainRookies(remainRookies.filter((rookie) => !results.includes(rookie)));
    } catch (e) {
      // 뽑으려는 수보다 적게 남은 경우
      setPickedMembersList([...pickedMembersList, remainRookies]);

      setRemainRookies([]);
    }
  }, [remainRookies, memberSize, pickedMembersList]);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Header size="huge" as="h2">
        <Icon name="random" circular />
        <Header.Content>
          Random Picker
          <Header.Subheader>뽑기</Header.Subheader>
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
        <Form.Field>
          <Input
            type="number"
            min={0}
            labelPosition="right"
            placeholder="몇 명을 뽑나요?"
            value={memberSize}
            onChange={handleSizeChange}
          >
            <Label basic>뽑을 수</Label>
            <input />
            <Label>명</Label>
          </Input>
        </Form.Field>
        <Button type="submit" primary disabled={!rookies.length}>
          뽑자
        </Button>
      </Form>

      {pickedMembersList.map((r, index) => (
        <TextSlotMachineGroup
          index={index + 1}
          key={`group${index}`}
          texts={rookies}
          pickedMembers={r}
        />
      ))}
    </Container>
  );
};

export default IndexPage;
