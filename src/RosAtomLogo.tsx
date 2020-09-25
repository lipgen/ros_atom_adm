import React from 'react'

function admin(props: any) {
    return (
        <div className={`${props.light ? `light` : `ros-atom-logo`}`} style={props.style}></div>
    )
}

export default admin
