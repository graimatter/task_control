import React from 'react'
import { ItemTypes } from '../constants/constants'
import { DragSource } from 'react-dnd'
import './task_template.css'

const TemplateSource = {
    /*canDrag(props) {
      
      return props.isReady
    },*/

    /*isDragging(props, monitor) {
     
      return monitor.getItem().id === props.template_index
    },*/

    beginDrag(props, monitor, component) {

        const item = {
            title : props.template.title,
            id : props.template.id
        }
        return item
    },

    /*endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {

            return
        }

        //const item = monitor.getItem()
        //const dropResult = monitor.getDropResult()
        //TemplateActions.moveTemplate(item.id, dropResult.listId)
    }*/
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class TaskTemplate extends React.Component {

    deleteTemplate = () => {
        this.props.deleteHandler(this.props.template_index)
    }

    render() {

        return this.props.connectDragSource(

            <div className='alert alert-dismissible alert-success' isDragging={this.props.isDragging}>
                <button type='button' className='close' data-dismiss='alert' onClick={this.deleteTemplate}>&times;</button>
                <strong className='unselectable'>{this.props.template.title}</strong>
            </div>

        )

    }

}

export default DragSource(ItemTypes.TASK, TemplateSource, collect)(TaskTemplate)