import React from "react";

export default class FurnitureAdd extends React.Component {

    state = {
        Attribute : []
    }
    async handleClick(e) {
        if(e.target.value !== ""){
            e.target.classList.add("LabelFloated")
        }
        else {
            e.target.classList.remove("LabelFloated")
        }
        switch (e.target.id) {
            case "height":
                await this.setState(prevState => ({Attribute : [e.target.value,prevState.Attribute[1],prevState.Attribute[2]]}))
                this.UpdateForm();
                return;
            case "length":
                await this.setState(prevState => ({Attribute : [prevState.Attribute[0],prevState.Attribute[1],e.target.value]}))
                this.UpdateForm();
                return;
            case "width":
                await this.setState(prevState => ({Attribute : [prevState.Attribute[0],e.target.value,prevState.Attribute[2]]}))
                this.UpdateForm();
                return;
            default:
                return;
        }

    }

    UpdateForm() {
        this.props.change(this.state.Attribute)
    }


    render() {
        return (
            <>
                <div className="Input-field" name="heightEl">
                    <input className='Form-Input' type="text" placeholder="height" id='height' onChange={e => this.handleClick(e)} value={this.state.height} />
                    <label className='Form-Label' htmlFor="height" aria-label='height'>Height (CM)</label>
                    <p className='p-sm Validity'>*Your Input is Invalid,Please Enter a Valid Height (CM) (Numbers only)*</p>
                </div>
                <div className="Input-field" name="widthEl">
                    <input className='Form-Input' type="text" placeholder="width" id='width' onChange={e => this.handleClick(e)} value={this.state.width} />
                    <label className='Form-Label' htmlFor="width" aria-label='width'>Width (CM)</label>
                    <p className='p-sm Validity'>*Your Input is Invalid,Please Enter a Valid Width (CM) (Numbers only)*</p>
                </div>
                <div className="Input-field" name="lengthEl">
                    <input className='Form-Input' type="text" placeholder="length" id='length' onChange={e => this.handleClick(e)} value={this.state.length} />
                    <label className='Form-Label' htmlFor="length" aria-label='length'>Length (CM)</label>
                    <p className='p-sm Validity'>*Your Input is Invalid,Please Enter a Valid Length(CM) (Numbers only)*</p>
                </div>
                <p className="p-base description">Please provide the height, width, and length of your furniture piece in CM.</p>
            </>
        )
    }
}