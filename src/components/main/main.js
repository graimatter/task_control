import React from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskTemplate from '../task_template'
import Header from '../header'
import Loading from '../loading'
import CreateTask from '../create_task'
import WorkArea from '../work-area'
import AppService from '../../services/app-service'
import '../../styles/bootstrap.min.css'
import './main.css'

export default class Main extends React.Component {


    state = {
        task_templates: [],
        tasks: [],
        loaded: false
    }

    changeDescription = (descValue, index) => {
        //console.log(`index = ${index} desc = ${descValue}`)
        const newTasks = [...this.state.tasks]
        newTasks[index].description = descValue
        this.setState({tasks : newTasks})
    }

    pad = function (num) { return ('00' + num).slice(-2) }

    DurationToStr(diffsec){
    
        var duration = '';
        duration=this.pad(Math.trunc(diffsec/3600))+':';
        diffsec=diffsec-(Math.trunc(diffsec/3600))*3600;
        duration=duration+this.pad(Math.trunc(diffsec/60))+':';
        diffsec=diffsec-(Math.trunc(diffsec/60))*60;       
        return duration+this.pad(diffsec);
    }

    componentDidMount() {
        const curdate = new Date()
        const curdatestrFull = `${curdate.getFullYear()}-${this.pad(curdate.getMonth() + 1)}-${this.pad(curdate.getDate())} ${this.pad(curdate.getHours())}:${this.pad(curdate.getMinutes())}:${this.pad(curdate.getSeconds())}`;
        new AppService('dev').getTemplates().then((res) => {
            console.log(res)
            if (res.status === 0) {
                this.setState({
                    task_templates: res.result,
                    loaded: true
                })
            }
        })
        new AppService('dev').getTasks(curdatestrFull).then((res) => {
            console.log(res)
            if (res.status === 0) {
                this.setState({
                    task_templates: res.result,
                    loaded: true
                })
            }
        })
    }

    changeActiveStatus = (array) => {
        if (array.length > 0) {
            if (array[0].status === 2) return true
        }
        return false
    }

    deleteTemplateHander = (index, id) => {
        new AppService('dev').deleteTemplateById(id).then((res) => {
            const new_templates = this.state.task_templates
            new_templates.splice(index, 1)
            this.setState({ task_templates: new_templates })
        })

    }

    newTemplateHandler = (template) => {
        const new_templates = [...this.state.task_templates]
        new_templates.push(template)
        this.setState({ task_templates: new_templates })
    }

    newTaskHandler = (newTask) => {
        const curdate = new Date()

        const curdatestrFull = `${curdate.getFullYear()}-${this.pad(curdate.getMonth() + 1)}-${this.pad(curdate.getDate())} ${this.pad(curdate.getHours())}:${this.pad(curdate.getMinutes())}:${this.pad(curdate.getSeconds())}`;
        new AppService('dev').createNewTask({ id: newTask.id, datestart: curdatestrFull }).then((res) => {

            newTask.time_start = `${this.pad(curdate.getHours())}:${this.pad(curdate.getMinutes())}:${this.pad(curdate.getSeconds())}`
            newTask.status = 2
            newTask.taskId = res.result

            const newTasks = [...this.state.tasks]
            if (this.changeActiveStatus(newTasks)) {
                newTasks[0].status = 1
                newTasks[0].duration = this.DurationToStr(res.duration)
            }

            newTasks.push(newTask)
            this.setState({ tasks: newTasks.sort((a, b) => b.status - a.status) })

        })

    }

    buttonsHandler = (item) => {
        const newTasks = [...this.state.tasks]
        const curdate = new Date()
        const curdatestrFull = `${curdate.getFullYear()}-${this.pad(curdate.getMonth() + 1)}-${this.pad(curdate.getDate())} ${this.pad(curdate.getHours())}:${this.pad(curdate.getMinutes())}:${this.pad(curdate.getSeconds())}`;
        switch (item.action) {
            case 'pause':
                new AppService('dev').actionsFromTask({ id: item.id, date: curdatestrFull, action: 'pause' }).then((res) => {
                    newTasks[item.index].status = 1
                    newTasks[item.index].duration = this.DurationToStr(res.duration)
                    this.setState({ tasks: newTasks })
                })

                break
            case 'play':
                new AppService('dev').actionsFromTask({ id: item.id, date: curdatestrFull, action: 'play' }).then((res) => {
                    if (newTasks[0].status === 2) {
                        newTasks[0].status = 1
                        newTasks[0].duration = this.DurationToStr(res.duration)
                    }
                    newTasks[item.index].status = 2
                    newTasks.sort((a, b) => b.status - a.status)
                    this.setState({ tasks: newTasks })
                })

                break
            case 'close':
                new AppService('dev').actionsFromTask({ id: item.id, date: curdatestrFull, action: 'close' }).then((res) => {
                    newTasks[item.index].status = 0
                    newTasks[item.index].duration = this.DurationToStr(res.duration)
                    newTasks.sort((a, b) => b.status - a.status)
                    this.setState({ tasks: newTasks })
                })
                break
                
            case 'save':
                //console.log(`desc = ${item.description}`)
                new AppService('dev').actionsFromTask({ id: item.id, description: item.description, action: 'save' }).then((res) => {
                    console.log(res)
                    /*newTasks[item.index].status = 0
                    newTasks[item.index].duration = this.DurationToStr(res.duration)
                    newTasks.sort((a, b) => b.status - a.status)
                    this.setState({ tasks: newTasks })*/
                })
                break
            default: break
        }

    }

    render() {

        const { task_templates, loaded } = this.state

        let mainContent = <Loading />
        if (loaded)
            mainContent = <DndProvider backend={HTML5Backend}>
                <div className='main'>
                    <WorkArea tasks={this.state.tasks} newTask={this.newTaskHandler} buttonsHandler={this.buttonsHandler} changeDesc = {this.changeDescription}/>

                    <div className='new-task'>
                        <CreateTask createHandler={this.newTemplateHandler} />
                        {
                            task_templates.map((item, index) => {
                                return (<TaskTemplate template={item} template_index={index} deleteHandler={this.deleteTemplateHander} />)
                            })
                        }
                    </div>
                </div>
            </DndProvider>


        return (
            <div className='wrapper'>
                <Header />
                {mainContent}
            </div>
        )
    }

}
