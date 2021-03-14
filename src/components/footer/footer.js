import React from 'react'
import './footer.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class Footer extends React.Component {

    state = {
        startDate: new Date(),
        endDate: new Date()
    }

    changeStartDate = (date) => {
        this.setState({ startDate: date })
        //this.props.changeDate(date)
    }

    changeEndDate = (date) => {
        this.setState({ endDate: date })
        //this.props.changeDate(date)
    }

    render() {

        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary footer'>
                <div className='navDate'>
                    <div className='margin_mod'>
                        <h6 className='date-title'>Отчет с:</h6>
                    </div>
                    <div className='margin_mod'>
                        <DatePicker customInput={<input type='text' className='form-control'></input>} selected={this.state.startDate} onChange={this.changeStartDate} />
                    </div>
                    <div className='margin_mod'>
                        <h6 className='date-title'>по:</h6>
                    </div>
                    <div className='margin_mod'>
                        <DatePicker customInput={<input type='text' className='form-control'></input>} selected={this.state.endDate} onChange={this.changeEndDate} />
                    </div>
                    <div className='margin_mod'>
                    <button type="button" class="btn btn-success">сформировать</button>
                    </div>
                </div>
            </nav>
        )
    }
}