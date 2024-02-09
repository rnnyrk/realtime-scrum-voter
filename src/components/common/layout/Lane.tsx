import { cn } from 'utils';
import { Heading } from 'common/typography/Heading';

const LaneContainer = ({ className, children, title }: LaneContainerType) => {
  return (
    <div className={cn(`flex flex-col flex-1 p-0`, className)}>
      <Heading
        variant="h2"
        className="px-3 py-2 bg-primary text-white rounded-md"
      >
        {title}
      </Heading>
      {children}
    </div>
  );
};

type LaneContainerType = {
  className?: string;
  children?: React.ReactNode;
  title: string;
};

const LaneItem = ({ className, children }: LaneItemType) => (
  <div
    className={cn(`py-2 px-4 my-2 rounded-md border-2 border-slate-500 bg-slate-300`, className)}
  >
    {children}
  </div>
);

type LaneItemType = {
  className?: string;
  children: React.ReactNode;
};

export const Lane = {
  Container: LaneContainer,
  Item: LaneItem,
};
