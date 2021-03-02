import React from 'react';
import { Icon, Step } from 'semantic-ui-react'
import logo from '../logo.svg';
import diagram from '../diagram.png';


const divStyle = {
    margin: '40px'
  };
  const Style = {
    fontSize: '25px',
    textAlign: 'center'
  }
  const Img = {
      width: '100px',
      textAlign:'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '42%'
  }
  const diagImg = {
    width: '600px',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '12%',

  }


const Welcome = () => (
        <div>
        <img style={Img} src={logo}/>
        <h1  style={Style} > Welcome to my To Do App with React </h1>
        {/* <h2 style={Style} > This is how it works:</h2> */}

            <ul>
                <li>
                    Go to "Create Tree"
                </li>
                <li>
                    Drag your tasks around the tree and/or create new tasks
                </li>
                <li>
                    Update and delete your tree by going to "Get Trees"
                </li>
            </ul>
            <br></br>
            <h3 style={Style}> Overview of how the app works </h3>
            <img style={ diagImg} src={diagram}/>

            </div>
)
export default Welcome;