import React from 'react'
import Task from '../task'
import Task_Template from '../task_template'
import '../../styles/bootstrap.min.css'
import './main.css'

export default class Main extends React.Component {

    render() {


        return (
            <div className='wrapper'>
                <div className='main'>
                    <div className='work-task'>
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                    </div>
                    <div className='new-task'>
                        <Task_Template />
                        <Task_Template />
                        <Task_Template />
                        <Task_Template />
                    </div>
                </div>
            </div>
        )
    }


}