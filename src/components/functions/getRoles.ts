export function getRoles(roles: {id: number, name: string, role_id: number}[]){
    let roles_ids = []
    if(roles){
        for (let i = 0; i < roles.length; i++) {
            roles_ids.push(roles[i].role_id)
        }
    }
    return roles_ids
} 
