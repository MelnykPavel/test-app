import { Col, Row } from "antd";
import { FormComponent } from "./component/FormComponent";

export const App: React.FC = () => {
  return (
    <Row justify={"center"} style={{ height: "100vh" }}>
      <Col style={{ alignSelf: "center" }}>
        <FormComponent />
      </Col>
    </Row>
  );
};
