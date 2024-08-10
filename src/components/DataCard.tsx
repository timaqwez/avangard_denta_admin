import { Avatar, Card } from "@mui/material";
import { ReactNode } from "react";
import { ActionsButton } from "./buttons/ActionsButton";
import { getText } from "./functions/getText";
import { Handler } from "../config/handlers";
import { Column } from "../config/columns/base";

export interface DataCardProps {
    object: any,
    columns: Column[],
    loading: string,
    icon: ReactNode,
    primaryDataKeys: string[],
    secondaryDataKeys: string[],
    handlers?: Handler[],
    primaryFont?: string,
    transperent?: boolean,
}

export const DataCard: React.FC<DataCardProps> = ({ object, columns, loading, icon, primaryDataKeys, secondaryDataKeys, handlers, primaryFont, transperent }) => {
    return (
        <Card elevation={0} sx={{ 
            background: transperent ? 'transparent' : '#F8F9FA', 
            paddingRight: transperent ? '0' : '20px', 
            borderRadius: '10px',
            width: '100%', 
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}
        >
            <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    flex: '1', 
                    minWidth: '0', 
                    height: '100%',
                    padding: transperent ? '0' : '30px 20px',
                    cursor: handlers && handlers[0].id != 'delete' ? 'pointer' : 'default'
                }} 
                onClick={handlers && handlers[0].id != 'delete' ? () => {handlers[0].handler(object)} : undefined }
            >
                <Avatar sx={{ bgcolor: 'primary.main', width: '50px', height: '50px', marginRight: '20px' }}>
                    {icon}
                </Avatar>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', flexGrow: 1, minWidth: '0' }}>
                    <div style={{ 
                        fontSize: '22px', 
                        fontWeight: '800', 
                        color: '#161616', 
                        fontFamily: primaryFont, 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        width: '100%',
                    }}>
                       {getText(object, primaryDataKeys, columns)}
                    </div>
                    <div style={{ 
                        fontSize: '12px', 
                        fontWeight: '600', 
                        color: '#BDC1CC', 
                        marginTop: '-5px', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        width: '100%',
                    }}>
                        {getText(object, secondaryDataKeys, columns)}
                    </div>
                </div>
            </div>
            <div style={{ flexShrink: 0}}>
                {handlers && <ActionsButton object={object} handlers={handlers} loading={loading} />}
            </div>
        </Card>
    );
};
