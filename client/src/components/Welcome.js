import React from 'react';
// import logo from '../logo.svg';
import mern from '../mern.png'
import diagram from '../diagram.png';


const divStyle = {
    margin: '40px'
  };
  const Style = {
    fontSize: '25px',
    textAlign: 'center'
  }
  const Img = {
      width: '300px',
      textAlign:'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '32%',
      marginTop:'5%'
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
        <img style={Img} src={mern}></img>
        <br></br>
        <br></br>
        <h1  style={Style} > Welcome to my Todo-React-App </h1>
        <br></br>
        <br></br>

            <h5>Features</h5>
            <ul>
                <li>
                    MongoDB - Express -  React -  NodeJS
                </li>
                <li>
                    Utilization of React JavaScript Libraries
                    <ul>
                        <li>
                            react-sortable-tree
                        </li>
                        <li>
                            react-bootstrap
                        </li>
                        <li>
                            @material-iu/core
                        </li>
                        <li>
                            react-router-dom
                        </li>
                    </ul>
                </li>
                <li>
                    MVC architecture
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
                    Resolve page reload after delete and create tree &nbsp;&nbsp;

                </li>
                <li>
                    User should be able to update the labels of children, so far
                    user can only modify and save parent nodes labels &nbsp;&nbsp;

                </li>
                <li>
                    Authentication with Json Web Tokens (JWT) should be fully integrated &nbsp;&nbsp;

                </li>
                <li>
                    In the "Get trees" table an unique tree identifier should replace the mongo ID &nbsp;&nbsp;

                </li>
                <li>
                    Responsive UI and customized tree  &nbsp;&nbsp;

                </li>
                <li>
                    Should be hosted on Firebase ! &nbsp;&nbsp;
                </li>
            </ul>
            <br></br>
            <br></br>
            </div>
)
export default Welcome;