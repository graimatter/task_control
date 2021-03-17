import React from 'react'
import './report.css'

export default class Report extends React.Component {


    pad = function (num) { return ('00' + num).slice(-2) }

    toDate = (fromdate) => {
        const dateparts = fromdate.split(' ', 1)[0].split('-')
        console.log(dateparts)
        return `${dateparts[2]}.${dateparts[1]}.${dateparts[0]}`
    }

    DurationToStr(diffsec) {

        let duration = '';
        duration = this.pad(Math.trunc(diffsec / 3600)) + ':';
        diffsec = diffsec - (Math.trunc(diffsec / 3600)) * 3600;
        duration = duration + this.pad(Math.trunc(diffsec / 60)) + ':';
        diffsec = diffsec - (Math.trunc(diffsec / 60)) * 60;
        return duration + this.pad(diffsec);
    }

    render() {


        return (
            <div className='report'>
                <div className='report-table'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'>Наименование работы</th>
                                <th scope='col'>Комментарий</th>
                                <th scope='col'>Место оказания услуги</th>
                                <th scope='col'>Дата</th>
                                <th scope='col'>Длительность</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.rows.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.template_title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.town_title}</td>
                                        <td>{this.toDate(item.datestart)}</td>
                                        <td>{this.DurationToStr(item.duration)}</td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
