import React from 'react'
import Task from '../task'
import '../../styles/bootstrap.min.css'
import './main.css'

export default class Main extends React.Component {

    render() {


        return (
            <div className = 'wrapper'>
                <Task />
                <Task />
                <Task />
                <Task />
            </div>
        )
    }


}