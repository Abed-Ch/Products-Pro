import React from "react";

export default class DvdAdd extends React.Component {


    Change(e) {
        this.props.change(e);
        if (e.target.value !== "") {
            e.target.classList.add("LabelFloated")
        }
        else {
            e.target.classList.remove("LabelFloated")
        }
    }
    render() {
        return (
            <div className="Input-field" name="SimpleAttribute">
                <input className='Form-Input' type="text" placeholder="DVD Size" id='size' onChange={e => this.Change(e)} value={this.props.value} />
                <label className='Form-Label' htmlFor="size" aria-label='Size'>Size (MB)</label>
                <p className='p-sm Validity'>*Your Input is Invalid,Please Enter a Valid Size (Numbers only)*</p>
                <p className="p-base description">Please provide the digital size of your dvd in MB.</p>
            </div>
        )
    }
}