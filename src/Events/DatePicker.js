import React from "react";
import moment from "moment";

export let DatePicker = props => {
    if (props.days) {
        console.log(props.selected);
        return (
            <div className="col-12">
                <div className="card">
                    <select style={{ 'width': '100%', 'border': 'none' }} onChange={(value) => {props.switch(value)}} defaultValue={props.selected || ''}>
                        <option value='' disabled>Showing today</option>
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