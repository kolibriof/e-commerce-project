import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const price = action.payload.map((item) => item.price);
    const maxPrice = Math.max(...price);
    const minPrice = Math.min(...price);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        min_price: minPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let temp_products = [...all_products];
    if (text) {
      temp_products = temp_products.filter((product) => {
        return product.name.toLowerCase().includes(text);
      });
    }
    if (category !== "all") {
      temp_products = temp_products.filter((p) => p.category === category);
    }
    if (company !== "all") {
      temp_products = temp_products.filter((p) => {
        return p.company === company;
      });
    }
    if (color !== "all") {
      temp_products = temp_products.filter((p) => {
        return p.color === color;
      });
    }
    if (price) {
      temp_products = temp_products.filter((p) => {
        return p.price <= price;
      });
    }
    if (shipping) {
      temp_products = temp_products.filter((p) => {
        return p.shipping === shipping;
      });
    }
    return { ...state, filtered_products: temp_products };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
