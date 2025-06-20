import { useEffect, useState } from "react"
import { formatTimeAgo, getUserAvatar, isOwner, isUpdated, MessageFilter } from "../../utils"
import Modal from "../Modal"
import { useDispatch } from "react-redux"
import { deletePosts } from "../../store/slices/posts.slice"

function Post(props:any){
    const [show, setShow] = useState(false)
    const { data } = props
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if(data.expand.createdBy.avatar != '')
            setShow(true)
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = (id:string) => {
        dispatch(deletePosts(id))
        setOpen(false)
    }

    return (
        <>
            <div className="post_head">
                <div className='avatar'>
                    { show ? (
                        <img src={getUserAvatar(data.expand.createdBy)} alt="" />
                    ) : (
                        <div className="placeholder"></div>
                    )}
                </div>
                <p>{data.expand.createdBy.name}</p>
                <span>@{data.expand.createdBy.name}</span>
                <span>{formatTimeAgo(data.created)}</span>
                { isUpdated(data.created, data.updated) ? (
                    <span>Updated</span>
                ) : null }
                { isOwner(data.createdBy) ? (
                    <i onClick={handleOpen} title="Delete post" style={{color: "#9797A3"}} className='bx  bx-trash'></i> 
                ) : null }
            </div>
            <div className="message" dangerouslySetInnerHTML={{__html: MessageFilter(data.message)}}>
            </div>
            { isOwner(data.createdBy) ? (
                <Modal isOpen={open} onClose={handleClose}>
                    <h1>Delete post?</h1>
                    <button onClick={() => handleDelete(data.id)} >Yes</button>
                </Modal>
            ) : null }
        </>
    )
}
export default Post