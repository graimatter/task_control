import React from 'react'
import But_Play from '../buttons/but_play'
import But_Pause from '../buttons/but_pause'
import But_Save from '../buttons/but_save'
import But_Close from '../buttons/but_close'
import './task.css'

export default class Task extends React.Component {


    clickButton = (action) => {
        this.props.buttonsHandler(
            {
                action: action,
                index: this.props.index
            }
        )
    }

    render() {
        let task_style = 'task-item '
        let main_but = ''
        if (this.props.task.status === 1) {
            main_but = <But_Play buttonEvent={this.clickButton} />
        }
        if (this.props.task.status === 2) {
            main_but = <But_Pause buttonEvent={this.clickButton} />
            task_style = 'task-item task_active'
        }
        return (

            <div className={task_style} >
                <div className='task-title' >{this.props.task.title}</div>
                <div className='task-time' >{this.props.task.time_start}</div>
                <div className='task-time' >{this.props.task.duration}</div>
                <div className='task-description'>
                    <input className='form-control input__mod' placeholder='Описание...' value={this.props.task.description}></input>
                </div>
                <div className='task-buttons' >

                    {main_but}
                    <But_Save buttonEvent={this.clickButton} />
                    <But_Close buttonEvent={this.clickButton} />
                </div>
            </div>
        )
    }

}

