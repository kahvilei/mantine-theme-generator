import React, { useState, useMemo, useRef } from 'react';
import {
  TextInput,
  Chip,
  Stack,
  Group,
  Card,
  Box,
} from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';
import { themeBlocks, ThemeBlock } from './Blocks';
import Masonry from 'react-masonry-css';
import './BlockDisplayGrid.css';

interface BlockDisplayGridProps {
  blocks?: ThemeBlock[];
}

// Column logic based on container width
function getColumns(width: number) {
  if (width > 1200) return 4;
  if (width > 900) return 3;
  if (width > 400) return 2;
  return 1;
}

export const BlockDisplayGrid: React.FC<BlockDisplayGridProps> = ({
  blocks = themeBlocks,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, rect] = useResizeObserver();
  const containerWidth = rect?.width ?? 0;
  const columnCount = getColumns(containerWidth || 0);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blocks.forEach((b) => tagSet.add(b.category??''));
    return Array.from(tagSet).sort();
  }, [blocks]);

  const filtered = useMemo(() => {
    return blocks.filter((b) => {
      const searchMatch =
        search.trim() === '' ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.components?.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        b.category?.toLowerCase().includes(search.toLowerCase()) ||
        b.category?.toLowerCase() === search.toLowerCase() ||
        b.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => b.tags?.includes(tag));
      return searchMatch && tagsMatch;
    });
  }, [blocks, search, selectedTags]);

  return (
    <Box ref={ref}>
    <Stack gap="xl" ref={containerRef}>
      <Group align="flex-end" gap="md">
        <TextInput
          placeholder="Search blocks…"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Chip.Group
          multiple
          value={selectedTags}
          onChange={(val) => {
            if (Array.isArray(val)) {
              setSelectedTags(val);
            } else {
              setSelectedTags(val ? [val] : []);
            }
          }}
        >
          <Group gap="xs">
            {allTags.map((tag) => (
              <Chip key={tag} value={tag}>
                {tag}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      </Group>

      <Masonry
        breakpointCols={columnCount}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {filtered.map((b) => (
          <b.render key={b.id} />
        ))}
      </Masonry>
    </Stack>
    </Box>
  );
};
