import { useDispatch } from 'react-redux'
import { updateNotification } from '../../store/slices/notification.slice'
import './style.scss'
import { formatTimeAgo } from '../../utils'

function NotificationsContainer(props: any){

        const dispatch = useDispatch()

        const renderIcon = (type:string) => {
            switch(type){
                case 'USER':
                    return (
                        <>
                        <div className="icon USER">
                            <i className='bx  bx-user-circle'></i> 
                        </div>
                        </>
                    )
                case 'SYSTEM':
                    return (
                        <>
                         <div className="icon SYSTEM">
                            <i className='bx  bx-gear'></i> 
                        </div>
                        </>
                    )
                case 'ACTION':
                    return (
                        <>
                         <div className="icon ACTION">
                            <i className='bx  bx-light-bulb'></i> 
                        </div>
                        </>
                    )
            }
        }

    return (
        <div className='notif-container'>
                <div className="notif-scroll">
                    {props.data.map((item:any) => (
                    <>
                    <hr />
                   <div className={'notif-item ' + (item.isRead ? '' : 'new')} onClick={() => dispatch(updateNotification(item.id))} key={item.id}>
                        {renderIcon(item.type)}
                        <div className="content">
                            <h4>{item.title}</h4>
                            <p>{item.message}</p>
                        </div>
                        <div className="time">
                            {formatTimeAgo(item.created)}
                        </div>
                   </div>
                    </>
                    ))}
                </div>
        </div>
    )
}

export default NotificationsContainer