import React, { useEffect, useState } from "react";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

interface SelectComponentProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  value,
  setValue,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);

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

        setTreeData(data.treeData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [setTreeData]);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const tProps = {
    ...(treeData && { treeData }),
    ...(value && { defaultValue: value }),
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    defaultOpen: false,
    maxTagCount: 2,
    maxTagTextLength: 18,
    loading: isLoading,
    style: {
      width: "100%",
    },
  };

  return <TreeSelect {...tProps} />;
};
