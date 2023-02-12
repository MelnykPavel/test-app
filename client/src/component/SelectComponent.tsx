import React, { useEffect, useState } from "react";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];

export const SelectComponent: React.FC = () => {
  const [value, setValue] = useState(["0-0-0"]);
  const [isLoading, setLoading] = useState(false);
  const [selectData, setSelectData] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/categories/getCategories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);

        setSelectData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // return toast({
        //   title: "Error Occured!",
        //   description: "Failed to get categories!",
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "bottom-right",
        //   variant: "solid",
        // });
      }
    })();
  }, []);

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    defaultOpen: true,
    maxTagTextLength: 20,
    loading: isLoading,
    style: {
      width: "100%",
    },
  };

  return <TreeSelect {...tProps} />;
};
