import { Button } from 'common/interaction/Button';
import { Lane } from 'common/layout/Lane';

const Home = () => {
  return (
    <section className="w-full flex justify-center py-4 space-x-2">
      <Lane.Container title="Good">
        <Button
          className="w-full"
          size="sm"
        >
          Add good item
        </Button>
      </Lane.Container>
      <Lane.Container title="Bad">
        <Button
          className="w-full"
          size="sm"
        >
          Add bad item
        </Button>
      </Lane.Container>
      <Lane.Container title="Actions">
        <Button
          className="w-full"
          size="sm"
        >
          Add new action
        </Button>
      </Lane.Container>
      <Lane.Container title="Ideas">
        <Button
          className="w-full"
          size="sm"
        >
          Add an idea
        </Button>
      </Lane.Container>
    </section>
  );
};

export default Home;
