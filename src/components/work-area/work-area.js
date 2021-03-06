import React from 'react'
import Task from '../task'
import { ItemTypes } from '../constants/constants'
import { DropTarget } from 'react-dnd'
import './work-area.css'

const TaskTarget = {



    hover(props, monitor, component) {

    },

    drop(props, monitor, component) {
        props.newTask(monitor.getItem())
    }
}

function collect(connect, monitor) {
    return {

        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
        itemTitle: monitor.getItem()
    }
}

class WorkArea extends React.Component {
    render() {

        return this.props.connectDropTarget(
            <div className='work-task'>
                {this.props.isOver && <div className='table-warning empty'><strong>{this.props.itemTitle.title}</strong></div>}

                {this.props.tasks.map((item, index) => {
                    return ( <Task task={item} key={index} index={index} towns={this.props.towns} buttonsHandler={this.props.buttonsHandler} changeDesc = {this.props.changeDesc} changeTown={this.props.changeTown} isCurDate = {this.props.isCurDate}/>)
                })
                }

            </div>
        )
    }
}

export default DropTarget(ItemTypes.TASK, TaskTarget, collect)(WorkArea)