import { useState } from "react"
import { useDispatch } from "react-redux"
import { createPosts, fetchPosts } from "../../store/slices/posts.slice"
import { pb } from "../../pb"

function CreatePost(){

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const data = {
        "message": message,
        "createdBy": pb.authStore.record.id,
        "public": true
    }

    const handleSubmit = () => {
        dispatch(createPosts(data))
        setMessage('')
    }

    return (
        <div className="create">
            <textarea name="message" value={message}  onChange={(e) => setMessage(e.target.value)} ></textarea>
            <button onClick={handleSubmit} ><i className='bx  bx-send'></i>  Send</button>
        </div>
    )
}

export default CreatePost