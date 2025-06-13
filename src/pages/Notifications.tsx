import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNotifications } from "../lib/store/slices/notification.slice"
import { pb } from "../lib/pb"
import '../lib/css/Notifications.scss'
import NotificationsContainer from "../lib/ui/NotificationsContainer"

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
        <section className="notifications">
                <div className="container max-w-4xl">
                <div className="header">
                    <h1>Notifications</h1>
                    <p>Stay updated with your activities</p>
                </div>
                <NotificationsContainer data={notifications} />
            </div>
        </section>
    )
}

export default Notifications