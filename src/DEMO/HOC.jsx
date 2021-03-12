const HocContainer = (props) =>{
    console.log('props', props)
    return (
        <div style={{width:"300px", height:"300px", backgroundColor:"rgba(0,152,64, .03)"}}>
            {props.children}
        </div>
    )
}

export default HocContainer