import React from "react";
import FetchFunction from '../Common/Fetch';
import { ImBooks } from 'react-icons/im';
import { FaCouch, FaCompactDisc } from 'react-icons/fa';
export default class ItemList extends React.Component {
    state = {
        Products: [],
        ProductEl: [],
        Delete: '',
        Dark: false
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

    handleDeleteClick = async (e) => {
        if (this.state.Delete === e.target.id) {
            let IDs = {
                IDs: e.target.id
            }
            let response = await FetchFunction("POST", IDs);
            if (response[1] === 200) {
                this.getProducts();
            }
        } else {
            var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
            var wrapper = document.createElement('div')
            wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">WARNING! This Action Is Unreversable, Click Delete Again To Confirm<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
            alertPlaceholder.append(wrapper)
            setTimeout(() => {
                alertPlaceholder.innerHTML = "";
            }, 5000);
            this.setState({ Delete: e.target.id });
        }
    };
    createElements(Product) {
        let element =
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2" key={Product.ID}>
                <div className="card text-center h-100 d-flex flex-column align-items-stretch overflow-hidden">
                    <div className="card-image-top ">
                        {Product.Type === "Book" ? <ImBooks /> : Product.Type === "Furniture" ? <FaCouch /> : <FaCompactDisc />}
                    </div>
                    <div className="card-body">
                        <div className="card-text text-muted">{Product.SKU}</div>
                        <h5 className="card-title">{Product.Name}</h5>
                        <hr />
                        <ul className="list-group list-group-flush">
                            {Product.Type === "Book" ?
                                <><li className="list-group-item ">
                                    Pages : {Product.Attribute} PP.
                                </li></>
                                : Product.Type === "Furniture" ?
                                    <>
                                        <li className="list-group-item ">
                                            Height : {Product.Attribute.split("x")[0]}CM.
                                        </li>
                                        <li className="list-group-item ">
                                            Width : {Product.Attribute.split("x")[1]}CM.
                                        </li>
                                        <li className="list-group-item ">
                                            Length : {Product.Attribute.split("x")[2]}CM.
                                        </li>
                                    </>
                                    :
                                    <><li className="list-group-item ">
                                        Runtime : {Product.Attribute} MIN.
                                    </li></>}
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger" id={Product.ID} onClick={(e) => this.handleDeleteClick(e)}>Delete
                        </button>
                    </div>
                </div>
            </div>
        this.setState(prevState => ({ ProductEl: [...prevState.ProductEl, element] }));
    }

    componentDidMount() {
        this.getProducts();
        this.setState({ Dark: this.props.DarkMode })
    }
    componentDidUpdate(prevprops) {
        if (this.props.DarkMode !== prevprops.DarkMode) {
            this.setState({ Dark: this.props.DarkMode })
        }
    }
    render() {
        return (
            <>
                <div id='liveAlertPlaceholder'></div>
                <div className="row p-3 m-0">
                    {this.state.ProductEl}
                </div></>
        )
    }
}