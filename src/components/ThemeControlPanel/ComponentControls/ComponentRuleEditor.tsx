import React from 'react';
import { IconArrowDown, IconArrowUp, IconBrandMantine, IconTrash } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import {
  ActionIcon,
  Box,
  Card,
  Collapse,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { Component } from '@/data/Models/Theme/Components/Component';
import { Components } from '@/data/Models/Theme/Components/Components';
import { components as ComponentsManager } from '@/data/Store';
import { ComponentProps } from './componentPropDefinitions';
import ComponentPropertyEditor, {
  AddPropertyButton,
  AddStylePropertyButton,
  AddStyleSelectorButton,
  StylePropertyEditor,
} from './ComponentPropertyEditor';
import { useTranslation } from 'react-i18next';

interface ComponentRuleEditorProps {
  componentRule: Component;
  componentsManager?: Components;
  onDelete?: () => void;
}

const ComponentRuleEditor = observer(
    ({
       componentRule,
       componentsManager = ComponentsManager,
       onDelete,
     }: ComponentRuleEditorProps) => {
      const { t } = useTranslation(['theme']);
      const [isOpen, setIsOpen] = React.useState(false);

      // Utility to convert camelCase to kebab-case for URLs
      const urlize = (name: string) => {
        return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      };

      const handleDefaultPropChange = (key: string, value: string | boolean) => {
        componentRule.setProp(key, value);
      };

      const handleRemoveProp = (key: string) => {
        componentRule.removeProp(key);
      };

      const handleAddProp = (key: string) => {
        componentRule.setProp(key, '');
      };

      const handleStyleChange = (selector: string, property: string, value: string) => {
        componentRule.setStyle(selector, property, value);
      };

      const handleRemoveStyle = (selector: string, property: string) => {
        componentRule.removeStyle(selector, property);
      };

      const handleRemoveSelector = (selector: string) => {
        componentRule.removeSelector(selector);
      };

      const handleAddStyle = (selector: string, property: string) => {
        componentRule.setStyle(selector, property, '');
      };

      const handleAddSelector = (selector: string) => {
        componentRule.addSelector(selector);
      };

      const handleDelete = () => {
        if (onDelete) {
          onDelete();
        } else {
          componentsManager.removeRule(componentRule.name);
        }
      };

      return (
          <Paper p="md" withBorder>
            <Group justify="space-between" align="center">
              <Group gap={2}>
                <Title order={4}>{componentRule.name}</Title>
                <Tooltip label={t('components.docsLink')}>
                  <ActionIcon
                      color="blue"
                      variant="transparent"
                      onClick={() =>
                          window.open(`https://mantine.dev/core/${urlize(componentRule.name)}`, '_blank')
                      }
                  >
                    <IconBrandMantine size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>
              <Group gap={5}>
                <ActionIcon onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
                </ActionIcon>
                <ActionIcon color="red" onClick={handleDelete}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Group>

            <Collapse in={isOpen}>
              <Box>
                <Text>{t('components.defaultProps')}</Text>
                <Stack gap="sm" p={'10px 0'}>
                  {Object.entries(componentRule.defaultProps || {}).map(([key, value]) => (
                      <ComponentPropertyEditor
                          key={key}
                          componentName={componentRule.name as keyof ComponentProps}
                          propKey={key}
                          propValue={value as string}
                          onChange={(newValue) => handleDefaultPropChange(key, newValue as string)}
                          onRemove={() => handleRemoveProp(key)}
                      />
                  ))}
                  <AddPropertyButton
                      componentName={componentRule.name as keyof ComponentProps}
                      currentProps={componentRule.defaultProps || {}}
                      onAdd={handleAddProp}
                  />
                </Stack>
                <Text mt="md">{t('components.stylesAPI')}</Text>
                <Stack gap="sm" p={'10px 0'}>
                  {Object.entries(componentRule.styles || {}).map(([selector, styles]) => (
                      <Card key={selector} radius="sm" padding="xs" withBorder>
                        <Group justify="space-between" align="center" wrap="nowrap">
                          <Text size="sm" fw={'700'}>
                            {selector}
                          </Text>
                          <ActionIcon color="red" onClick={() => handleRemoveSelector(selector)}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>
                        <Stack gap="sm" p={'10px 0'}>
                          {Object.entries(styles as { [key: string]: string }).map(([prop, value]) => (
                              <StylePropertyEditor
                                  key={prop}
                                  selector={selector}
                                  property={prop}
                                  value={value as string}
                                  onChange={(newValue) =>
                                      handleStyleChange(selector, prop, newValue as string)
                                  }
                                  onRemove={() => handleRemoveStyle(selector, prop)}
                              />
                          ))}
                          <AddStylePropertyButton
                              selector={selector}
                              currentStyles={styles as { [key: string]: string }}
                              onAdd={(prop) => handleAddStyle(selector, prop)}
                          />
                        </Stack>
                      </Card>
                  ))}
                  <AddStyleSelectorButton
                      onAdd={handleAddSelector}
                      componentName={componentRule.name as keyof ComponentProps}
                  />
                </Stack>
              </Box>
            </Collapse>
          </Paper>
      );
    }
);

export default ComponentRuleEditor;