import React from "react";
import { Anchor, Badge, Breadcrumbs, Card, NavLink, Stack, Text } from "@mantine/core";
import {
  IconChartBar,
  IconFiles,
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const navIcons = [
  <IconLayoutDashboard size={16} />,
  <IconFiles size={16} />,
  <IconUsers size={16} />,
  <IconChartBar size={16} />,
  <IconSettings size={16} />,
];

const appNavigation: ThemeBlock = {
  id: 'app-navigation',
  title: 'blocks.appNavigation.title',
  category: 'General',
  tags: ['Navigation', 'NavLink', 'Breadcrumbs'],
  components: ['Anchor', 'Badge', 'Breadcrumbs', 'Card', 'NavLink', 'Stack', 'Text'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('appNavigation.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Breadcrumbs separator="›" fz="xs">
            {data.breadcrumbs.map((crumb: any) => (
              <Anchor key={crumb.label} size="xs">{crumb.label}</Anchor>
            ))}
          </Breadcrumbs>

          <Text size="xs" c="dimmed" tt="uppercase" fw={600} lts={0.5}>
            {data.navLabel}
          </Text>

          <Stack gap={2}>
            {data.items.map((item: any, idx: number) => (
              <NavLink
                key={item.label}
                label={item.label}
                leftSection={navIcons[idx % navIcons.length]}
                active={item.active}
                rightSection={
                  item.badge
                    ? <Badge size="xs">{item.badge}</Badge>
                    : undefined
                }
              />
            ))}
          </Stack>
        </Stack>
      </Card>
    );
  },
};

export default appNavigation;
