import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import { ModalWindowContext } from "../contexts/ModalWindowContext";
import { useLocalPagination } from "../hooks/custom/useLocalPagination";
import Modal from "./Modal";
import SubmissionDetailsContainer from "./SubmissionDetailsContainer";

export default function SubmissionsTable() {
  const { formData, dispatch } = useContext(FormEditorContext);
  const { handleCloseClick } = useContext(ModalWindowContext);
  const { submissions } = formData;
  const {
    filteredData,
    prevPage,
    nextPage,
  } = useLocalPagination(submissions);

  const btns = [
    {id: nanoid(),text:"Back", fn: prevPage},
    {id: nanoid(),text:"Next", fn: nextPage}

  ]

  return (
    <>
      <div className="flex flex-col gap-2 p-2 lg:w-[768px] border rounded bg-white">
        <header className="p-2">
          <h1 className="text-xl">{submissions.length} answers</h1>
        </header>
        <menu className="flex gap-4 p-2">
          {btns.map(({id, text, fn})=>
          <button key={id} onClick={fn} className="p-2 border rounded hover:bg-gray-200">{text}</button>)}
        </menu>
        <section className="flex flex-col gap-4 p-2 border rounded">
          <table>
            <thead>
              <tr>
                <th className="hideCell">ID</th>
                <th>Date</th>
                <th>Answers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(({ id, submittedAt, answers }) => (
                <tr key={id} className="tableRow text-center">
                  <td className="hideCell">{id}</td>

                  <td>{new Date(submittedAt).toLocaleString()}</td>
                  <td>
                    <button onClick={handleCloseClick} className="">
                      View
                    </button>
                    <Modal>
                      <SubmissionDetailsContainer
                        data={{ id, submittedAt, answers }}
                      />
                    </Modal>
                  </td>

                  <td onClick={()=>dispatch({type:"DELETE_SUBMISSION", payload: {submissionId: id}})}>
                    <button title="Delete submission">
                      <i className="bi bi-trash text-gray-500 hover:text-black" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
