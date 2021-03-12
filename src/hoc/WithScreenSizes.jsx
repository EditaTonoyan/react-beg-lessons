import React from 'react';

const withScreenSizes  = (Component) => {
    return class extends React.Component {
        state = {
            windowWidth:window.innerWidth,
            windowHeight:window.innerHeight,
        }
            render(){
               const {windowHeight,windowWidth} = this.state
                return(
                    <Component
                   {...this.props}
                    width={windowWidth}
                    heigth={windowHeight}
                    />
                    )
            }
                
        }
}

export default withScreenSizes;