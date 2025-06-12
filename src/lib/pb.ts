import PocketBase from "pocketbase"
export const pb = new PocketBase("http://127.0.0.1:8090/");
pb.autoCancellation(false)

export async function Auth(name:string, passwd: string){
    await pb.collection("users").authWithPassword(name, passwd);
    return pb.authStore.isValid
}

export async function LogOut(){
    pb.authStore.clear()
    return pb.authStore.isValid
}
export async function getNotifications(id:string){
    const res = await pb.collection("notifications").getFullList({
        filter: pb.filter("userId = {:id}", {id: id})
    })
    return res
}

export async function updateNotifications(id:string){
    const data ={
        isRead: true
    }
    const res = await pb.collection('notifications').update(id, data)
    return res
}