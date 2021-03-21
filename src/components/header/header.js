import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './header.css'

export default class Header extends React.Component {

    state = {
        navDate : this.props.navDate
    }

    changeDate = (date) => {
        this.setState({ navDate: date})
        this.props.changeDate(date)
    }

    exitHandles = () => {
        this.props.exit()
    }
    
    render() {
        
        return (

            <nav className='navbar navbar-expand-lg navbar-dark bg-primary header'>
                <div className='navDate'>
                    <DatePicker customInput = {<input type='text' className='form-control'></input>} selected={this.state.navDate} onChange={this.changeDate}/>
                </div>
                <button type='button' className='btn btn-warning btn-sm' onClick = {this.exitHandles} >Выход</button>
            </nav>

        )

    }

}