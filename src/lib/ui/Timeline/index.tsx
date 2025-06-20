import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual"
import './style.scss'
import Post from "./Post"
import { useEffect, useRef } from "react"
import { fetchPosts } from "../../store/slices/posts.slice"
import { useDispatch, useSelector } from "react-redux"
import CreatePost from "./CreatePost"
import { pb } from "../../pb"

function Timeline(){
    
    const {items:posts, status} = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
    if(status === 'idle'){
        dispatch(fetchPosts())
    }

    }, [status])

    const scrollRef = useRef<HTMLDivElement>(null)

    const virtualizer = useVirtualizer({
        count: posts.length,
        estimateSize: () => 150,
        getScrollElement: () => scrollRef.current,
    })

    const virtualItems = virtualizer.getVirtualItems()

    return (

        <div ref={scrollRef} className="posts">
        <div className="container">
                <CreatePost />
                <div className="relative" style={{height: `${virtualizer.getTotalSize()}px`}}>
                        <div className="absolute" style={{transform: `translateY(${virtualItems[0]?.start ?? 0}px)`}}>
                    {virtualItems.map((vItem) => {
                        const post = posts[vItem.index]
                        return (
                            <div className="post" key={vItem.key} data-index={vItem.index} ref={virtualizer.measureElement}>
                                <Post data={post} />
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline
