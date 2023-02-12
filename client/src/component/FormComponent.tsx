import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { SelectComponent } from "./SelectComponent";

export const FormComponent: React.FC = () => {
  return (
    <Form>
      <p>
        Please enter your name and pick the Sectors you are currently involved
        in.
      </p>
      <Form.Item name="name" label="Name:">
        <Input />
      </Form.Item>
      <Form.Item name="sectors" label="Sectors:">
        <SelectComponent />
      </Form.Item>
      <Form.Item
        name="isAgree"
        rules={[{ required: true, message: "Please accept to terms!" }]}
      >
        <Checkbox>Agree to terms</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
