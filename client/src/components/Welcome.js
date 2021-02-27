import React from 'react';
import { Icon, Step } from 'semantic-ui-react'

const divStyle = {
    margin: '40px'
  };
  const Style = {
    fontSize: '25px',
    textAlign: 'center'
  }


const Welcome = () => (
        <div>
        <h1 style={Style} > Welcome to my To Do App with React </h1>
        <h2 style={Style} > This is how it works:</h2>

            <ul>
                <li>
                    Go to create a tree
                </li>
                <li>
                    Select a title for your top tasks and create subtasks
                </li>
                <li>
                    Drag, add and delete your tasks as you need !
                </li>
            </ul>
            </div>
)
export default Welcome;