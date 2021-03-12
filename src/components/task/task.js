import React from 'react'
import ButPlay from '../buttons/but_play'
import ButPause from '../buttons/but_pause'
import ButSave from '../buttons/but_save'
import ButClose from '../buttons/but_close'
import './task.css'

export default class Task extends React.Component {


    clickButton = (action) => {
        console.log(this.props.task)
        this.props.buttonsHandler(
            {
                action: action,
                id : this.props.task.taskId,
                index: this.props.index
            }
        )
    }

    render() {
        let task_style = 'task-item '
        let main_but = ''
        let close_but = <ButClose buttonEvent={this.clickButton} />
        if (this.props.task.status === 1) {
            main_but = <ButPlay buttonEvent={this.clickButton} />
        }
        if (this.props.task.status === 2) {
            main_but = <ButPause buttonEvent={this.clickButton} />
            task_style = 'task-item task_active'
        }
        if (this.props.task.status === 0) {
            close_but = ''
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
                    <ButSave buttonEvent={this.clickButton} />
                    {close_but}
                </div>
            </div>
        )
    }

}

