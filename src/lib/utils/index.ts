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