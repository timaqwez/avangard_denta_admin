
import { Autocomplete, TextField } from "@mui/material";
import { getInputEntityProps } from "./Inputs";

function SearchDropdownInput(props: getInputEntityProps) {
    const handleSearchDropdownChange = (e: any, dropdownData: any, multiple: boolean | undefined) => {
        if (!multiple) {
          let value = e.target.value ? e.target.value : e.target.textContent
          const dataObject = dropdownData.data.filter((object: {displayName: string, value: any}) => object.displayName == value)
          if (dataObject.length != 0) {
            props.setItem({ ...props.item, [dropdownData.dataName]: dataObject[0].value });
          } else {
            props.setItem({ ...props.item, [dropdownData.dataName]: null });
          }
        } else {
          let value = e.target.value ? e.target.value : e.target.textContent
          let itemSlot = props.item[dropdownData.dataName]
          if (value) {
            if (itemSlot) {
              let includedObject = itemSlot.filter((object: {displayName: string, value: any}) => object.displayName == value)
              if (includedObject.length == 0) {
                const dataObject = dropdownData.data.filter((object: {displayName: string, value: any}) => object.displayName == value)
                itemSlot.push(dataObject[0])
                props.setItem({ ...props.item, [dropdownData.dataName]: itemSlot });
              } else {
                itemSlot = itemSlot.filter((object: {displayName: string, value: any}) => object.displayName != value)
                props.setItem({ ...props.item, [dropdownData.dataName]: itemSlot });
              }
            } else {
              const dataObject = dropdownData.data.filter((object: {displayName: string, value: any}) => object.displayName == value)
              itemSlot = [].concat(dataObject)
              props.setItem({ ...props.item, [dropdownData.dataName]: itemSlot });
            }
          } else {
            const dataObject = dropdownData.data.filter((object: {displayName: string, value: any}) => object.displayName == e.currentTarget.parentElement?.innerText)
            itemSlot.splice(itemSlot.indexOf(dataObject), 1)
            props.setItem({ ...props.item, [dropdownData.dataName]: itemSlot });
          }
        }
        props.setErrors({ ...props.errors, [dropdownData.dataName]: '' });
      }

      if (props.dropdownData){
        let thisDropdownData = props.dropdownData[props.field.dataName]
        return <Autocomplete
            multiple={props.field.multiple}
            options={thisDropdownData.data.map((option: any) => option)}
            renderInput={
                (params) => <TextField
                  error={Boolean(props.error)}
                  helperText={props.error}
                  {...params} 
                  label={thisDropdownData.label || 'Ошибка'} 
                  onChange={(value) => {
                      handleSearchDropdownChange(value, thisDropdownData, props.field.multiple)
                  }}
              />
            }
            disableClearable
            disableCloseOnSelect 
            getOptionLabel={(option: any) => option.displayName}
            onChange={(value) => {
              handleSearchDropdownChange(value, thisDropdownData, props.field.multiple)
            }}
        />
    }
}

export default SearchDropdownInput
  