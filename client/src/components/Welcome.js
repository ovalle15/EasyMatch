import React from 'react';
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
      width: '175px',
      textAlign:'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '40%'
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
        <img style={Img} src={logo}></img>
        <h1  style={Style} > Welcome to my Todo-React-App </h1>s
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
            <br></br>
            <br></br>
            <h4 style={Style}> Future Development</h4>
            <br></br>
            <ul>
                <li>
                    User should be able to update the individual nodes in the UI &nbsp;&nbsp;
                    (not in the scope of CS-602)
                </li>
                <li>
                    Authentication should be fully integrated in the UI and backend &nbsp;&nbsp;
                    (not in the scope of CS-602?)
                </li>
                <li>
                    In the "Get trees" table an unique tree identifier should replace the mongo ID &nbsp;&nbsp;
                    (not in the scope of CS-602)
                </li>
            </ul>
            <br></br>
            <br></br>
            </div>
)
export default Welcome;