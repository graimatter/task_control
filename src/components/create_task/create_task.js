import React from 'react'
import AppService from '../../services/app-service'
import './create_task.css'

export default class CreateTask extends React.Component {


    state = {
        template: {
            id: 0,
            title: ''
        }
    }

    prepareTemplate = (id) => {
        const newobj = {}
        newobj.id = id
        newobj.title = this.state.template.title
        return newobj
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
        new AppService('dev').saveTaskTemplate(this.state.template).then((res) => {
            if(res.status === 0){
                this.props.createHandler(this.prepareTemplate(res.result))
                this.setState({
                    template: {
                        id: 0,
                        title: ''
                    }
                })
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