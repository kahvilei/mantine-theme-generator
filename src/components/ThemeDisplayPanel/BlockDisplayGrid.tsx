import React, { useState, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { Button, Group, MultiSelect, Stack } from '@mantine/core';
import { themeBlocks, ThemeBlock } from './Blocks';
import './BlockDisplayGrid.css';

const BREAKPOINT_COLS = { default: 3, 1100: 2, 640: 1 };

interface BlockDisplayGridProps {
  blocks?: ThemeBlock[];
}

export const BlockDisplayGrid: React.FC<BlockDisplayGridProps> = ({
  blocks = themeBlocks,
}) => {
  // Checked once on mount — stable for the lifetime of the component
  const [nativeMasonry] = useState(
    () => typeof CSS !== 'undefined' && CSS.supports('grid-template-rows', 'masonry')
  );

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [];
    blocks.forEach((b) => {
      if (b.category && !seen.has(b.category)) {
        seen.add(b.category);
        cats.push(b.category);
      }
    });
    return cats;
  }, [blocks]);

  const allComponents = useMemo(() => {
    const seen = new Set<string>();
    blocks.forEach((b) => b.components?.forEach((c) => seen.add(c)));
    return Array.from(seen).sort();
  }, [blocks]);

  const filtered = useMemo(() => {
    let result = selectedCategory === 'All'
      ? blocks
      : blocks.filter((b) => b.category === selectedCategory);

    if (selectedComponents.length > 0) {
      result = result.filter((b) =>
        selectedComponents.every((c) => b.components?.includes(c as any))
      );
    }

    return result;
  }, [blocks, selectedCategory, selectedComponents]);

  const renderGrid = () => {
    if (nativeMasonry) {
      return (
        <div className="masonry-grid-native">
          {filtered.map((b) => {
            const Render = b.render;
            return (
              <div
                key={b.id}
                className={b.colSpan === 2 ? 'masonry-item masonry-item--wide' : 'masonry-item'}
              >
                <Render />
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <Masonry
        breakpointCols={BREAKPOINT_COLS}
        className="masonry-grid"
        columnClassName="masonry-col"
      >
        {filtered.map((b) => {
          const Render = b.render;
          return <Render key={b.id} />;
        })}
      </Masonry>
    );
  };

  return (
    <Stack gap="xl" w="100%" maw={1400}>
      <Group justify="space-between" align="flex-end" wrap="wrap" gap="xs">
        <Group gap="xs">
          {['All', ...allCategories].map((cat) => (
            <Button
              key={cat}
              size="xs"
              radius="xl"
              variant={selectedCategory === cat ? 'filled' : 'default'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </Group>

        <MultiSelect
          placeholder="Filter by component…"
          data={allComponents}
          value={selectedComponents}
          onChange={setSelectedComponents}
          searchable
          clearable
          size="xs"
          w={220}
        />
      </Group>

      {renderGrid()}
    </Stack>
  );
};
