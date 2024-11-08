import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Text,
  Stack,
  Group,
  Select,
  TextInput,
  Switch,
  ActionIcon,
  Paper,
  Button,
  Collapse,
  Title,
  Card,
} from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconPlus, IconTrash, } from '@tabler/icons-react';
import { selectComponentRules, selectComponentRuleByName } from '@/data/ThemeState/themeSelectors';
import { setComponentRule, deleteComponentRule } from '@/data/ThemeState/themeSlice';
import { RootState } from '@/App';
import ComponentSelector from './ComponentSelector';
import { COMPONENT_DEFAULT_PROPS } from './componentPropDefinitions';
import { getAvailablePropsForComponent, getAvailableStyleProps } from './componentPropDefinitions';
import { getStyleSelectorOptions } from './componentPropDefinitions';
import ComponentPropertyEditor, { AddPropertyButton, StylePropertyEditor, AddStylePropertyButton, AddStyleSelectorButton } from './ComponentPropertyEditor';


const ComponentRuleEditor: React.FC<{ componentName: string}> = ({ componentName }) => {
  const dispatch = useDispatch();
  const rule = useSelector((state:RootState) => selectComponentRuleByName(state, componentName));
  const [isOpen, setIsOpen] = React.useState(false);

  const availableProps = getAvailablePropsForComponent(componentName as keyof typeof COMPONENT_DEFAULT_PROPS);
  const availableStyleProps = getAvailableStyleProps();
  const styleSelectors = getStyleSelectorOptions();

  const handleDefaultPropChange = (key: string, value: string | boolean) => {
    dispatch(setComponentRule({
        key: componentName,
        value: {
        ...rule,
        defaultProps: {
            ...rule.defaultProps,
            [key]: value,
        },
        },
        }));
  };

  const handleRemoveProp = (key: string) => {
    const newProps = { ...rule.defaultProps };
    delete newProps[key];
    dispatch(setComponentRule({
        key: componentName,
        value: {
        ...rule,
        defaultProps: newProps,
        },
        }));
  }

    const handleAddProp = (key: string) => {
        dispatch(setComponentRule({
            key: componentName,
            value: {
            ...rule,
            defaultProps: {
                ...rule.defaultProps,
                [key]: '',
            },
            },
            }));
    };

  const handleStyleChange = (selector: string, property: string, value: string) => {
    dispatch(setComponentRule({
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
        }));    
  };

    const handleRemoveStyle = (selector: string, property: string) => {
        const newStyles = { ...rule.styles };
        const newSelector = { ...newStyles[selector] };
        delete newSelector[property];
        dispatch(setComponentRule({
            key: componentName,
            value: {
            ...rule,
            styles: {
                ...rule.styles,
                [selector]: newSelector,
            },
            },
            }));
    };

    const handleRemoveSelector = (selector: string) => {
        const newStyles = { ...rule.styles };
        delete newStyles[selector];
        dispatch(setComponentRule({
            key: componentName,
            value: {
            ...rule,
            styles: newStyles,
            },
            }));
    };


    const handleAddStyle = (selector: string, property: string) => {
        dispatch(setComponentRule({
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
            }));
    }

    const handleAddSelector = (selector: string) => {
        dispatch(setComponentRule({
            key: componentName,
            value: {
            ...rule,
            styles: {
                ...rule.styles,
                [selector]: {},
            },
            },
            }));
    }

  return (
    <Paper p="md" withBorder>
      <Group justify="space-between" align="center">
        <Title order={4}>{componentName}</Title>
        <Group gap={5}>
          <ActionIcon onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IconArrowUp size={16}/> : <IconArrowDown size={16}/>}
          </ActionIcon>
          <ActionIcon 
            color="red" 
            onClick={() => dispatch(deleteComponentRule(componentName))}
          >
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
          componentName={componentName}
          propKey={key}
          propValue={value as string}
          propDef={availableProps.props[key as keyof typeof availableProps]}
          onChange={(newValue) => handleDefaultPropChange(key, newValue as string)} 
          onRemove={() => handleRemoveProp(key)}
        />
      ))}
      <AddPropertyButton
        componentName={componentName}
        availableProps={availableProps}
        currentProps={rule?.defaultProps || {}}
        onAdd={(key) => handleAddProp(key)}
      />
      </Stack>
      <Text mt="md">Styles</Text>
      <Stack gap="sm" p={'10px 0'}>
      {Object.entries(rule?.styles || {}).map(([selector, styles]) => (
       
        <Card key={selector} radius="sm" padding="xs" withBorder>
        <Group justify='space-between' align='center' wrap='nowrap'>
          <Text size="sm" fw={'700'}>{selector}</Text> 
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
              propDef={availableStyleProps.stylesApi[prop as keyof typeof availableStyleProps]}
              onChange={(newValue) => handleStyleChange(selector, prop, newValue as string)}
              onRemove={() => handleRemoveStyle(selector, prop)}
            />
          ))}
          <AddStylePropertyButton
            selector={selector}
            currentStyles={styles as { [key: string]: string }}
            onAdd={(prop) => handleAddStyle(selector, prop)}
          /></Stack>
        </Card>
        
      ))}
      <AddStyleSelectorButton
        onAdd={(selector) => handleAddSelector(selector)}
        componentName={componentName}
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
    if (selectedComponent) {
      dispatch( setComponentRule({
          key: selectedComponent,
          value: {
          defaultProps: {},
          styles: {},
          },
        }));
      setSelectedComponent(null);
    }
  };

  return (
    <Stack>
      <Group>
        <ComponentSelector 
          value={selectedComponent} 
          onChange={setSelectedComponent} 
        />
        <Button 
          onClick={handleAddComponent}
          disabled={!selectedComponent}
        >
          Add Component Rule
        </Button>
      </Group>

      <Stack>
        {componentRules && Object.keys(componentRules).map(componentName => (
          <ComponentRuleEditor 
            key={componentName} 
            componentName={componentName as string}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default ComponentRulesManager;