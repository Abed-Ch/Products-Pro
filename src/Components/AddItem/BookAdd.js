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
                <label className='Form-Label' htmlFor="weight" aria-label='Book Weight'>Book Weight (KG)</label>
                <p className='p-sm Validity'>*Your Input is Invalid,Please Enter a Valid Weight in KG (Numbers only)*</p>
                <p className="Description p-base">Please provide the weight of your book in KG.</p>
            </div>
        )
    }
}