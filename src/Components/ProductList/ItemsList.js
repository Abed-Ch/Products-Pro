import React from "react";
import FetchFunction from '../Common/Fetch';
export default class ItemList extends React.Component {
    state = {
        Products: [],
        ProductEl: [],
        Delete: false
    }

    async getProducts() {
        var response;
        this.setState({ ProductEl: [], Products: [] });
        response = await FetchFunction("GET");
        if (response === 420) {
            alert("ERROR FETCHING DATA, PLEASE RELOAD YOUR PAGE AND CHECK YOUR INTERNET CONNECTION");
        } else {
            this.setProducts(response);
        }
    }
    setProducts(ProductobjArray) {
        ProductobjArray.forEach(Productobj => {
            var Product = {
                ID: Productobj.ID,
                SKU: Productobj.SKU,
                Name: Productobj.Name,
                Price: Productobj.Price,
                Type: Productobj.Type,
                Attribute: Productobj.Attribute
            };
            this.setState(prevState => ({ Products: [...prevState.Products, Product] }));
            this.createElements(Product);
        })
    }
    createElements(Product) {
        let el = <div className="Product-Item" key={Product.ID}>
            <input type="checkbox" id={Product.ID} className="Product-Item__Checkbox delete-checkbox" />
            <div>{Product.SKU}</div>
            <div>{Product.Name}</div>
            <div>{Product.Price}$</div>
            {Product.Type === "DVD" ? <div>Size:{Product.Attribute} MB</div> :
                Product.Type === "Book" ? <div>Weight:{Product.Attribute} KG</div> :
                    <div>Dimensions:{Product.Attribute} CM</div>}
        </div>;
        this.setState(prevState => ({ ProductEl: [...prevState.ProductEl, el] }));
    }

    componentDidMount() {
        this.getProducts();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.Delete !== this.props.Delete && this.props.Delete !== this.state.Delete) {
            this.setState(prevState => ({ Delete: !prevState.Delete }));
            this.MassDelete();
        }
    }
    async MassDelete() {
        let checkboxes = document.getElementsByClassName('Product-Item__Checkbox');
        let checkedIDS = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedIDS.push(checkboxes[i].id);
            }
        }
        if (checkedIDS.length !== 0) {
            let IDs = {
                IDs: checkedIDS
            }
            let response = await FetchFunction("POST", IDs);
            if (response[1] === 200) {
                this.getProducts();
            }
        }
    }
    render() {
        return (
            <div className="Product-Container">
                {this.state.ProductEl}
            </div>
        )
    }
}