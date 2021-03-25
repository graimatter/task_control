import React from 'react'
import { ItemTypes } from '../constants/constants'
import { DragSource } from 'react-dnd'
import './task_template.css'

const TemplateSource = {
   
    isDragging(props, monitor) {
     
      return monitor.getItem().id === props.template_index
    },

    beginDrag(props, monitor, component) {

        const item = {
            title : props.template.title,
            id : props.template.id
        }
        return item
    },

}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class TaskTemplate extends React.Component {

    deleteTemplate = () => {
        this.props.deleteHandler(this.props.template_index, this.props.template.id)
    }

    render() {

        return this.props.connectDragSource(

            <div className='alert alert-dismissible alert-success' isDragging={this.props.isDragging}>
                <button type='button' className='close' data-dismiss='alert' onClick={this.deleteTemplate}>&times;</button>
                <strong className='unselectable'><small>{this.props.template.title}</small></strong>
            </div>

        )

    }

}

export default DragSource(ItemTypes.TASK, TemplateSource, collect)(TaskTemplate)