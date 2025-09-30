import { colors } from "@/data/Store";
import { ActionIcon, Box, Card, Group, Loader, Paper, Progress, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconCheck, IconFile, IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const fileUpload:ThemeBlock = {
    id: 'file-upload',
    title: 'blocks.fileUpload.title',
    category: 'General',
    tags: ['Upload', 'Files', 'Drag'],
    components: ['ActionIcon', 'Group', 'Loader', 'Paper', 'Progress', 'Stack', 'Text', 'ThemeIcon'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const files = t('fileUpload.files', { returnObjects: true }) as any[];
      return (
        <Card>
          <Group align="stretch" justify="stretch">
            <Box
              p="xl"
              flex={1}
              miw={200}
              style={{
                border: '1px dashed var(--mantine-primary-color-filled)',
                cursor: 'pointer',
                borderRadius: 'var(--mantine-radius-md)',
                '&:hover': {
                  borderColor: `var(--mantine-color-${colors.primaryColor}-5)`,
                  backgroundColor: `var(--mantine-color-${colors.primaryColor}-0)`
                }
              }}
            >
              <Stack align="center" gap="xs">
                <ThemeIcon size="xl" color={colors.primaryColor}>
                  <IconUpload size={24} />
                </ThemeIcon>
                <div style={{ textAlign: 'center' }}>
                  <Text size="sm" fw={500}>Drop files here or click to upload</Text>
                  <Text size="xs" c="dimmed">PNG, JPG up to 10MB</Text>
                </div>
              </Stack>
            </Box>
            
            <Stack gap="xs" flex={1} miw={200}>
              {files.map((file: any) => (
                <Paper key={file.name} p={'sm'}>
                  <Group justify="space-between">
                    <Group gap="xs">
                      <ThemeIcon size="sm" color={file.type === 'image' ? 'green' : 'blue'}>
                        {file.type === 'image' ? <IconPhoto size={14} /> : <IconFile size={14} />}
                      </ThemeIcon>
                      <div>
                        <Text size="xs" fw={500}>{file.name}</Text>
                        <Text size="xs" c="dimmed">{file.size}</Text>
                      </div>
                    </Group>
                    {file.status === 'uploading' ? (
                      <Loader size="xs" />
                    ) : file.status === 'complete' ? (
                      <ThemeIcon size="xs" color="green">
                        <IconCheck size={10} />
                      </ThemeIcon>
                    ) : (
                      <ActionIcon size="xs" variant="subtle" color="red">
                        <IconX size={12} />
                      </ActionIcon>
                    )}
                  </Group>
                  {file.status === 'uploading' && (
                    <Progress value={file.progress} size="xs" mt="xs" color={colors.primaryColor} />
                  )}
                </Paper>
              ))}
            </Stack>
          </Group>
        </Card>
      );
    },
  }
export default fileUpload;