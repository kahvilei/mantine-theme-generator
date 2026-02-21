import { ActionIcon, Badge, Button, Card, Group, Stack, Table, Text, TextInput, Title } from "@mantine/core";
import { IconDownload, IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const statusColor: Record<string, string> = {
  Completed: 'green',
  Pending: 'yellow',
  Refunded: 'red',
};

const dataTable: ThemeBlock = {
  id: 'data-table',
  title: 'blocks.dataTable.title',
  category: 'General',
  tags: ['Table', 'Data', 'Orders'],
  components: ['ActionIcon', 'Badge', 'Button', 'Card', 'Group', 'Stack', 'Table', 'Text', 'TextInput', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('dataTable.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Title order={5}>{data.heading}</Title>
            <Group gap="xs">
              <TextInput
                placeholder={data.searchPlaceholder}
                leftSection={<IconSearch size={14} />}
                size="xs"
                w={160}
              />
              <Button size="xs" variant="default" leftSection={<IconDownload size={14} />}>
                {data.exportButton}
              </Button>
            </Group>
          </Group>

          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{data.columns.order}</Table.Th>
                <Table.Th>{data.columns.customer}</Table.Th>
                <Table.Th>{data.columns.amount}</Table.Th>
                <Table.Th>{data.columns.status}</Table.Th>
                <Table.Th w={60} />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.rows.map((row: any) => (
                <Table.Tr key={row.id}>
                  <Table.Td>
                    <Text size="xs" fw={600}>{row.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{row.customer}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" fw={500}>{row.amount}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge size="xs" color={statusColor[row.status]} variant="light">
                      {row.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon.Group>
                      <ActionIcon size="xs" variant="subtle" color="gray">
                        <IconEdit size={12} />
                      </ActionIcon>
                      <ActionIcon size="xs" variant="subtle" color="red">
                        <IconTrash size={12} />
                      </ActionIcon>
                    </ActionIcon.Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Text size="xs" c="dimmed">{data.rows.length} {data.rowsLabel}</Text>
        </Stack>
      </Card>
    );
  },
};

export default dataTable;
