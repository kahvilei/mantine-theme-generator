// BlockDisplayGrid.tsx
import React, { useState, useMemo } from 'react';
import {
  TextInput,
  Chip,
  Box,
  Stack,
  Group,
  Card,
} from '@mantine/core';
import { themeBlocks, ThemeBlock } from './Blocks/Blocks';
import Masonry from 'react-masonry-css';

interface BlockDisplayGridProps {
  blocks?: ThemeBlock[];
}

const breakpointCols = {
  default: 4,
  1200: 3,
  800: 2,
  500: 1,
};

export const BlockDisplayGrid: React.FC<BlockDisplayGridProps> = ({
  blocks = themeBlocks,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blocks.forEach((b) => b.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [blocks]);

  const filtered = useMemo(() => {
    return blocks.filter((b) => {
      const searchMatch =
        search.trim() === '' ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => b.tags.includes(tag));
      return searchMatch && tagsMatch;
    });
  }, [blocks, search, selectedTags]);

  return (
    <Stack gap="md">
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
            // Mantine’s Chip.Group onChange gives string or string[]
            // When multiple=true, val is string[]
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
        breakpointCols={breakpointCols}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {filtered.map((b) => (
          <Card>
            {b.render}
          </Card>
        ))}
      </Masonry>
    </Stack>
  );
};
