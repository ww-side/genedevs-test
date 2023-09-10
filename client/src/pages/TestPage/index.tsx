import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { TestData } from '../HomePage';
import { useGetTestByIdQuery } from '../../store/api/tests.api.ts';
import UserData from '../../components/shared/UserData';

const TestPage: FC = () => {
  const { testId } = useParams();
  const { data, error, isLoading } = useGetTestByIdQuery(testId);
  const test: TestData[] = data?.selectedTest ? [data.selectedTest] : [];

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <div>Error loading data</div>
      </>
    );
  }

  return (
    <div className="mt-5 flex gap-3">
      {test.map(test => (
        <div key={test._id} className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium">Title: {test.name}</h2>
          <h3 className="text-lg">Description: {test.description}</h3>
          <h3 className="text-lg">Questions: </h3>
          <ul className="list-disc pl-6">
            {test.content.map(question => (
              <li key={question.questionId} className="ml-3">
                {question.questionTitle}
              </li>
            ))}
          </ul>
          <UserData owner={test.owner} />
        </div>
      ))}
    </div>
  );
};

export default TestPage;
