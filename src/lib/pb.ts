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
        filter: pb.filter("userId = {:id}", {id: id}),
        sort: '-created'
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

export async function getInviteCode(id:string){
    const res = await pb.collection("invite_codes").getOne(id)
    return res
}

export async function getInviteCodeByUser(id:string){
    const res = await pb.collection("invite_codes").getList(1,1, {
        filter: pb.filter("created_by = {:id}", {id: id})
    })
    return res
}

export async function createCode(id:string) {

    const date = new Date()
    date.setDate(date.getDate() + 30)

    const data = {
        created_by: id,
        active: true,
        expiration: date
    }

    const res = await pb.collection("invite_codes").create(data)
    return res
}

export async function Register(email:string, passwd: string, name: string, inviteby: string) {
    const data = {
        "email": email, 
        "password": passwd,
        "passwordConfirm": passwd,
        "name": name,
        "invitedBy": inviteby
    }

    await pb.collection('users').create(data)

    return pb.authStore.isValid

}

export async function getPosts(){
    const res = await pb.collection('posts').getFullList({
        sort: '-created',
        filter: pb.filter("public = true"),
        expand: "createdBy"
    })
    return res
}

export async function createPost(post:any){
    const data = {
        "message": post.message,
        "createdBy": post.createdBy,
        "public": post.public
    }

    const res = await pb.collection("posts").create(data)
    return res
}

export async function deletePost(id:string) {
    const res = await pb.collection("posts").delete(id)
    return res
}