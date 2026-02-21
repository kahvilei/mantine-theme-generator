import React, { useState, useMemo } from 'react';
import {
  TextInput,
  Chip,
  Stack,
  Group,
  Box,
} from '@mantine/core';
import { themeBlocks, ThemeBlock } from './Blocks';
import './BlockDisplayGrid.css';

interface BlockDisplayGridProps {
  blocks?: ThemeBlock[];
}

export const BlockDisplayGrid: React.FC<BlockDisplayGridProps> = ({
  blocks = themeBlocks,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <Box>
    <Stack gap="xl">
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

      <Box className='masonry-grid'>
        {filtered.map((b) => (
          <b.render key={b.id} />
        ))}
      </Box>

    </Stack>
    </Box>
  );
};
