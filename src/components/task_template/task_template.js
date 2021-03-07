import React from 'react'
import './task_template.css'

export default class Task_Template extends React.Component {

    render() {

        return (

            <div className='alert alert-dismissible alert-light'>
                <button type='button' className='close' data-dismiss='alert'>&times;</button>
                <strong>Heads up!</strong> This <a href="#" className='alert-link'>alert needs your attention</a>, but it's not super important.
            </div>

        )

    }

}