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
        task_templates: [
            { id: 1, title: 'Task number one' },
            { id: 2, title: 'Task number two, this task is very dificult, very very very very' },
            { id: 3, title: 'Task number three' }
        ],
        tasks: []
    }

    pad = function (num) { return ('00' + num).slice(-2) }

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

    newTaskHandler = (newTask) => {
        const curdate = new Date()
        newTask.time_start = `${this.pad(curdate.getHours())}:${this.pad(curdate.getMinutes())}:${this.pad(curdate.getSeconds())}`
        newTask.status = 2
        const newTasks = this.state.tasks
        if (newTasks.length > 0)
            newTasks[0].status = 1
        newTasks.push(newTask) 
        this.setState({ tasks: newTasks.sort((a, b) => b.status - a.status) })
    }

    buttonsHandler = (item) => {
        //console.log(item)
        const newTasks = this.state.tasks
        switch (item.action) {
            case 'pause':
                newTasks[item.index].status = 1
                break
            case 'play':
                newTasks[0].status = 1
                newTasks[item.index].status = 2
                newTasks.sort((a, b) => b.status - a.status)
                
                //console.log(newTasks)
                break
            case 'close':
                newTasks[item.index].status = 0
                newTasks.sort((a, b) => b.status - a.status)
        }
        console.log(newTasks)
        console.log(this.state.tasks)
        this.setState({ tasks: newTasks })
    }

    render() {

        const { task_templates } = this.state
        return (
            <div className='wrapper'>
                <Header />
                <DndProvider backend={HTML5Backend}>
                    <div className='main'>
                        <Work_Area tasks={this.state.tasks} newTask={this.newTaskHandler} buttonsHandler={this.buttonsHandler}/>

                        <div className='new-task'>
                            <Create_Task createHandler={this.newTemplateHandler} />
                            {
                                task_templates.map((item, index) => {
                                    return (<Task_Template template={item} template_index={index} deleteHandler={this.deleteTemplateHander} />)
                                })
                            }
                        </div>
                    </div>
                </DndProvider>
            </div>
        )
    }

}
