export const reducer = (state, { type, payload }) => {
  let updatedQuestions = [...state.questions];
  let index;
  let found;

  switch (type) {
    case "UPDATE_FORM_HEADERS": {
      const { field, newValue } = payload;
      return { ...state, [field]: newValue };
    }

    case "ADD_NEW_QUESTION": {
      const { newQuestion } = payload;
      updatedQuestions.push(newQuestion);

      return { ...state, questions: [...updatedQuestions] };
    }

    case "UPDATE_QUESTION_DATA": {
      const { updatedQuestion } = payload;

      index = updatedQuestions.findIndex(
        (question) => question.id === updatedQuestion.id
      );
      updatedQuestions.splice(index, 1, updatedQuestion);

      return { ...state, questions: [...updatedQuestions] };
    }

    case "UPDATE_QUESTION_INPUT_DATA": {
      const { id, newOption, newInputData } = payload;
      index = updatedQuestions.findIndex((q) => q.id === id);
      found = updatedQuestions[index];

      found.option = newOption;
      found.inputData = newInputData;

      updatedQuestions.splice(index, 1, found);

      return { ...state, questions: [...updatedQuestions] };
    }

    case "DELETE_QUESTION": {
      const { id } = payload;
      const updatedQuestions = [...state.questions].filter((q) => q.id !== id);

      return { ...state, questions: [...updatedQuestions] };
    }

    case "MOVE_QUESTION_UP": {
      const { id } = payload;

      index = updatedQuestions.findIndex((q) => q.id === id);
      const toMoveUp = updatedQuestions[index];

      updatedQuestions.splice(index, 1);
      updatedQuestions.splice(index - 1, 0, toMoveUp);

      return { ...state, questions: [...updatedQuestions] };
    }

    case "MOVE_QUESTION_DOWN": {
      const { id } = payload;

      index = updatedQuestions.findIndex((q) => q.id === id);
      const toMoveDown = updatedQuestions[index];

      updatedQuestions.splice(index, 1);
      updatedQuestions.splice(index + 1, 0, toMoveDown);

      return { ...state, questions: [...updatedQuestions] };
    }

    case "UPDATE_LINEAR_RANGE_VALUES": {
      const { id, field, newValue } = payload;

      index = updatedQuestions.findIndex((q) => q.id === id);

      found = updatedQuestions[index];
      found["inputData"][field] = parseInt(newValue);

      updatedQuestions.splice(index, 1, found);

      return { ...state, questions: [...updatedQuestions] };
    }

    case "DELETE_SUBMISSION": {
      const { submissionId } = payload;
      const updatedSubmissions = [...state.submissions];
      const index = updatedSubmissions.find((sub) => sub.id === submissionId);
      updatedSubmissions.splice(index, 1);

      return { ...state, submissions: [...updatedSubmissions] };
    }

    default:
      throw Error('Invalid action type.');
  }
};
