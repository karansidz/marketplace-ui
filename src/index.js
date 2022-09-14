import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//function ShowProduct(props) {
//    return <p> Product Name: {props.name} Description: {props.description} </p>;
//}

//const root = ReactDOM.createRoot(document.getElementById('root'));
//const ghost = <ShowProduct name="Kookaburra Ghost" description="This is a lightweight bat"/>;
//root.render(ghost);


class SearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {vendorId:'', productId:'',}
  };


    render() {
        return (
          <div id="SearchDisplay">
                <input id="productId" type="text" value="P-BEAST" onChange={this.setState({productId:this.value})}/>
                <input id="vendorId" type="text" value="V-KOOKABURRA" onChange={this.setState({vendorId:this.value})}/>
                <br></br>
          </div>
        );
    }
}

/*
class ProductDisplay extends React.Component {
    render() {
        const rows = [];
        let lastId = null;

        this.props.products.forEach((product) => {
            rows.push(
                <ProductRow
                    product_name={product.productName}
                    vendor_name={product.vendorName}
                />
            )
        })
    }
}

class Webpage extends React.Component {
    render() {
        return (
            <div>
                <SearchBar />

            </div>
        )
    }
}
*/

class ImageRow extends React.Component {
  render() {
    return (
      <img src={this.props.image.url} width={300} height={300} alt={"Product Image"} />
    );
  }
}

/* class RestComponent extends React.Component {

  constructor (props) {
    super(props);
    this.state = {product:''}
  };

  componentDidMount() {
    const apiUrl = 'http://localhost:8080/product/show-product/P-BEAST/V-KOOKABURRA';
    console.log('I am here....')
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {this.setState({product:data})});
  }
  render() {
    var {product} = this.state;
    return (
      <p> Got from API Call {product}</p>
    )
  }
} */

class ProductImageDisplayFrame extends React.Component {
  render() {
  const rows = [];
    this.props.images.forEach((image) => {
      rows.push(<ImageRow image={image} />);
    });
    return (
      <p> {rows}</p>
    );
  }
}

class ProductDisplayFrame extends React.Component {

  constructor (props) {
    super(props);
    this.state = {product:'', isLoaded:false,}
  };

  componentDidMount() {
    const apiUrl = 'http://192.168.1.125:8080/product/show-product/'+document.getElementById("productId").value+'/'+document.getElementById("vendorId").value;
    //const apiUrl = 'http://192.168.1.125:8080/product/show-product/P-BEAST/V-KOOKABURRA';
    console.log(apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {this.setState({product:data, isLoaded:true,})});
    this.setState({product:PRODUCT, isLoaded:true})
  }

  render () {
    var {product, isLoaded} = this.state;
    if (! isLoaded) {
      return (<div> Loading...</div>);
    }
    
    return (
      <>
        <div className="ProductDisplayClass">
           <p className="DisplayLabel" id="ProductLabel"> Product : </p> 
           <p className="Display" id="ProductName"> {product.productName} </p>
        </div> <br></br>
        <div className="ProductDisplayClass">
           <p className="DisplayLabel" id="VendorLabel"> Sold By : </p>
           <p className="Display" id="VendorName"> {product.vendorId} </p>
        </div> <br></br>
        <div className="ProductDisplayClass">
            <p className="DisplayLabel" id="DescriptionLabel"> Description : </p>
            <p className="Display" id="Description"> {product.productDescription} </p>
        </div> <br></br>
        <div className="ProductDisplayClass">
           <p className="DisplayLabel" id="PriceLabel"> Price : $</p>
           <p className="Display" id="Price"> {product.price} </p>
        </div> <br></br>
        <div className="ProductDisplayClass">
           <p className="DisplayLabel" id="InventoryLabel"> Inventory : </p>
           <p className="Display" id="Inventory"> {product.stockOnHand} </p>
        </div> <br></br>
        <ProductImageDisplayFrame images={product.productImages} />
      </>
    )
  }
}

class ProductFrame extends React.Component {

  render() {
      return (
      <div>
        <div> <SearchBar/></div>
        <div><ProductDisplayFrame /></div>
      </div>
      );
    }
}

/* class ProductFrame extends React.Component {

  constructor (props) {
    super(props);
    this.state = {product:'', isLoaded:false,}
  };

  componentDidMount() {
    fetch('http://192.168.1.125:8080/product/show-product/P-BEAST/V-KOOKABURRA')
      .then((response) => response.json())
      .then((data) => {this.setState({product:data, isLoaded:true,})});
    //this.setState({product:PRODUCT, isLoaded:true})
  }

  render() {
    var {product, isLoaded} = this.state;
    if (! isLoaded) {
      return (<div> Loading...</div>);
    } else {
      return (<div><ProductDisplayFrame product={product} /></div>);
    }
  }
} */

const PRODUCT = {
        "id": "P-BEAST:V-KOOKABURRA",
        "productId": "P-BEAST",
        "productName": "Kookaburra Beast",
        "productDescription": "Attacking bat, great for aggressive front foot play",
        "vendorId": "V-KOOKABURRA",
        "currency": "USD",
        "price": 190.0,
        "stockOnHand": 3,
        "productImages": [
            {
                "url": "https://i.ytimg.com/vi/ocyCgFkFaYk/maxresdefault.jpg",
                "seqNbr": 1
            },
            {
                "url": "https://www.allroundercricket.com/media/catalog/product/cache/13/image/9df78eab33525d08d6e5fb8d27136e95/2/a/2a22353c_beast_3.jpg",
                "seqNbr": 2
            },
            {
                "url": "https://www.uscricketstore.com/wp-content/uploads/2022/03/Beast-pro-1.jpg",
                "seqNbr": 4
            }
        ]
    }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ProductFrame />);
//root.render(<ProductFrame product={PRODUCT} />);
//root.render(
//    <h1>My Marketplace</h1>
//);

//
//root.render(
//  <React.StrictMode>
//    <h1>My Marketplace</h1>
//    <App />
//  </React.StrictMode>
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
