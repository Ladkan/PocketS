import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNotifications, updateNotification } from "../lib/store/slices/notification.slice"
import { pb } from "../lib/pb"

function Notifications(){
    //@ts-expect-error
    const { items:notifications, status } = useSelector((state) => state.notifications)
    const dispatch = useDispatch()

    useEffect(() => {
        if(status === 'idle'){
            //@ts-expect-error
            dispatch(fetchNotifications(pb.authStore.record.id))
        }
    }, [status])

    return(
        <div>
        {notifications.map((item:any) => ( 
            //@ts-expect-error
           <div onClick={() => dispatch(updateNotification(item.id))} key={item.id}>
                <p>{item.title}</p>
                <p>{item.message}</p>
                <p>{item.isRead}</p>
           </div>
        ))}
        </div>
    )
}

export default Notifications