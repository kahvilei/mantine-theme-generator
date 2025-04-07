import React from 'react';
import {
  IconAdjustments,
  IconAlertCircle,
  IconCheck,
  IconDashboard,
  IconInfoCircle,
  IconMessage,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react';
import {
  Accordion,
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Grid,
  Group,
  HoverCard,
  Indicator,
  Menu,
  NavLink,
  Paper,
  Progress,
  RingProgress,
  Stack,
  Stepper,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const Components: React.FC = () => {
  const { t } = useTranslation('components');
  const [stepper, setStepper] = React.useState<number>(1);
  return (
      <Stack gap="xl">
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <Card p="lg">
                <Stack gap="md">
                  <Title order={3}>{t('titles.actionComponents')}</Title>
                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.buttonSizes')}</Text>
                      <Group>
                        <Button size="xs">{t('buttons.xs')}</Button>
                        <Button size="sm">{t('buttons.sm')}</Button>
                        <Button size="md">{t('buttons.md')}</Button>
                        <Button size="lg">{t('buttons.lg')}</Button>
                        <Button size="xl">{t('buttons.xl')}</Button>
                      </Group>
                    </Stack>
                  </Paper>

                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.actionIconVariants')}</Text>
                      <Group>
                        <ActionIcon variant="filled" color="primary">
                          <IconPlus size={16} />
                        </ActionIcon>
                        <ActionIcon variant="light" color="primary">
                          <IconPlus size={16} />
                        </ActionIcon>
                        <ActionIcon variant="outline" color="primary">
                          <IconPlus size={16} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="primary">
                          <IconPlus size={16} />
                        </ActionIcon>
                        <ActionIcon variant="transparent" color="primary">
                          <IconPlus size={16} />
                        </ActionIcon>
                      </Group>
                    </Stack>
                  </Paper>

                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.menuComponent')}</Text>
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <Button variant="outline">{t('buttons.openMenu')}</Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Label>{t('menu.application')}</Menu.Label>
                          <Menu.Item leftSection={<IconSettings size={14} />}>{t('menu.settings')}</Menu.Item>
                          <Menu.Item leftSection={<IconMessage size={14} />}>{t('menu.messages')}</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item leftSection={<IconPhoto size={14} />}>{t('menu.gallery')}</Menu.Item>
                          <Menu.Item leftSection={<IconSearch size={14} />}>{t('menu.search')}</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Stack>
                  </Paper>
                </Stack>
              </Card>
              <Card p="lg">
                <Stack gap="md">
                  <Title order={3}>{t('titles.dataDisplay')}</Title>
                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.avatarIndicator')}</Text>
                      <Group>
                        <Avatar size="xs">{t('buttons.xs')}</Avatar>
                        <Avatar size="sm">{t('buttons.sm')}</Avatar>
                        <Avatar size="md">{t('buttons.md')}</Avatar>
                        <Avatar size="lg">{t('buttons.lg')}</Avatar>
                        <Avatar size="xl">{t('buttons.xl')}</Avatar>
                        <Indicator processing size={12}>
                          <Avatar size="md" src="https://i.pravatar.cc/300" />
                        </Indicator>
                      </Group>
                    </Stack>
                  </Paper>

                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.progressRingProgress')}</Text>
                      <Progress value={65} />
                      <Progress value={65} size="xl" radius="xs" />
                      <Group>
                        <RingProgress
                            size={80}
                            thickness={8}
                            sections={[
                              { value: 40, color: 'primary' },
                              { value: 25, color: 'green' },
                              { value: 15, color: 'orange' },
                            ]}
                        />
                        <RingProgress
                            size={80}
                            thickness={8}
                            sections={[{ value: 65, color: 'primary' }]}
                            label={
                              <Center>
                                <Text size="xs" fw={700}>
                                  {t('progress.percentage')}
                                </Text>
                              </Center>
                            }
                        />
                      </Group>
                    </Stack>
                  </Paper>

                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.table')}</Text>
                      <Table>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>{t('table.headers.item')}</Table.Th>
                            <Table.Th>{t('table.headers.price')}</Table.Th>
                            <Table.Th>{t('table.headers.status')}</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          <Table.Tr>
                            <Table.Td>{t('table.items.laptop')}</Table.Td>
                            <Table.Td>{t('table.prices.laptop')}</Table.Td>
                            <Table.Td>
                              <Badge color="green">{t('table.statuses.inStock')}</Badge>
                            </Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td>{t('table.items.phone')}</Table.Td>
                            <Table.Td>{t('table.prices.phone')}</Table.Td>
                            <Table.Td>
                              <Badge color="green">{t('table.statuses.inStock')}</Badge>
                            </Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td>{t('table.items.headphones')}</Table.Td>
                            <Table.Td>{t('table.prices.headphones')}</Table.Td>
                            <Table.Td>
                              <Badge color="red">{t('table.statuses.outOfStock')}</Badge>
                            </Table.Td>
                          </Table.Tr>
                        </Table.Tbody>
                      </Table>
                    </Stack>
                  </Paper>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>

          <Grid.Col span={6}>
            <Stack>
              <Card p="lg">
                <Stack gap="md">
                  <Title order={3}>{t('titles.navigationIndicators')}</Title>
                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.tabsVariants')}</Text>
                      <Tabs defaultValue="gallery">
                        <Tabs.List>
                          <Tabs.Tab value="gallery" leftSection={<IconPhoto size={16} />}>
                            {t('tabs.gallery')}
                          </Tabs.Tab>
                          <Tabs.Tab value="messages" leftSection={<IconMessage size={16} />}>
                            {t('tabs.messages')}
                          </Tabs.Tab>
                          <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
                            {t('tabs.settings')}
                          </Tabs.Tab>
                        </Tabs.List>
                      </Tabs>
                    </Stack>
                  </Paper>

                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.navLink')}</Text>
                      <Box>
                        <NavLink label={t('navLink.dashboard')} leftSection={<IconDashboard size={16} />} active />
                        <NavLink label={t('navLink.settings')} leftSection={<IconSettings size={16} />} />
                        <NavLink
                            label={t('navLink.messages')}
                            leftSection={<IconMessage size={16} />}
                            rightSection={<Badge size="sm">3</Badge>}
                        />
                      </Box>
                    </Stack>
                  </Paper>

                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.stepper')}</Text>
                      <Stepper active={stepper} onStepClick={setStepper}>
                        <Stepper.Step
                            label={t('stepper.step1.label')}
                            description={t('stepper.step1.description')}
                        />
                        <Stepper.Step
                            label={t('stepper.step2.label')}
                            description={t('stepper.step2.description')}
                        />
                        <Stepper.Step
                            label={t('stepper.step3.label')}
                            description={t('stepper.step3.description')}
                        />
                      </Stepper>
                    </Stack>
                  </Paper>
                </Stack>
              </Card>
              <Card p="lg">
                <Stack gap="md">
                  <Title order={3}>{t('titles.containersLayout')}</Title>
                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.accordion')}</Text>
                      <Accordion>
                        <Accordion.Item value="item-1">
                          <Accordion.Control icon={<IconInfoCircle size={16} />}>
                            {t('accordion.item1.title')}
                          </Accordion.Control>
                          <Accordion.Panel>
                            {t('accordion.item1.content')}
                          </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item value="item-2">
                          <Accordion.Control icon={<IconAdjustments size={16} />}>
                            {t('accordion.item2.title')}
                          </Accordion.Control>
                          <Accordion.Panel>
                            {t('accordion.item2.content')}
                          </Accordion.Panel>
                        </Accordion.Item>
                      </Accordion>
                    </Stack>
                  </Paper>

                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.alertVariants')}</Text>
                      <Alert title={t('alerts.information.title')} color="blue" icon={<IconInfoCircle />}>
                        {t('alerts.information.content')}
                      </Alert>
                      <Alert title={t('alerts.success.title')} color="green" variant="filled" icon={<IconCheck />}>
                        {t('alerts.success.content')}
                      </Alert>
                      <Alert
                          title={t('alerts.warning.title')}
                          color="yellow"
                          variant="outline"
                          icon={<IconAlertCircle />}
                      >
                        {t('alerts.warning.content')}
                      </Alert>
                    </Stack>
                  </Paper>

                  <Paper p="md">
                    <Stack>
                      <Text fw={500}>{t('labels.hoverCard')}</Text>
                      <Group align="center">
                        <HoverCard width={280} shadow="md">
                          <HoverCard.Target>
                            <Button>{t('buttons.hoverMe')}</Button>
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Text size="sm">
                              {t('hoverCard.content')}
                            </Text>
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </Group>
                    </Stack>
                  </Paper>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
  );
};