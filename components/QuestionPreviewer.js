export default function QuestionPreviewer({ questionData, inputData }) {
  const { title, required, option } = questionData;
  const { min, max, maxLength, minLength } = inputData;

  return (
    <>
      <h1 className="text-2xl font-bold">
        {title}
        {required && (
          <span title="This question is required" className="text-red-500 ml-1">
            *
          </span>
        )}
      </h1>

      {option === "shortAnswer" && (
        <fieldset>
          <input
            type="text"
            minLength={minLength}
            maxLength={maxLength}
            placeholder="Your answer"
            className="customInput p-1 border-2 rounded focus:border-indigo-800"
          />
        </fieldset>
      )}

      {option === "paragraph" && (
        <fieldset>
          <textarea
            placeholder="Your answer (256 characters maximum)."
            className="customInput w-full p-1 border-2 rounded resize-none focus:border-indigo-800"
            maxLength={maxLength}
          ></textarea>
        </fieldset>
      )}

      {option === "date" && (
        <fieldset>
          <input
            type="date"
            className="customInput p-1 border-2 rounded w-36 focus:border-indigo-800"
          />
        </fieldset>
      )}

      {option === "linear-range" && (
        <fieldset className="flex gap-2 items-center">
          <input type="number" defaultValue={min} min={min} max={max} placeholder={`Type a number between ${min} and ${max}`} className="customInput rangeInput w-full p-1 border-2 rounded focus:border-indigo-800" />
        </fieldset>
      )}
    </>
  );
}
