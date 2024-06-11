import React, { useState } from "react";
import EditInput from "../../GlobalComponents/EditInput";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import { INITIAL_DATA_STEP1_Types } from "../../../pages/Settings/employeesInfo/createEmployerInputs";

type CreateEmplStep1Props = INITIAL_DATA_STEP1_Types & {
  updateFileds: (fileds: Partial<INITIAL_DATA_STEP1_Types>) => void;
};

const CreateEmplStep1: React.FC<CreateEmplStep1Props> = ({
  updateFileds,
  departmentId,
}) => {
  // const inputs = [
  //   {
  //     id: 1,
  //     name: "departmentId",
  //     type: "select",
  //     label: "Department",
  //     defaultSelectValue: {
  //       value: "defaultDeptId",
  //       label: "Default Department",
  //     },
  //     options: [
  //       { value: "deptId1", label: "Department 1" },
  //       { value: "deptId2", label: "Department 2" },
  //       { value: "deptId3", label: "Department 3" },
  //     ],
  //   },
  // ];

  return (
    <div>
      <MultiFormWraper
        title="Department Selection"
        subTitle="Choose the department from the list provided"
      >
        <label>Customer Name</label>
        <input
          autoFocus
          type="number"
          value={departmentId}
          onChange={(e) => updateFileds({ departmentId: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
      </MultiFormWraper>
    </div>
  );
};

export default CreateEmplStep1;
