import React from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import AddForm from "./AddForm";

export default class AddItemIndex extends React.Component {
    state = {
        Form: {
            SKU: "",
            Name: "",
            Price: "",
            Type: "",
            Attribute: ""
        },
        Submit: false
    }
    ChangeForm = (ChildForm) => {
        this.setState({
            Form: ChildForm
        });
    }
    Submit = () => {
        this.setState(prevState => ({ Submit: !prevState.Submit }))
    }
    render() {
        return (
            <>
                <Navbar DarkMode={this.props.DarkMode} toggleDark={this.props.toggleDark} Save={this.Submit} />
                <AddForm Change={this.ChangeForm} SaveClicked={this.state.Submit} />
                <Footer />
            </>
        )
    }
}