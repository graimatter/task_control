import React from 'react'
import ButPlay from '../buttons/but_play'
import ButPause from '../buttons/but_pause'
import ButSave from '../buttons/but_save'
import ButClose from '../buttons/but_close'
import './task.css'

export default class Task extends React.Component {


    state = {
        desc : this.props.task.description
    }

    pad = function (num) { return ('00' + num).slice(-2) }

    DurationToStr(diffsec) {

        let duration = '';
        //if( isNaN(diffsec) ) return duration
        duration = this.pad(Math.trunc(diffsec / 3600)) + ':';
        diffsec = diffsec - (Math.trunc(diffsec / 3600)) * 3600;
        duration = duration + this.pad(Math.trunc(diffsec / 60)) + ':';
        diffsec = diffsec - (Math.trunc(diffsec / 60)) * 60;
        return duration + this.pad(diffsec);
    }

    changeTaskDesc = (e) => {
        //this.props.changeDesc(e, this.props.index)
        this.setState({desc : e.target.value})
        this.props.changeDesc(e.target.value, this.props.index)
    }

    clickButton = (action) => {
        console.log(`** ${this.props.task}`)
        this.props.buttonsHandler(
            {
                action: action,
                id : this.props.task.taskId,
                description : this.props.task.description,
                index: this.props.index
            }
        )
    }

    render() {
        let task_style = 'task-item '
        let main_but = ''
        let close_but = <ButClose buttonEvent={this.clickButton} />
        let task_duration = this.DurationToStr(this.props.task.duration)
        if (this.props.task.status === 1) {
            main_but = <ButPlay buttonEvent={this.clickButton} />
        }
        if (this.props.task.status === 2) {
            main_but = <ButPause buttonEvent={this.clickButton} />
            task_style = 'task-item task_active'
            task_duration = ''
        }
        if (this.props.task.status === 0) {
            close_but = ''
        }
        return (

            <div className={task_style} >
                <div className='task-title' >{this.props.task.title}</div>
                <div className='task-time' >{this.props.task.time_start}</div>
                <div className='task-time' >{task_duration}</div>
                <div className='task-description'>
                    <input className='form-control input__mod' placeholder='Описание...' value={this.state.desc} onChange = {this.changeTaskDesc}></input>
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

