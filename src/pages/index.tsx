import React, { ChangeEvent, FC, useCallback, useState } from "react";
import readXlsxFile from "read-excel-file";
import { Header, Icon, Input, Label, Form, Button, Container } from "semantic-ui-react";

const IndexPage: FC = () => {
  const [memberSize, setMemberSize] = useState(0);
  const [rookies, setRookies] = useState<Array<string>>([]);
  const [pickedMembers, setPickedMembers] = useState<Array<Array<string>>>([]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const excelFile = files?.[0];

    if (!excelFile || !excelFile.type.includes("xlsx")) {
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
  };

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberSize(Number(e.target.value) ?? 0);
  };

  const handleSubmit = useCallback(() => {
    console.log("CLICK");
  }, [rookies, memberSize]);

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
        <Form.Field>
          <Input
            type="file"
            label="엑셀 파일"
            labelPosition="left"
            accept=".xlsx"
            onChange={handleUpload}
          />
        </Form.Field>
        <Button type="submit" primary>
          뽑자
        </Button>
      </Form>

      {pickedMembers.map((r, index) => (
        <div key={index}>{r}</div>
      ))}
    </Container>
  );
};

export default IndexPage;
