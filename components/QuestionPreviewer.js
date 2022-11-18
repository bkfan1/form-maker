export default function QuestionPreviewer({ questionData, inputData }) {
  const { title, required, option } = questionData;

  return (
    <>
      <h1 className="text-2xl font-bold">
        {title}
        {required ? (
          <span title="This question is required" className="text-red-500 ml-1">
            *
          </span>
        ) : (
          ""
        )}
      </h1>

      {option === "shortAnswer" && (
        <input
          type="text"
          minLength={inputData.minLength}
          maxLength={inputData.maxLength}
          placeholder="Your answer"
          className="customInput p-1 border-2 rounded focus:border-indigo-800"
        />
      )}

      {option === "paragraph" && (
        <textarea
          placeholder="Your answer (256 characters maximum)."
          className="customInput p-1 border-2 rounded resize-none focus:border-indigo-800"
        ></textarea>
      )}

      {option === "date" && (
        <input
          type="date"
          className="customInput p-1 border-2 rounded w-36 focus:border-indigo-800"
        />
      )}

      {option === "linear-range" && (
        <input
          type="range"
          defaultValue={inputData.min}
          min={inputData.min}
          max={inputData.max}
        />
      )}
    </>
  );
}
