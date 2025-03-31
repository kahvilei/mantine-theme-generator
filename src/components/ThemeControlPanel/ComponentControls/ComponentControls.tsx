import React from 'react';
import { IconPlus } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { Button, Group, Stack, Text } from '@mantine/core';
import EditorPage from '@/components/ThemeControlPanel/Shared/Layout/EditorPage';
import { Components } from '@/data/Models/Theme/Components/Components';
import { components as ComponentsManager } from '@/data/Store';
import ComponentRuleEditor from './ComponentRuleEditor';
import ComponentSelector from './ComponentSelector';

interface ComponentRulesManagerProps {
  componentsManager?: Components;
}

const ComponentRulesManager = observer(
  ({ componentsManager = ComponentsManager }: ComponentRulesManagerProps) => {
    const [selectedComponent, setSelectedComponent] = React.useState<string | null>(null);

    const handleAddComponent = () => {
      if (selectedComponent) {
        componentsManager.addRule(selectedComponent);
        setSelectedComponent(null);
      }
    };

    return (
      <EditorPage title="Component Controls">
        <Text size="sm" c="dimmed">
          Select a component below to define default props and styles. These rules will be applied
          to all instances of the component in the theme.
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
          {componentsManager.getAllRules().map((rule) => (
            <ComponentRuleEditor
              key={rule.name}
              componentRule={rule}
              componentsManager={componentsManager}
            />
          ))}
        </Stack>
        <Text size="sm" c="dimmed">
          For reference on each component's props and styles API, see the{' '}
          <a target="_blank" href="https://mantine.dev/overview/" rel="noreferrer">
            Mantine Documentation
          </a>
          , or click the icon next to added component's names.
        </Text>
      </EditorPage>
    );
  }
);

export default ComponentRulesManager;
