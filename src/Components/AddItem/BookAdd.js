import React from "react";

export default class BookAdd extends React.Component {

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
                <input className='Form-Input' type="text" placeholder="Book Weight" id='weight' value={this.props.value} onChange={e => this.Change(e)} />
                <label className='Form-Label' htmlFor="weight" aria-label='Book Weight'>Book Pages</label>
                <p className='p-sm Validity'>*Your Input is Invalid,Please Enter a Valid Pages Number (Numbers only)*</p>
                <p className="Description p-base">Please provide the number of pages of your book.</p>
            </div>
        )
    }
}