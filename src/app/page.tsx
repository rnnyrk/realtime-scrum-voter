'use client';

import { Lane } from 'common/layout/Lane';
import { AddCardModal } from 'modules/modals/AddCardModal';

const Home = () => {
  return (
    <section className="w-full flex justify-center py-4 space-x-2">
      <Lane.Container
        title="Good"
        category="good"
      />
      <Lane.Container
        title="Bad"
        category="bad"
      />
      <Lane.Container
        title="Actions"
        category="actions"
      />
      <Lane.Container
        title="Ideas"
        category="ideas"
      />

      <AddCardModal />
    </section>
  );
};

export default Home;
