import React from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import Task_Template from '../task_template'
import Header from '../header'
import Create_Task from '../create_task'
import Work_Area from '../work-area'
import '../../styles/bootstrap.min.css'
import './main.css'

export default class Main extends React.Component {


    state = {
        task_templates: ['Task number one', 'Task number two, this task is very dificult, very very very very', 'Task number three'],
        tasks: [
            {
                id: 0,
                title: 'Task one',
                time_start: '00:00:00',
                duration: 0,
                description: ''
            },
            {
                id: 1,
                title: 'Task two',
                time_start: '00:00:00',
                duration: 0,
                description: ''
            },
            {
                id: 3,
                title: 'Task tree',
                time_start: '00:00:00',
                duration: 0,
                description: ''
            }
        ]
    }

    deleteTemplateHander = (index) => {
        const new_templates = this.state.task_templates
        new_templates.splice(index, 1)
        this.setState({ task_templates: new_templates })
    }

    newTemplateHandler = (template) => {
        const new_templates = this.state.task_templates
        new_templates.push(template)
        this.setState({ task_templates: new_templates })
    }
    render() {

        const { task_templates } = this.state
        console.log(task_templates)
        return (
            <div className='wrapper'>
                <Header />
                <DndProvider backend={HTML5Backend}>
                    <div className='main'>
                        <Work_Area tasks = {this.state.tasks}/>
                            
                        <div className='new-task'>
                            <Create_Task createHandler={this.newTemplateHandler} />
                            {
                                task_templates.map((item, index) => {
                                    return (<Task_Template title={item} template_index={index} deleteHandler={this.deleteTemplateHander} />)
                                })
                            }
                        </div>
                    </div>
                </DndProvider>
            </div>
        )
    }

}
