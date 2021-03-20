import React from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskTemplate from '../task_template'
import Header from '../header'
import Footer from '../footer'
import Loading from '../loading'
import CreateTask from '../create_task'
import WorkArea from '../work-area'
import AppService from '../../services/app-service'
import Report from '../report'
import Authorization from '../authorization'
import '../../styles/bootstrap.min.css'
import './main.css'

export default class Main extends React.Component {


    state = {
        task_templates: [],
        tasks: [],
        towns: [],
        loaded_template: false,
        loaded_tasks: false,
        loaded_towns: false,
        navDate: new Date(),
        reportDateStart: new Date(),
        reportDateEnd: new Date(),
        reports: [],
        loaded_report: false,
        isAutorizated: false
    }

    pad = function (num) { return ('00' + num).slice(-2) }

    closeReport = () => {
        this.setState({ loaded_report: false })
    }


    authorizate = (data) => {
        console.log(data)
        new AppService('dev').authorization(data).then((res) => {
            console.log(`*** ${res} ***`)
            this.setState({ isAutorizated: true })
            this.loadMainContent()
        })
    }

    createReport = () => {
        //console.log(`report for ${this.state.reportDateStart} - ${this.state.reportDateEnd}`)
        const dateStart = this.state.reportDateStart
        const dateEnd = this.state.reportDateEnd
        const dates = {
            reportDateStart: `${dateStart.getFullYear()}-${this.pad(dateStart.getMonth() + 1)}-${this.pad(dateStart.getDate())} 00:00:00`,
            reportDateEnd: `${dateEnd.getFullYear()}-${this.pad(dateEnd.getMonth() + 1)}-${this.pad(dateEnd.getDate())} 23:59:59`
        }
        new AppService('dev').reportTasksDays(dates).then((res) => {
            console.log(res)
            if (res.status === 0) {
                this.setState({
                    reports: res.result,
                    loaded_report: true
                })
            }
        })
    }

    chandeReportDate = (newDate, startOrend) => {
        if (startOrend === 'start') this.setState({ reportDateStart: newDate })
        if (startOrend === 'end') this.setState({ reportDateEnd: newDate })
    }

    changeTown = (townId, index, town_title) => {
        console.log(townId, index)
        const newTasks = [...this.state.tasks]
        newTasks[index].town_id = townId
        newTasks[index].town_title = town_title
        this.setState({ tasks: newTasks })
    }

    changeDescription = (descValue, index) => {
        //console.log(`index = ${index} desc = ${descValue}`)
        const newTasks = [...this.state.tasks]
        newTasks[index].description = descValue
        this.setState({ tasks: newTasks })
    }

    DurationToStr(diffsec) {

        var duration = '';
        duration = this.pad(Math.trunc(diffsec / 3600)) + ':';
        diffsec = diffsec - (Math.trunc(diffsec / 3600)) * 3600;
        duration = duration + this.pad(Math.trunc(diffsec / 60)) + ':';
        diffsec = diffsec - (Math.trunc(diffsec / 60)) * 60;
        return duration + this.pad(diffsec);
    }

    loadMainContent = () => {
        const { navDate, isAutorizated } = this.state
        const curdatestrFull = `${navDate.getFullYear()}-${this.pad(navDate.getMonth() + 1)}-${this.pad(navDate.getDate())} ${this.pad(navDate.getHours())}:${this.pad(navDate.getMinutes())}:${this.pad(navDate.getSeconds())}`;
        if (isAutorizated) {
            new AppService('dev').getTemplates().then((res) => {
                console.log(res)
                if (res.status === 0) {
                    this.setState({
                        task_templates: res.result,
                        loaded_templates: true
                    })
                }
                else if (res.status === -2) {
                    this.setState({ isAutorizated: false })
                }
            })

            new AppService('dev').getTasks({ navDate: curdatestrFull }).then((res) => {
                console.log(res)
                if (res.status === 0) {
                    this.setState({
                        tasks: res.result,
                        loaded_tasks: true
                    })
                }
                else if (res.status === -2) {
                    this.setState({ isAutorizated: false })
                }
            })

            new AppService('dev').getTowns().then((res) => {
                console.log(res)
                if (res.status === 0) {
                    this.setState({
                        towns: res.result,
                        loaded_towns: true
                    })
                }
                else if (res.status === -2) {
                    this.setState({ isAutorizated: false })
                }
            })
        }
    }

    componentDidMount() {
        this.loadMainContent()
    }

    existsActiveTask = (array) => {
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
            newTask.description = ''
            newTask.town_id = -1
            newTask.town_title = null
            const newTasks = [...this.state.tasks]
            if (this.existsActiveTask(newTasks)) {
                newTasks[0].status = 1
                newTasks[0].duration = res.duration

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
                    newTasks[item.index].duration = res.duration
                    this.setState({ tasks: newTasks })
                })

                break
            case 'play':
                new AppService('dev').actionsFromTask({ id: item.id, date: curdatestrFull, action: 'play' }).then((res) => {
                    if (newTasks[0].status === 2) {
                        newTasks[0].status = 1
                        newTasks[0].duration = res.duration
                    }
                    newTasks[item.index].status = 2
                    newTasks.sort((a, b) => b.status - a.status)
                    this.setState({ tasks: newTasks })
                })

                break
            case 'close':
                new AppService('dev').actionsFromTask({ id: item.id, date: curdatestrFull, action: 'close' }).then((res) => {
                    newTasks[item.index].status = 0
                    newTasks[item.index].duration = res.duration
                    newTasks.sort((a, b) => b.status - a.status)
                    this.setState({ tasks: newTasks })
                })
                break

            case 'save':
                new AppService('dev').actionsFromTask({ id: item.id, description: item.description, town_id: item.town_id, action: 'save' }).then((res) => {
                    console.log(res)
                    //newTasks[item.index].town_id = item.town_id
                    //newTasks[item.index].description = item.description
                    //newTasks.sort((a, b) => b.status - a.status)
                    //this.setState({ tasks: newTasks })
                })
                break
            default: break
        }

    }

    changeDate = (date) => {
        const curdatestrFull = `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())} ${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}`;
        new AppService('dev').getTasks({ curDate: curdatestrFull }).then((res) => {
            console.log(res)
            if (res.status === 0) {
                this.setState({
                    navDate: date,
                    tasks: res.result,
                    loaded_report: false
                })
            }
        })
    }

    render() {

        const { task_templates, loaded_templates, loaded_tasks, navDate, towns, loaded_towns, loaded_report, reports, reportDateStart, reportDateEnd, isAutorizated } = this.state
        const isCurDate = (navDate.getFullYear() === new Date().getFullYear() && navDate.getMonth() === new Date().getMonth() && navDate.getDate() === new Date().getDate())
        let mainContent = <Loading />
        if (!loaded_report && loaded_templates && loaded_tasks && loaded_towns)
            mainContent = <DndProvider backend={HTML5Backend}>
                <div className='main'>
                    <WorkArea tasks={this.state.tasks} towns={towns} newTask={this.newTaskHandler} buttonsHandler={this.buttonsHandler} changeDesc={this.changeDescription} changeTown={this.changeTown} isCurDate={isCurDate} />
                    <div className='new-task'>

                        <CreateTask createHandler={this.newTemplateHandler} />
                        <div className='template-list'>
                            {isCurDate &&
                                task_templates.map((item, index) => {
                                    return (<TaskTemplate key={index} template={item} template_index={index} deleteHandler={this.deleteTemplateHander} />)
                                })
                            }
                        </div>
                    </div>
                </div>
            </DndProvider>

        if (loaded_report)
            mainContent = <Report rows={reports} />

        return (
            <div className='wrapper'>
                {!isAutorizated && <Authorization authHandler = {this.authorizate}/>}
                {isAutorizated && <Header navDate={this.state.navDate} changeDate={this.changeDate} />}
                {isAutorizated && mainContent}
                {isAutorizated && <Footer chandeReportDate={this.chandeReportDate} startDate={reportDateStart} endDate={reportDateEnd} createReport={this.createReport} closeReport={this.closeReport} reportStat={loaded_report} />}
            </div>
        )
    }

}
