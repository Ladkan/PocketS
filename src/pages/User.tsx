import { pb } from "../lib/pb"
import '../lib/css/User.scss'
import { useEffect, useState } from "react"
import { avatar_url } from "../lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { createInviteCode, fetchInviteCode } from "../lib/store/slices/invite.slice"

function User(){
    //@ts-expect-error
    const { id, name, created, invitedBy, avatar } = pb.authStore.record

    const [show, setShow] = useState(false)
    const [invite, setInvite] = useState(false)
    const dispatch = useDispatch()
    const { status, id: inviteId, created: inviteCreated, createdBy, active, expiration  } = useSelector((state) => state.invite)


    const handleCreateCode = () => {
        dispatch(createInviteCode(pb.authStore.record.id))
        setInvite(true)
        setTimeout(() => dispatch(fetchInviteCode(pb.authStore.record.id), 3000))
    }

    useEffect(() => {
        if(avatar != '') setShow(true)

        if(inviteId) setInvite(true)

    }, [])

    let memberSince = new Date(created).toLocaleDateString('en-Us', {
        year: 'numeric',
        month: 'long'
    })

    return(
        <section className="user">
            <div className="container">
                <div className="header">
                    <div className="content">
                        <div className="avatar">
                            { show ? (
                                <img src={avatar_url} alt="" />
                            ) : (
                                <img src="https://placehold.co/96x96" alt="" />
                            )}
                        </div>
                        <div className="text">
                            <div className="name">
                                <p>{name}</p>
                                <span>@{name}</span>
                            </div>
                            <p className="created"><i className='bx  bx-calendar'></i> Joined   {memberSince}</p>
                        </div>
                    </div>
                </div>
                <div className="invite_code">
                        { !invite ? (
                            <button onClick={handleCreateCode} >Create invite code</button>
                        ) : (
                            <>
                                <h3>Invite code:</h3>
                                <span className={active ? "" : "line"} >{inviteId}</span>
                            </>
                        ) }
                </div>
            </div>
        </section>
    )
}

export default User