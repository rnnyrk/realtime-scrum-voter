'use client';

import type * as i from 'types';
import { useContext } from 'react';

import { RoomContext, useRoomStore } from 'store/room';
import { cn } from 'utils';
import { Button } from 'common/interaction/Button';
import { Heading } from 'common/typography/Heading';

const LaneContainer = ({ className, children, category, title }: LaneContainerType) => {
  const room = useContext(RoomContext);
  const { username } = useRoomStore();
  const categoryData = room!.getCardsByCategory(category);

  function onToggleVote(cardId: string) {
    if (!room || !username) return;
    const { dispatch, roomState } = room;

    const currentCategory = roomState?.cards?.[category];
    const card = currentCategory?.find((item) => item.id === cardId);
    if (!currentCategory || !card) return;

    // Add or remove username to card.votes
    if (card?.votes?.includes(username)) {
      card.votes = card.votes.filter((vote) => vote !== username);
    } else {
      card.votes = [...(card?.votes || []), username];
    }

    // Update card in currentCategory
    currentCategory![currentCategory!.findIndex((item) => item.id === cardId)] = card;

    dispatch({
      type: 'SetState',
      state: {
        cards: {
          ...(roomState?.cards || {}),
          [category]: currentCategory,
        },
      },
    });
  }

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
          {categoryData.map((item, index) => {
            return (
              <Lane.Item
                key={`item_${category}_${index}`}
                votes={item.votes}
              >
                <strong>{item.title}</strong>
                <p>{item.description}</p>

                {username ? (
                  <Button
                    className="mt-2 w-full"
                    variant="secondary"
                    size="sm"
                    onClick={() => onToggleVote(item.id)}
                  >
                    {item.votes && item.votes?.includes(username) ? 'Remove vote' : 'Vote'}
                  </Button>
                ) : (
                  <p className="mt-2 mb-0 text-sm text-red-600">No username found</p>
                )}
              </Lane.Item>
            );
          })}
        </div>
      )}

      {children}
    </div>
  );
};

type LaneContainerType = {
  className?: string;
  children?: React.ReactNode;
  category: i.CardCategories;
  title: string;
};

const LaneItem = ({ className, children, votes }: LaneItemType) => (
  <div
    className={cn('relative p-4 my-2 rounded-md border-2 border-slate-800 bg-slate-700', className)}
  >
    {votes && votes.length > 0 && (
      <div className="absolute top-2 right-2 flex space-x-1">
        {votes.map((_, index) => (
          <span
            key={`vote_${index}`}
            className="w-4 h-4 rounded-full bg-primary"
          />
        ))}
      </div>
    )}
    {children}
  </div>
);

type LaneItemType = {
  className?: string;
  children: React.ReactNode;
  votes?: string[];
};

export const Lane = {
  Container: LaneContainer,
  Item: LaneItem,
};
