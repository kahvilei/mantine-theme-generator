import React from "react";
import { Box, Paper, Stack } from '@mantine/core';
import NumberUnitSelector, { NumberUnitSelectorProps } from '@/components/ThemeControlPanel/Reusable Controls/NumberUnitSelector';
import {useSelector} from "react-redux";
import {RootState} from "@/App";


interface NumberUnitSelectorListProps {
    list: Array<NumberUnitSelectorProps>;
    selector: ,
    onChange: (value: NumberUnitSelectorProps) => void;
}
const NumberUnitSelectorList: React.FC<NumberUnitSelectorListProps> = ({list}) => {
    
    return (<Box>
    <Text size="sm">Radius settings</Text>
    <Paper withBorder p={"sm"}>
        <Stack>
            {list.map((size) => (
                <NumberUnitSelector
                    key={size}
                    label={size}
                    value={useSelector((state: RootState) => selectRadius(state, size)) || '0px'}
                    onChange={(value) => handleRadiusChange(size, value)}
                    min={0}
                    max={100}
                />
            ))}</Stack></Paper></Box>
)

}