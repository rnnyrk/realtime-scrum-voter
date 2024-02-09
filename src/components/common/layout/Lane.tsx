'use client';

import type * as i from 'types';

import { useCategoryData } from 'store/categories';
import { cn } from 'utils';
import { Heading } from 'common/typography/Heading';

const LaneContainer = ({ className, children, category, title }: LaneContainerType) => {
  const categoryData = useCategoryData(category);

  return (
    <div className={cn(`flex flex-col flex-1 p-0`, className)}>
      <Heading
        variant="h2"
        className="px-3 py-2 bg-primary text-white rounded-md"
      >
        {title}
      </Heading>

      {categoryData && (
        <div className="flex-1 overflow-y-auto">
          {categoryData.map((item, index) => (
            <Lane.Item key={`item_${category}_${index}`}>{item.title}</Lane.Item>
          ))}
        </div>
      )}

      {children}
    </div>
  );
};

type LaneContainerType = {
  className?: string;
  children?: React.ReactNode;
  category: i.Categories;
  title: string;
};

const LaneItem = ({ className, children }: LaneItemType) => (
  <div
    className={cn(`py-2 px-4 my-2 rounded-md border-2 border-slate-800 bg-slate-700`, className)}
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
