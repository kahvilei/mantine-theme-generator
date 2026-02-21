import { Badge, Card, Stack, Table, Text, Title } from "@mantine/core";
import { ThemeBlock } from "../Blocks";

const rows = [
  { id: '#3012', customer: 'Alice Chen',   amount: '$142.00', status: 'Completed' },
  { id: '#3011', customer: 'Bob Smith',    amount: '$89.50',  status: 'Pending'   },
  { id: '#3010', customer: 'Carol Davis',  amount: '$234.00', status: 'Completed' },
  { id: '#3009', customer: 'Dan Wilson',   amount: '$57.25',  status: 'Refunded'  },
  { id: '#3008', customer: 'Eva Martinez', amount: '$310.00', status: 'Pending'   },
];

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
  components: ['Badge', 'Card', 'Stack', 'Table', 'Text', 'Title'],
  render: () => {
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>Recent Orders</Title>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td>
                    <Text size="xs" fw={600}>{row.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{row.customer}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{row.amount}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge size="xs" color={statusColor[row.status]} variant="light">
                      {row.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Card>
    );
  },
};

export default dataTable;
