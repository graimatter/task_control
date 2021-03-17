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
        this.props.chandeReportDate(date, 'start')
        //this.props.changeDate(date)
    }

    changeEndDate = (date) => {
        this.setState({ endDate: date })
        this.props.chandeReportDate(date, 'end')
        //this.props.changeDate(date)
    }

    report = () => {
        this.props.createReport()
    }

    closeHanler = () => {
        this.props.closeReport()
    }

    render() {

        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary footer'>
                <div className='navDate'>
                    <div className='margin_mod'>
                        <h6 className='date-title'>Отчет с:</h6>
                    </div>
                    <div className='margin_mod'>
                        <DatePicker customInput={<input type='text' className='form-control'></input>} selected={this.props.startDate} onChange={this.changeStartDate} />
                    </div>
                    <div className='margin_mod'>
                        <h6 className='date-title'>по:</h6>
                    </div>
                    <div className='margin_mod'>
                        <DatePicker customInput={<input type='text' className='form-control'></input>} selected={this.props.endDate} onChange={this.changeEndDate} />
                    </div>
                    <div className='margin_mod'>
                        <button type="button" className='btn btn-secondary' onClick={this.report}>Сформировать</button>
                    </div>
                    {this.props.reportStat &&
                        <div className='margin_mod'>
                            <button type="button" className='btn btn-warning' onClick={this.closeHanler}>Закрыть</button>
                        </div>
                    }
                </div>
            </nav>
        )
    }
}