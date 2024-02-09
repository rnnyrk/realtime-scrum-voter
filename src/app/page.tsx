import { Button } from 'common/interaction/Button';
import { Lane } from 'common/layout/Lane';

const Home = () => {
  return (
    <section className="w-full flex justify-center py-4 space-x-2">
      <Lane.Container title="Good" />
      <Lane.Container title="Bad" />
      <Lane.Container title="Actions" />
      <Lane.Container title="Ideas" />

      <Button
        variant="secondary"
        className="fixed bottom-4 left-2/4 -translate-x-2/4"
      >
        Add user story
      </Button>
    </section>
  );
};

export default Home;
