import React from 'react'
import ButPlay from '../buttons/but_play'
import ButPause from '../buttons/but_pause'
import ButSave from '../buttons/but_save'
import ButClose from '../buttons/but_close'
import './task.css'

export default class Task extends React.Component {


    /*state = {
        desc: this.props.task.description
    }*/

    pad = function (num) { return ('00' + num).slice(-2) }

    DurationToStr(diffsec) {

        let duration = '';
        duration = this.pad(Math.trunc(diffsec / 3600)) + ':';
        diffsec = diffsec - (Math.trunc(diffsec / 3600)) * 3600;
        duration = duration + this.pad(Math.trunc(diffsec / 60)) + ':';
        diffsec = diffsec - (Math.trunc(diffsec / 60)) * 60;
        return duration + this.pad(diffsec);
    }

    changeTownHandler = (e) => {

        const town = this.props.towns.find((item) => {
            if (item.town_title === e.target.value) return item
        })
        if (town !== undefined) this.props.changeTown(town.id, this.props.index)
    }

    changeTaskDesc = (e) => {
        //this.setState({ desc: e.target.value })
        this.props.changeDesc(e.target.value, this.props.index)
    }

    clickButton = (action) => {
        //console.log(`** ${this.props.task}`)
        this.props.buttonsHandler(
            {
                action: action,
                id: this.props.task.taskId,
                description: this.props.task.description,
                town_id: this.props.task.town_id,
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
                    <input className='form-control input__mod' placeholder='Описание...' value={this.props.task.description} onChange={this.changeTaskDesc}></input>
                </div>
                <div className='task-place'>

                    <select className='custom-select input__mod' onChange={this.changeTownHandler}>

                        {
                        this.props.task.town_id > 0 ?
                            <option value={this.props.task.town_id} selected>{this.props.task.town_title}</option>:
                            <option disabled selected>Не выбран участок...</option>
                        }
                        {
                            this.props.towns.map((item, index) => {
                                return (item.isfilial === 0 ? <option value={item.town_id}>{item.town_title}</option> : <option className='isfilial' value={item.town_id} disabled>{item.town_title}</option>)
                            })
                        }
                    </select>

                </div>
                <div className='task-buttons' >

                    {this.props.isCurDate && main_but}
                    <ButSave buttonEvent={this.clickButton} />
                    {this.props.isCurDate && close_but}
                </div>
            </div>
        )
    }

}

