import React from 'react'
import './create_task.css'

export default class Create_Task extends React.Component {


    state = {
        template: {
            id: 0,
            title: ''
        }
    }

    changeTitle = (e) => {
        this.setState({
            template: {
                id: 0,
                title: e.target.value
            }
        })
    }

    newTemplate = () => {

        this.props.createHandler(this.state.template)
        this.setState({
            template: {
                id: 0,
                title: ''
            }
        })

    }

    render() {

        return (

            <div className='form-group create_task__mod'>
                <input type="text" className='form-control' placeholder="Новая задача..." id='inputDefault' value={this.state.template.title} onChange={this.changeTitle}></input>
                <button type="button" className='btn btn-primary btn__paddings' onClick={this.newTemplate}>Добавить</button>
            </div>
        )
    }

}