import { useContext } from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import QuestionEditor from "./QuestionEditor";

export default function FormEditor() {
  const {formData, dispatch} = useContext(FormEditorContext);

  const handleOnChange = (e)=>{
    const {target} = e;
    let {name, value}= target;
    console.log(value)
    dispatch({type:'UPDATE_FORM_HEADERS', payload: {field:name, newValue: value}})
  }

  const handleOnBlur = (e)=>{
    const {target} = e;
    let {name, value}= target;
    console.log(value)
    if(value.length === 0){
      if(name === 'title'){
        value = 'Untitled form';
      }
    }
    dispatch({type:'UPDATE_FORM_HEADERS', payload: {field:name, newValue: value}})
  }


  return (
    <>
      <div className={`formEditor flex flex-col gap-2 w-[468px] sm:w-[468px] md:w-[568px] lg:w-[768px] h-[600px] overflow-y-scroll hideScrollbar`}>
        <header>
          <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-4 p-4 shadow-sm border-t-8 border-t-indigo-800 rounded  bg-white">
            <fieldset>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e)=>handleOnChange(e)}
                onBlur={(e)=>handleOnBlur(e)}
                placeholder="Title"
                className="ease-in-out duration-100 customInput w-full text-2xl font-bold border-b-2 focus:border-b-indigo-800 "
              />
              
            </fieldset>
            <fieldset>
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={(e)=>handleOnChange(e)}
                placeholder="Description"
                className="ease-in-out duration-100 customInput w-full border-b-2 focus:border-b-indigo-800 "
              />
            </fieldset>
            <input type={'submit'} hidden/>
          </form>
        </header>

        <section className="flex flex-col gap-4">
          {formData.questions.map((question)=>(
            <QuestionEditor key={question.id} questionData={question} />
          ))}
        </section>
      </div>
    </>
  );
}
