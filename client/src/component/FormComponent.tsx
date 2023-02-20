import React, { FC, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Table } from "antd";
import { SelectComponent } from "./SelectComponent";
import { RuleObject } from "antd/es/form";
import { ColumnsType } from "antd/es/table";

export const FormComponent: FC = () => {
  const [selectValue, setSelectValue] = useState<string[]>([]);

  const [loadings, setLoadings] = useState<boolean>(false);
  const [orderForm] = Form.useForm();

  const [nameInput, setNameField] = useState<String>("");
  const [checked, setChecked] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>([]);

  interface DataType {
    key: React.Key;
    name: string;
  }

  useEffect(() => {
    orderForm.validateFields(["sectors"]);
  }, [selectValue, orderForm]);

  const onNameChange = async (e: any) => {
    await setNameField(e.target.value);
    orderForm.validateFields(["nameInput"]);
  };
  const nameValidation = async (rule: RuleObject, value: any) => {
    if (nameInput && nameInput.length > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject("Please enter a name!");
    }
  };

  const onCheckboxChange = async (e: any) => {
    await setChecked(e.target.checked);
    orderForm.validateFields(["isAgree"]);
  };
  const checkboxValidation = (rule: RuleObject, value: any) => {
    return new Promise<void>((resolve, reject) => {
      if (checked) {
        resolve();
      } else {
        reject("Please accept the terms");
      }
    });
  };

  const sectorsValidation = async (rule: RuleObject, value: any) => {
    if (selectValue && selectValue.length > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject("Please choose category!");
    }
  };

  const orderRequest = async () => {
    try {
      setLoadings(true);

      const orderId: string | null = sessionStorage.getItem("orderId");

      const response = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: nameInput,
          orderedCategories: selectValue,
          isAgree: checked,
          updateOrder:
            orderId && orderId !== "undefined" ? JSON.parse(orderId) : false,
        }),
      });

      interface OrderedCategory {
        category: {
          _id: string;
          title: string;
        };
      }
      const data = await response.json();
      const orderData: DataType[] = data.order.orderedCategories.map(
        (item: OrderedCategory) => {
          return {
            key: item.category._id,
            name: item.category.title,
          };
        }
      );
      const showOrderModal = (orderData: DataType[]) => {
        setTableData(orderData);
        Modal.info({
          title: "Your order has been placed successfully",
          content: (
            <Table columns={columns} dataSource={tableData} size="small" />
          ),
          onOk: () => setModalOpen(false),
        });
      };
      showOrderModal(orderData);
      sessionStorage.setItem("orderId", JSON.stringify(data.order._id));

      setLoadings(false);
    } catch (error) {
      setLoadings(false);
    }
  };

  const submit = async () => {
    try {
      const values = await orderForm.validateFields();
      orderRequest();
      // console.log("Success:", values);
    } catch (errorInfo) {
      // console.log("Failed:", errorInfo);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Order details",
      dataIndex: "name",
    },
  ];
  return (
    <Form form={orderForm} name="checkbox-validation">
      <p>
        Please enter your name and pick the Sectors you are currently involved
        in.
      </p>
      <Form.Item
        name="nameInput"
        label="Name:"
        rules={[{ validator: nameValidation }]}
      >
        <Input onChange={(e) => onNameChange(e)} />
      </Form.Item>
      <Form.Item
        name="sectors"
        label="Sectors:"
        rules={[{ validator: sectorsValidation }]}
      >
        <SelectComponent value={selectValue} setValue={setSelectValue} />
      </Form.Item>
      <Form.Item name="isAgree" rules={[{ validator: checkboxValidation }]}>
        <Checkbox checked={checked} onChange={onCheckboxChange}>
          Agree to terms
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={submit}
          loading={loadings}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
