import {Stack, Title} from '@mantine/core';
import React from "react";

interface EditorPageProps {
    children?: React.ReactNode;
    title?: string;
}

const EditorPage: React.FC<EditorPageProps> = ({ children, title}) => {
    return (
        <Stack gap="xl">
            {title&&<Title order={2}>{title}</Title>}
            {children}
        </Stack>
    );
};

export default EditorPage;