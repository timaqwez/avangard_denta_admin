export function extractValueByKey(obj: any, keyStr: string): any {
    let keys = keyStr.split('.')
    for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(obj)){
            return {    
                value: obj,
                key: keys[i],
            }
        }
        else if (typeof obj === 'object') {
            obj = obj[keys[i]]
        }
        else {
            return {
                value: obj,
            }
        }
    }
    return {
        value: obj,
    }
};
