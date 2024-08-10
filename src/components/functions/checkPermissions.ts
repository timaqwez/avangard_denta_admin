export function checkPermissions(requiredPermissions: string[] | undefined){
    let get_account = localStorage.getItem('account');
    if (get_account != undefined) {
      let account = JSON.parse(get_account)
      var permissions = account.permissions
    }
    else{
      var permissions = undefined
    }
    if(requiredPermissions){
      for (let i = 0; i < requiredPermissions.length; i++) {
        if(!permissions || !permissions.includes(requiredPermissions[i])) {
          return false
        }
      }
    }
    return true
} 