export default function SubmissionDetailsContainer({ data }) {
  const { id, answers, submittedAt } = data;

  return (
    <>
      <figure className="flex flex-col gap-2 min-w-[368px] p-2 border rounded bg-white">
        <header>
          <h1 className="text-2xl font-bold">Submission</h1>
          <h2 className="text-sm text-gray-500">
            <i className="bi bi-calendar"/>
            <span> {new Date(submittedAt).toLocaleString()}</span>
          </h2>
        </header>
        <section className="flex flex-col">
          {answers.map(({ id, question, answer }) => (
            <div key={id} className="answer__body gap-2 p-2 rounded">
              <h1 className="text-xl font-bold">{question.title}</h1>
              <p className="text-gray-600">{answer}</p>
            </div>
          ))}
        </section>
      </figure>
    </>
  );
}
