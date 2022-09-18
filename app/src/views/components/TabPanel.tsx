import * as React from 'react';
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";

import Container, {ContainerTypeMap} from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {OverridableComponent} from "@mui/material/OverridableComponent";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanelItem(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3}} >
                    {children}
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


interface TabPanelItemInterface {
    label : string
    children : React.ReactNode
}
interface TabPanelInterface {
    items : TabPanelItemInterface[]
    mainContainerProps ?: any
}

export default function TabPanel(props:TabPanelInterface) {


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container fixed {...props}>
            <Container fixed sx={{bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    {props.items.map((item:TabPanelItemInterface,index:number) => {
                        return (<Tab label={item.label} {...a11yProps(index)}/>)
                    })}

                    {/*<Tab label="콘텐츠 관리" {...a11yProps(1)}/>*/}
                </Tabs>
            </Container>
            {props.items.map((item:TabPanelItemInterface,index:number) => {
                return (
                    <TabPanelItem value={value} index={index}>
                        {item.children}
                    </TabPanelItem>
                )

            })}

        </Container>

    );
}
