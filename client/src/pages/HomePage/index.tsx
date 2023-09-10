import { FC } from 'react';
// import Header from '../../components/common/Header';
import { useGetAllTestsQuery } from '../../store/api/tests.api.ts';
import UserData from '../../components/shared/UserData';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

export interface TestData {
  _id: string;
  name: string;
  description: string;
  content: {
    questionId: string;
    questionTitle: string;
    options: {
      answer: string;
      isCorrect: boolean;
    }[];
  }[];
  owner: string;
}

const HomePage: FC = () => {
  const { data, error, isLoading } = useGetAllTestsQuery({});
  const tests: TestData[] = data?.tests;

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
    <>
      <h1 className="text-4xl font-semibold">Available tests</h1>
      <ul className="mt-5 flex gap-3">
        {tests.map(test => (
          <li
            key={test._id}
            className="flex flex-col gap-2 bg-white rounded-lg p-5"
          >
            <h2 className="text-2xl font-medium">{test.name}</h2>
            <p className="text-lg">{test.description}</p>
            <UserData owner={test.owner} />
            {/*<Button color="coral">Open test</Button>*/}
            <Link to={`/${test._id}`}>
              <Button color="coral">Open test</Button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
