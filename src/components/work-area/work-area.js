import React from 'react'
import Task from '../task'
import { ItemTypes } from '../constants/constants'
import { DropTarget } from 'react-dnd'
import './work-area.css'

const TaskTarget = {



    hover(props, monitor, component){
        
    },

    drop(props, monitor, component){

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

class Work_Area extends React.Component {

    render() {

        return this.props.connectDropTarget(
            <div className='work-task'>
                {this.props.isOver && <div className = 'table-warning empty'><strong>{this.props.itemTitle.title}</strong></div>}
                <Task active={true} />
                {this.props.tasks.map((item, index) => {
                                    return (<Task task={item}/>)
                                })
                }
                
            </div>
        )
    }
}

export default DropTarget(ItemTypes.TASK, TaskTarget, collect)(Work_Area)