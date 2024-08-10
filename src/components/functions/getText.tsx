import { ReactNode } from "react";
import { extractValueByKey } from "./extraxtValueByKey";
import { Column } from "../../config/columns/base";

export function getText(obj: any, keys: string[], columns: Column[]): ReactNode {
    return keys.map((keyStr, index) => {
        const data = extractValueByKey(obj, keyStr);
        const value = data.value
        const last_key = data.key
        if (Array.isArray(value)) {
            return value.map((item, idx) => (
                <span key={`${keyStr}-${idx}`}>
                    {last_key ? item[last_key] : item.name}
                    {(idx < value.length - 1) && ' • '}
                </span>
        ));
        } else {
            let column = columns.length !== 0 ? columns.find(((column) => column.dataName === keyStr)) : undefined
            return (
                <span key={keyStr}>
                    {`${`${column?.prefix ? column.prefix : ''} ${value} ${column?.postfix ? column.postfix : ''}`} `}
                    {(index < keys.length - 1) && ' • '}
                </span>
            );
        }
    });
};
