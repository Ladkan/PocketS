import { pb } from "../pb"

export function formatTimeAgo(date:string){
    const now = new Date()
    const from = new Date(date)

    const diffMs = now.getTime() - from.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if(diffMins < 1) return 'Just now'
    if(diffMins < 60) return `${diffMins}m ago`
    if(diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`

}

export const avatar_url = "http://127.0.0.1:8090/api/files/" + pb.authStore.record?.collectionId + "/" + pb.authStore.record?.id + "/" + pb.authStore.record.avatar

export function isUpdated(created:string,updated:string){
    if(created != updated)
        return true

    return false
}

export function isOwner(id:string){
    if(id === pb.authStore.record.id)
        return true

    return false
}

export function getUserAvatar(data:any){
    return "http://127.0.0.1:8090/api/files/" + data?.collectionId + "/" + data?.id + "/" + data.avatar
}

export function getPostImgUrl(img:string, collectionId: string, id: string){
    return "http://127.0.0.1:8090/api/files/" + collectionId + "/" + id + "/" + img
}

function findAllUrls(message:string) {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    return message.match(urlRegex) || [];
}

function isUrlWrapped(message:string, url:string){
    const wrapped = new RegExp(`(<(a|img|span|b)[^>]*?>[^<]*${url}[^<]*<\\/\\2>)`, 'i')
    return wrapped.test(message)
}

function isImage(url:string){
    const imgExtensions = ['jpg','png','gif','webp','jpeg','bmp','svg']
    const wrapped = new RegExp(`\\.(${imgExtensions.join('|')})(\\?.*)?$`, 'i');
    return wrapped.test(url)
}

export function MessageFilter(message:string){
    const urls = findAllUrls(message)

    urls.map((url:string) => {

        if(!isUrlWrapped(message, url)){
            const short = url.length > 50 ? url.slice(0,50) + '...' : url
            let tag = ''
            if(isImage(url)){
                tag = `<a href="${url}" target="_blank" class="picture" ><i class='bx  bx-image'></i>  ${short}</a>`
            } else {
                tag = `<a href="${url}" target="_blank" >${short}</a>`
            }

            message = message.replace(url,tag)
        }
    })


    return message

}