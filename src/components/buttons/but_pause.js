import React from 'react'
import './but.css'

export default class But_Pause extends React.Component {

    render() {
        return (
            <button type='button' className='btn btn-outline-danger'>
                <svg width='32' height='32' fill='currentColor' className='bi bi-stop-btn' viewBox='0 0 16 16'>
                    <path d='M6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z' />
                    <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z' />
                </svg>
            </button>
        )
    }

}