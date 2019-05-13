import React from "react";
import moment from "moment";

export let DatePicker = props => {
    if (props.days) {
        return (
            <div className="card">
                <div className="content">
                    <select style={{ 'width': '100%', 'border': 'none' }} onChange={(value) => {props.switch(value)}} defaultValue={props.selected || ''}>
                        <option value='' disabled>Select a day</option>
                        {props.days.map((item, i) => {
                            return (
                                <option key={i} value={item.day}>{moment(item.day).format('MMM Do YYYY')}</option>
                            )
                        })}
                    </select>
                </div>
            </div>            
        )
    }
    return '';
}