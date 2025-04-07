import {
    Button,
    Card, Checkbox, Chip,
    FileInput,
    Grid,
    Group,
    NumberInput,
    Paper,
    PasswordInput, Radio, Select, SimpleGrid, Slider,
    Stack, Switch,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {IconChartBar, IconLock, IconMail, IconSearch, IconUpload} from "@tabler/icons-react";
import React from "react";
import { useTranslation } from 'react-i18next';

export const Forms: React.FC = () => {
    const { t } = useTranslation('forms');

    return (<Stack gap="xl">
        <Grid>
            <Grid.Col span={6}>
                <Card p="lg">
                    <Stack gap="md">
                        <Title order={3}>{t('titles.basicFormControls')}</Title>
                        <Paper p="md">
                            <Stack>
                                <Text fw={500}>{t('labels.textInputs')}</Text>
                                <TextInput
                                    label={t('inputs.default.label')}
                                    placeholder={t('inputs.default.placeholder')}
                                />
                                <TextInput
                                    label={t('inputs.withDescription.label')}
                                    placeholder={t('inputs.withDescription.placeholder')}
                                    description={t('inputs.withDescription.description')}
                                />
                                <TextInput
                                    label={t('inputs.withError.label')}
                                    placeholder={t('inputs.withError.placeholder')}
                                    error={t('inputs.withError.error')}
                                />
                                <TextInput
                                    label={t('inputs.withIcon.label')}
                                    placeholder={t('inputs.withIcon.placeholder')}
                                    leftSection={<IconSearch size={16} />}
                                />
                                <TextInput
                                    label={t('inputs.disabled.label')}
                                    placeholder={t('inputs.disabled.placeholder')}
                                    disabled
                                />
                            </Stack>
                        </Paper>

                        <Paper p="md">
                            <Stack>
                                <Text fw={500}>{t('labels.variantsSizes')}</Text>
                                <Group align="flex-end">
                                    <TextInput
                                        label={t('inputs.variants.default.label')}
                                        placeholder={t('inputs.variants.default.placeholder')}
                                        variant="default"
                                        size="sm"
                                    />
                                    <TextInput
                                        label={t('inputs.variants.filled.label')}
                                        placeholder={t('inputs.variants.filled.placeholder')}
                                        variant="filled"
                                        size="sm"
                                    />
                                    <TextInput
                                        label={t('inputs.variants.unstyled.label')}
                                        placeholder={t('inputs.variants.unstyled.placeholder')}
                                        variant="unstyled"
                                        size="sm"
                                    />
                                </Group>
                                <Group>
                                    <TextInput
                                        placeholder={t('inputs.sizes.xs')}
                                        size="xs"
                                    />
                                    <TextInput
                                        placeholder={t('inputs.sizes.sm')}
                                        size="sm"
                                    />
                                    <TextInput
                                        placeholder={t('inputs.sizes.md')}
                                        size="md"
                                    />
                                    <TextInput
                                        placeholder={t('inputs.sizes.lg')}
                                        size="lg"
                                    />
                                    <TextInput
                                        placeholder={t('inputs.sizes.xl')}
                                        size="xl"
                                    />
                                </Group>
                            </Stack>
                        </Paper>
                    </Stack>
                </Card>
            </Grid.Col>

            <Grid.Col span={6}>
                <Card p="lg">
                    <Stack gap="md">
                        <Title order={3}>{t('titles.specializedInputs')}</Title>
                        <Paper p="md">
                            <Stack>
                                <Text fw={500}>{t('labels.inputTypes')}</Text>
                                <PasswordInput
                                    label={t('inputs.specialized.password.label')}
                                    placeholder={t('inputs.specialized.password.placeholder')}
                                    leftSection={<IconLock size={16} />}
                                />
                                <NumberInput
                                    label={t('inputs.specialized.number.label')}
                                    placeholder={t('inputs.specialized.number.placeholder')}
                                    leftSection={<IconChartBar size={16} />}
                                />
                                <FileInput
                                    label={t('inputs.specialized.file.label')}
                                    placeholder={t('inputs.specialized.file.placeholder')}
                                    leftSection={<IconUpload size={16} />}
                                />
                                <Select
                                    label={t('inputs.specialized.select.label')}
                                    placeholder={t('inputs.specialized.select.placeholder')}
                                    data={[
                                        { value: "option1", label: t('inputs.specialized.select.options.option1') },
                                        { value: "option2", label: t('inputs.specialized.select.options.option2') },
                                        { value: "option3", label: t('inputs.specialized.select.options.option3') }
                                    ]}
                                />
                            </Stack>
                        </Paper>

                        <Paper p="md">
                            <Stack>
                                <Text fw={500}>{t('labels.toggleControls')}</Text>
                                <Group>
                                    <Checkbox label={t('toggles.checkbox.default')} />
                                    <Checkbox label={t('toggles.checkbox.indeterminate')} indeterminate />
                                    <Checkbox label={t('toggles.checkbox.checked')} />
                                    <Checkbox label={t('toggles.checkbox.disabled')} disabled />
                                </Group>
                                <Group>
                                    <Switch label={t('toggles.switch.default')} />
                                    <Switch label={t('toggles.switch.checked')} />
                                    <Switch label={t('toggles.switch.disabled')} disabled />
                                </Group>
                                <Radio.Group
                                    name="radioGroup"
                                    label={t('toggles.radio.group')}
                                    description={t('toggles.radio.description')}
                                    defaultValue="option1"
                                >
                                    <Group mt="xs">
                                        <Radio value="option1" label={t('toggles.radio.option1')} />
                                        <Radio value="option2" label={t('toggles.radio.option2')} />
                                        <Radio value="option3" label={t('toggles.radio.option3')} />
                                    </Group>
                                </Radio.Group>
                                <Chip.Group multiple>
                                    <Group>
                                        <Chip value="react">{t('toggles.chips.react')}</Chip>
                                        <Chip value="vue">{t('toggles.chips.vue')}</Chip>
                                        <Chip value="angular">{t('toggles.chips.angular')}</Chip>
                                    </Group>
                                </Chip.Group>
                                <Slider
                                    marks={[
                                        { value: 20, label: t('toggles.slider.20') },
                                        { value: 50, label: t('toggles.slider.50') },
                                        { value: 80, label: t('toggles.slider.80') }
                                    ]}
                                    defaultValue={40}
                                />
                            </Stack>
                        </Paper>
                    </Stack>
                </Card>
            </Grid.Col>
        </Grid>

        <Card p="lg">
            <Stack gap="md">
                <Title order={3}>{t('titles.completeForm')}</Title>
                <Paper p="lg">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Stack gap="md">
                            <Title order={4}>{t('form.title')}</Title>
                            <SimpleGrid cols={2}>
                                <TextInput
                                    label={t('form.firstName.label')}
                                    placeholder={t('form.firstName.placeholder')}
                                    required
                                />
                                <TextInput
                                    label={t('form.lastName.label')}
                                    placeholder={t('form.lastName.placeholder')}
                                    required
                                />
                            </SimpleGrid>

                            <TextInput
                                label={t('form.email.label')}
                                placeholder={t('form.email.placeholder')}
                                leftSection={<IconMail size={16} />}
                                required
                            />

                            <PasswordInput
                                label={t('form.password.label')}
                                placeholder={t('form.password.placeholder')}
                                leftSection={<IconLock size={16} />}
                                required
                            />

                            <Select
                                label={t('form.role.label')}
                                placeholder={t('form.role.placeholder')}
                                data={[
                                    { value: "developer", label: t('form.role.options.developer') },
                                    { value: "designer", label: t('form.role.options.designer') },
                                    { value: "manager", label: t('form.role.options.manager') },
                                    { value: "other", label: t('form.role.options.other') }
                                ]}
                            />

                            <Checkbox
                                label={t('toggles.checkbox.terms')}
                                required
                            />

                            <Group justify="space-between">
                                <Button variant="subtle">{t('form.buttons.cancel')}</Button>
                                <Button type="submit">{t('form.buttons.create')}</Button>
                            </Group>
                        </Stack>
                    </form>
                </Paper>
            </Stack>
        </Card>
    </Stack>);
}