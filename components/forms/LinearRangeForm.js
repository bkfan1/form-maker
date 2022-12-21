import { useContext } from "react";
import { FormEditorContext } from "../../contexts/FormEditorContext";

export default function LinearRangeForm({id, min, max }) {
  const { dispatch } = useContext(FormEditorContext);
  const handleOnChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    dispatch({type:'UPDATE_LINEAR_RANGE_VALUES', payload: {id, field:name, newValue: value}})

  };

  return (
    <>
      <form onClick={(e) => e.preventDefault()} className="flex gap-4">
        <fieldset className="flex items-center gap-2">
          <label>From</label>
          <select
            name="min"
            defaultValue={min}
            onChange={(e) => handleOnChange(e)}
            className="p-2 border rounded bg-white focus:border-indigo-800"
          >
            <option>0</option>
            <option>1</option>
          </select>
        </fieldset>

        <fieldset className="flex items-center gap-2">
          <label>To</label>
          <select
            name="max"
            defaultValue={max}
            onChange={(e) => handleOnChange(e)}
            className="p-2 border rounded bg-white focus:border-indigo-800"
          >
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </fieldset>
      </form>
    </>
  );
}
