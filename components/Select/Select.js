import React from "react";
import Select from "react-select";
import Style from "./Select.module.scss";

const SelectInput = ({ options, state, defaultValue }) => {
  const customStyles = (customtheme) => {
    return {
      ...customtheme,
      colors: {
        ...customtheme.colors,
        primary25: "#f2f2f2", // option hover color
        primary50: "#e6e6e6", //option click background color
        primary: "#000000", // option selected background color
        neutral0: "#ffffff", // select background color
      },
    };
  };

  return (
    <div className={Style.select__container}>
      <Select
        options={options}
        className={Style.select}
        onChange={state}
        //   autoFocus
        isSearchable
        defaultValue={defaultValue}
        theme={customStyles}
        instanceId
      />
    </div>
  );
};

export default SelectInput;
