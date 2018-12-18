export function getRedirectPath(type, avator){
    let url = (type === 'boss' ? '/boss':'/genius')
    if(!avator){
        url += 'info'
    }
    return url
}