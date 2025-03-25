import React from 'react';
import {
  IconArrowDown,
  IconArrowUp,
  IconBrandMantine,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Collapse,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import EditorPage from '@/components/ThemeControlPanel/Shared/Layout/EditorPage';
import { selectComponentRuleByName, selectComponentRules } from '@/data/ThemeState/themeSelectors';
import { deleteComponentRule, setComponentRule } from '@/data/ThemeState/themeSlice';
import { RootState } from '@/main';
import { ComponentProps } from './componentPropDefinitions';
import ComponentPropertyEditor, {
  AddPropertyButton,
  AddStylePropertyButton,
  AddStyleSelectorButton,
  StylePropertyEditor,
} from './ComponentPropertyEditor';
import ComponentSelector from './ComponentSelector';

const ComponentRuleEditor: React.FC<{ componentName: string }> = ({ componentName }) => {
  const dispatch = useDispatch();
  const rule = useSelector((state: RootState) => selectComponentRuleByName(state, componentName));
  const [isOpen, setIsOpen] = React.useState(false);

  //urlize names by inserting hyphens between camelCase words, not including the first word

  const urlize = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  };

  const handleDefaultPropChange = (key: string, value: string | boolean) => {
    dispatch(
      setComponentRule({
        key: componentName,
        value: {
          ...rule,
          defaultProps: {
            ...rule.defaultProps,
            [key]: value,
          },
        },
      })
    );
  };

  const handleRemoveProp = (key: string) => {
    const newProps = { ...rule.defaultProps };
    delete newProps[key];
    dispatch(
      setComponentRule({
        key: componentName,
        value: {
          ...rule,
          defaultProps: newProps,
        },
      })
    );
  };

  const handleAddProp = (key: string) => {
    dispatch(
      setComponentRule({
        key: componentName,
        value: {
          ...rule,
          defaultProps: {
            ...rule.defaultProps,
            [key]: '',
          },
        },
      })
    );
  };

  const handleStyleChange = (selector: string, property: string, value: string) => {
    dispatch(
      setComponentRule({
        key: componentName,
        value: {
          ...rule,
          styles: {
            ...rule.styles,
            [selector]: {
              ...rule.styles?.[selector],
              [property]: value,
            },
          },
        },
      })
    );
  };

  const handleRemoveStyle = (selector: string, property: string) => {
    const newStyles = { ...rule.styles };
    const newSelector = { ...newStyles[selector] };
    delete newSelector[property];
    dispatch(
      setComponentRule({
        key: componentName,
        value: {
          ...rule,
          styles: {
            ...rule.styles,
            [selector]: newSelector,
          },
        },
      })
    );
  };

  const handleRemoveSelector = (selector: string) => {
    const newStyles = { ...rule.styles };
    delete newStyles[selector];
    dispatch(
      setComponentRule({
        key: componentName,
        value: {
          ...rule,
          styles: newStyles,
        },
      })
    );
  };

  const handleAddStyle = (selector: string, property: string) => {
    dispatch(
      setComponentRule({
        key: componentName,
        value: {
          ...rule,
          styles: {
            ...rule.styles,
            [selector]: {
              ...rule.styles?.[selector],
              [property]: '',
            },
          },
        },
      })
    );
  };

  const handleAddSelector = (selector: string) => {
    dispatch(
      setComponentRule({
        key: componentName,
        value: {
          ...rule,
          styles: {
            ...rule.styles,
            [selector]: {},
          },
        },
      })
    );
  };

  return (
    <Paper p="md" withBorder>
      <Group justify="space-between" align="center">
        <Group gap={2}>
          <Title order={4}>{componentName}</Title>
          <Tooltip label="Mantine Documentation">
            <ActionIcon
              color="blue"
              variant="transparent"
              onClick={() =>
                window.open(`https://mantine.dev/core/${urlize(componentName)}`, '_blank')
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
          <ActionIcon color="red" onClick={() => dispatch(deleteComponentRule(componentName))}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Group>

      <Collapse in={isOpen}>
        <Box>
          <Text>Default Props</Text>
          <Stack gap="sm" p={'10px 0'}>
            {Object.entries(rule?.defaultProps || {}).map(([key, value]) => (
              <ComponentPropertyEditor
                key={key}
                componentName={componentName as keyof ComponentProps}
                propKey={key}
                propValue={value as string}
                onChange={(newValue) => handleDefaultPropChange(key, newValue as string)}
                onRemove={() => handleRemoveProp(key)}
              />
            ))}
            <AddPropertyButton
              componentName={componentName as keyof ComponentProps}
              currentProps={rule?.defaultProps || {}}
              onAdd={(key) => handleAddProp(key)}
            />
          </Stack>
          <Text mt="md">Styles API</Text>
          <Stack gap="sm" p={'10px 0'}>
            {Object.entries(rule?.styles || {}).map(([selector, styles]) => (
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
                      onChange={(newValue) => handleStyleChange(selector, prop, newValue as string)}
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
              onAdd={(selector) => handleAddSelector(selector)}
              componentName={componentName as keyof ComponentProps}
            />
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  );
};

const ComponentRulesManager: React.FC = () => {
  const dispatch = useDispatch();
  const componentRules = useSelector(selectComponentRules);
  const [selectedComponent, setSelectedComponent] = React.useState<string | null>(null);

  const handleAddComponent = () => {
    if (selectedComponent !== null) {
      dispatch(
        setComponentRule({
          key: selectedComponent,
          value: {
            defaultProps: {},
            styles: {},
          },
        })
      );
      setSelectedComponent(null);
    }
  };

  return (
    <EditorPage title="Component Controls">
      <Text size="sm" c="dimmed">
        Select a component below to define default props and styles. These rules will be applied to
        all instances of the component in the theme.
      </Text>
      <Group>
        <ComponentSelector value={selectedComponent} onChange={setSelectedComponent} />
        <Button
          onClick={handleAddComponent}
          disabled={!selectedComponent}
          rightSection={!selectedComponent ? null : <IconPlus size={16} />}
        >
          Add Component Rule
        </Button>
      </Group>

      <Stack>
        {componentRules &&
          Object.keys(componentRules).map((componentName) => (
            <ComponentRuleEditor key={componentName} componentName={componentName as string} />
          ))}
      </Stack>
      <Text size="sm" c="dimmed">
        For reference on each component's props and styles API, see the{' '}
        <a target="_blank" href="https://mantine.dev/overview/">
          Mantine Documentation
        </a>
        , or click the icon next to added component's names.
      </Text>
      <Text size="sm" c="dimmed">
        This feature is meant to be include all core components and their props and styles. If you
        notice a component or setting is missing, please let me know by opening an issue on the
        <a target="_blank" href="https://github.com/kahvilei/mantine-theme-generator">
          {' '}
          GitHub repository
        </a>
      </Text>
    </EditorPage>
  );
};

export default ComponentRulesManager;
