import React from 'react';
import BookAdd from './BookAdd';
import DvdAdd from './DvdAdd';
import FurnitureAdd from './FurnitureAdd';
import FetchFunction from '../Common/Fetch';
export default class AddForm extends React.Component {
    state = {
        Form: {
            SKU: "",
            Name: "",
            Price: "",
            Type: "",
            Attribute: ""
        }
    }
    async handleSKU(e) {
        await this.setState(prevState => ({ Form: { ...prevState.Form, SKU: e.target.value } }))
    }
    async handleName(e) {
        await this.setState(prevState => ({ Form: { ...prevState.Form, Name: e.target.value } }))
    }
    async handlePrice(e) {
        await this.setState(prevState => ({ Form: { ...prevState.Form, Price: e.target.value } }))
    }
    async handleType(e) {
        await this.setState(prevState => ({ Form: { ...prevState.Form, Type: e.target.value } }))
        await this.setState(prevState => ({ Form: { ...prevState.Form, Attribute: "" } }))
        if (e.target.value === "Furniture") {
            await this.setState(prevState => ({ Form: { ...prevState.Form, Attribute: [] } }))
        }
    }
    handleAttribute = async(e)=>{
        await this.setState(prevState => ({ Form: { ...prevState.Form, Attribute: e.target.value } }))
    }
     handleFurnitureAttribute = async(Att) =>{
        await this.setState(prevState => ({ Form: { ...prevState.Form, Attribute: Att } }))
    }
    TypeFloatingLabel(e) {
        if (e.target.value !== "") {
            e.target.classList.add("LabelFloated")
        } else {
            e.target.classList.remove("LabelFloated")
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.Form !== this.state.Form) {
            this.props.Change(this.state.Form);
        }
        if (prevProps.SaveClicked !== this.props.SaveClicked) {
            let validity = this.validateForm();
            if (validity) {
                this.AddProduct();
            };
        }
    }
    async AddProduct() {
        var Productobj = {
            Product: {
                SKU: this.state.Form.SKU,
                Name: this.state.Form.Name,
                Price: this.state.Form.Price,
                Type: this.state.Form.Type,
                Attribute: this.state.Form.Attribute
            }
        }
        let response = await FetchFunction("POST", Productobj);
        if (response[1] !== 200) {
            let res = await response[0].json();
           this.validateForm(res);
        }else {
            window.location.href = "/";
        }
    }
    
    validateForm = (PhpErrors = null) => {
        var SkuEL = document.getElementsByName("SKU")[0];
        var NameEl = document.getElementsByName("Name")[0];
        var PriceEl = document.getElementsByName("Price")[0];
        var TypeEl = document.getElementsByName("Type")[0];
        var SimpleAtt = document.getElementsByName("SimpleAttribute")[0];
        var heightEL = document.getElementsByName("heightEl")[0];
        var widthEL = document.getElementsByName("widthEl")[0];
        var lengthEL = document.getElementsByName("lengthEl")[0];
        let valid = true;
        const { SKU, Name, Price, Type, Attribute } = this.state.Form;
        if (SKU === "" || (PhpErrors && PhpErrors.includes(402))) {
            valid = false;
            SkuEL.classList.add("Invalid");
            SkuEL.classList.remove("Valid");
            SkuEL.getElementsByClassName("Validity")[0].innerHTML = "*Your Input is Invalid, SKU should be 8 characters*";
        } else {
            SkuEL.classList.add("Valid");
            SkuEL.classList.remove("Invalid");
        }
        if(PhpErrors && PhpErrors.includes(401)){
            valid = false;
            SkuEL.classList.add("Invalid");
            SkuEL.classList.remove("Valid");
            SkuEL.getElementsByClassName("Validity")[0].innerHTML = "*Your Input is Invalid, SKU Already in USE*"; 
        }
        if (Name === "") {
            valid = false;
            NameEl.classList.add("Invalid")
            NameEl.classList.remove("Valid")
        } else {
            NameEl.classList.add("Valid")
            NameEl.classList.remove("Invalid")
        }
        if (Price === "" ||(PhpErrors && PhpErrors.includes(405))){
            valid = false;
            PriceEl.classList.add("Invalid");
            PriceEl.classList.remove("Valid");
        } else {
            PriceEl.classList.add("Valid");
            PriceEl.classList.remove("Invalid");
        }
        if (Type === "") {
            valid = false;
            TypeEl.classList.add("Invalid");
            TypeEl.classList.remove("Valid");
        } else {
            TypeEl.classList.add("Valid");
            TypeEl.classList.remove("Invalid");
        }
        if ((!Attribute || Attribute === "" ) && (Type === "DVD" || Type === "Book")) {
            valid = false;
            SimpleAtt.classList.add("Invalid");
            SimpleAtt.classList.remove("Valid");
        }
        if ((Attribute || Attribute !== "" ) && (Type === "DVD" || Type === "Book")) {
            SimpleAtt.classList.add("Valid");
            SimpleAtt.classList.remove("Invalid");
        }
        if(PhpErrors && PhpErrors.includes(407)){
            console.log("407 called")
            valid = false ;
            SimpleAtt.classList.add("Invalid");
            SimpleAtt.classList.remove("Valid");
        }
        // if (Attribute !== "" && (Type === "DVD" || Type === "Book")) {
            
        // }
        if (Type === "Furniture") {
            if (!Attribute[0] || Attribute === "" || (PhpErrors && PhpErrors.includes(408))) {
                valid = false;
                heightEL.classList.add("Invalid");
                heightEL.classList.remove("Valid");
            } else {
                heightEL.classList.add("Valid");
                heightEL.classList.remove("Invalid");
            }
            if(!Attribute[1] || Attribute[1] === "" || (PhpErrors && PhpErrors.includes(409))) {
                valid = false;
                widthEL.classList.add("Invalid");
                widthEL.classList.remove("Valid");
            }else{
                widthEL.classList.add("Valid");
                widthEL.classList.remove("Invalid");
            }
            if(!Attribute[2] || Attribute[2] === "" || (PhpErrors &&PhpErrors.includes(410))) {
                valid = false;
                lengthEL.classList.add("Invalid");
                lengthEL.classList.remove("Valid");
            } else {
                lengthEL.classList.add("Valid");
                lengthEL.classList.remove("Invalid");
            }
        }
        return valid;
    }
    render() {
        return (
            <div className="Form-Container">
                <form action="" id='product_form'>
                    <div className="Input-field" name="SKU">
                        <input className='Form-Input' type="text" placeholder="SKU" maxLength="8" id='sku' value={this.state.Form.SKU} onChange={e => this.handleSKU(e)} />
                        <label htmlFor="sku" aria-label='SKU' className='Form-Label'>SKU</label>
                        <p className='p-sm Validity'>*Your Input is Invalid, SKU should be 8 characters*</p>

                    </div>
                    <div className="Input-field" name="Name">
                        <input className='Form-Input' type="text" placeholder="Product Name" id='name' onChange={e => this.handleName(e)} value={this.state.Form.Name} />
                        <label className='Form-Label' htmlFor="name" aria-label='Name'>Name</label>
                        <p className='p-sm Validity'>*Your Input is Invalid,Please Enter a Name*</p>
                    </div>
                    <div className="Input-field" name="Price">
                        <input className='Form-Input' type="text" placeholder="Price" id='price' value={this.state.Form.Price} onChange={e => this.handlePrice(e)} />
                        <label className='Form-Label' htmlFor="price" aria-label='Price'>Price ($)</label>
                        <p className='p-sm Validity'>*Your Input is Invalid, Please Enter a Price (Numbers only)*</p>
                    </div>
                    <div className="Input-field" name="Type">
                        <select id='productType' className='Select-Input' onChange={e => [this.handleType(e), this.TypeFloatingLabel(e)]} value={this.state.Form.Type}>
                            <option value="" defaultChecked></option>
                            <option value="DVD" className="Form-Type-Options" id='DVD'>DVD</option>
                            <option value="Furniture" className="Form-Type-Options" id='Furniture'>Furniture</option>
                            <option value="Book" className="Form-Type-Options" id='Book'>Book</option>
                        </select>
                        <label className='Select-Label'>Type</label>
                        <p className='p-sm Validity'>*Please Choose a Type to Continue Your Form*</p>
                    </div>
                    {this.state.Form.Type === "DVD" && <DvdAdd change={this.handleAttribute} />}
                    {this.state.Form.Type === "Furniture" && <FurnitureAdd change={this.handleFurnitureAttribute} />}
                    {this.state.Form.Type === "Book" && <BookAdd change={this.handleAttribute} />}
                </form>
            </div>
        )
    }
}