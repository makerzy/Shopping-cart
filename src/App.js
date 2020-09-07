import React from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  filterProducts = (event) => {
    const event$ = event.target.value;
    if (event$ === "") {
      this.setState({ size: event$, product: data.products });
    } else {
      this.setState({
        size: event$,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event$) >= 0
        ),
      });
    }
  };
  render() {
    const { products, size, sort } = this.state;

    return (
      <div className='grid-container'>
        <header>
          <a href='/'>React Shopping Cart</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter
                count={products.length}
                size={size}
                sort={sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={products} />
            </div>
            <div className='sidebar'>Cart Items</div>
          </div>
        </main>
        <footer>All Right Reserved</footer>
      </div>
    );
  }
}

export default App;
