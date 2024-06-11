import "../../Styling/Components/GlobalComponentStyle/_editInputNoPopup.scss";
import React, { useRef, useState } from "react";
import ErrorMinimalDisplay from "./ErrorMinimalDisplay";
import LoadingRing from "./LoadingRing";
import editIcon from "../../assets/editInvoiceDetailsIcon.svg";
// import errorIcon from "../../assets/errorIcon.svg";

export type userDataValuesType = {
  type: string;
  id?: number;
  value?: string;
  placeholder?: string;
  defaultData?: string;
};

interface EditInputNoPopupProps {
  title: string;
  userData?: userDataValuesType[];
  dataError: Error;
  dataLoading: boolean;
  handleUpdateFn: (queryValues: Partial<userDataValuesType>) => void;
}

const EditInputNoPopup: React.FC<EditInputNoPopupProps> = ({
  title,
  userData,
  dataError,
  dataLoading,
  handleUpdateFn,
}) => {
  const [editField, setEditField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<userDataValuesType>();

  const valueRef = useRef<HTMLInputElement>(null);

  const handleEdit = (status: userDataValuesType) => {
    setEditField(status?.value ?? "");
    setInputValue(status);
  };

  const handleSave = () => {
    if (!inputValue?.value || !valueRef.current) return;

    const newValue = valueRef.current.value;

    if (newValue !== inputValue.value) {
      const query: Partial<userDataValuesType> = {
        id: inputValue.id,
        value: newValue,
      };

      handleUpdateFn(query);
    }
    setEditField(null);
  };

  if (dataError)
    return <ErrorMinimalDisplay errorMessage={dataError?.message} />;

  if (dataLoading) return <LoadingRing />;

  return (
    <div className="editInputNoPopup">
      <div className="editInputNoPopup__card">
        <div className="editInputNoPopup__card-header">
          <h2>{title}</h2>
        </div>
        <div className="editInputNoPopup__card-body">
          <dl>
            <dd>
              {userData?.map((data) => (
                <React.Fragment key={data.id}>
                  {data.value !== editField ? (
                    <>
                      {data?.value ?? "No Data"}
                      <span
                        className="tooltip"
                        data-tooltip={`Change ${data?.value ?? ""}`}
                      >
                        <img
                          src={editIcon}
                          alt="Edit Icon"
                          onClick={() => handleEdit(data)}
                        />
                      </span>
                    </>
                  ) : (
                    <React.Fragment key={data?.id}>
                      <input
                        type={data?.type}
                        ref={valueRef}
                        defaultValue={data?.defaultData}
                        autoFocus
                        placeholder={data?.placeholder}
                      />
                      <span className="saveInputBtn" onClick={handleSave}>
                        Save
                      </span>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}{" "}
              {/* <p className="editInput__error">
                <img src={errorIcon} alt="errorIcon" />
                herhehe
              </p> */}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default EditInputNoPopup;
