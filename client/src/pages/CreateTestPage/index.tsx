import { ChangeEvent, FC, useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import CreateTestField from '../../components/common/CreateTestField';
import Checkbox from '../../components/common/Checkbox';
import { useCreateTestMutation } from '../../store/api/tests.api.ts';

const CreateTestPage: FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState([
    {
      questionTitle: '',
      options: [
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
      ],
    },
    {
      questionTitle: '',
      options: [
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
      ],
    },
    {
      questionTitle: '',
      options: [
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
      ],
    },
  ]);
  const [createTest] = useCreateTestMutation();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleQuestionChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newContent = [...content];
    newContent[index].questionTitle = e.target.value;
    setContent(newContent);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newContent = [...content];
    newContent[questionIndex].options[optionIndex].answer = e.target.value;
    setContent(newContent);
  };

  const handleIsCorrectChange = (
    questionIndex: number,
    optionIndex: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newContent = [...content];
    newContent[questionIndex].options[optionIndex].isCorrect = e.target.checked;
    setContent(newContent);
  };

  const handleSubmit = async () => {
    try {
      const test = { name, description, content };
      await createTest(test);
    } catch (e) {
      console.error('Error creating test:', e);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-6/12 mx-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl text-center">Create test</h1>
      <Input
        type="text"
        placeholder="Test Name"
        value={name}
        onChange={handleNameChange}
      />
      <Input
        type="text"
        placeholder="Test Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <h2 className="text-2xl mt-2">Q&A</h2>
      {content.map((question, questionIndex) => (
        <div className="flex flex-col gap-3" key={questionIndex}>
          <h3 className="font-semibold">Question {questionIndex + 1}</h3>
          <CreateTestField
            value={question.questionTitle}
            onChange={e => handleQuestionChange(questionIndex, e)}
            placeholder="Enter question title"
          />
          <h3>Options for question {questionIndex + 1}</h3>
          {question.options.map((option, optionIndex) => (
            <div className="flex gap-3" key={optionIndex}>
              <CreateTestField
                value={option.answer}
                onChange={e =>
                  handleOptionChange(questionIndex, optionIndex, e)
                }
                placeholder="Enter an answer"
              />
              <Checkbox
                value="Is correct"
                checked={option.isCorrect}
                onChange={e =>
                  handleIsCorrectChange(questionIndex, optionIndex, e)
                }
              />
            </div>
          ))}
        </div>
      ))}
      <Button color="coral">Create Test</Button>
    </form>
  );
};

export default CreateTestPage;
