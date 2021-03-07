import React from 'react'
import But_Play from '../buttons/but_play'
import But_Pause from '../buttons/but_pause'
import But_Save from '../buttons/but_save'
import './task.css'

export default class Task extends React.Component {


    render() {

        return (

            <div className = 'task-item Default' >
                <div className='task-title' >Задача 1</div>
                <div className='task-time' >15:20:12</div>
                <div className='task-time' >16:00:41</div>
                <div className='task-description'>
                    <input className='form-control input__mod' placeholder = 'Описание...'></input>
                </div>
                <div className='task-buttons' >
                    
                    <But_Play />
                    <But_Pause />
                    <But_Save />                    
                    
                </div>
            </div>
        )
    }

}