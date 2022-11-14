import BasicAppBar from "@views/components/BasicAppBar";
import React from "react";
import {invoker} from "@views/helper/helper";
import {Stack, Link, Typography} from '@mui/material';
const Store = require("electron-store");
const store = new Store();
interface IpInfoInterface {
    addresses : string[] | []
    port : string
}


const reducer = (prevState:any, newState:any) => ({
    ...{},
    ...prevState,
    ...newState
})
export default function LanShare() : JSX.Element
{

    const [state , setState] = React.useReducer(reducer,{
        ip : "127.0.0.1",
        port : store.get("app.network_port")
    })
    React.useEffect(()=>{
        invoker("$share/ip-info")
            .then((ipInfo : IpInfoInterface) => {
                setState({
                    ip : ipInfo.addresses[0],
                    port : ipInfo.port
                })
            })
    },[])
    // console.log(`http://${state.ip}:${state.port}/share`)
    
    return (
        <>
            <BasicAppBar
                title={"네트워크 공유 입수"}
            />
            <Stack>
                <Typography>http://{state.ip}:{state.port}/share</Typography>
                <img src={`http://127.0.0.1:${state.port}/share/qr-code/${state.ip}/${state.port}`} style={{width : 150, height : 150}}/>
            </Stack>
            
        </>
    )
}
