import { SyntheticEvent, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import salesDataJson from "../data/salesData.json";
import { Brand, Category, Product } from "@/interfaces/interfaces";

export default function Home() {


  let [selectedCategory, setSelectedCategory] = useState<Category>(salesDataJson[0]);
  let [selectedProduct, setSelectedProduct] = useState<Product>(salesDataJson[0].products[0]);
  let [selectedBrand, setSelectedBrand] = useState<Brand>(salesDataJson[0].products[0].brands[0]);
  let [salesData, setSalesData] = useState(salesDataJson);

  function updateSelection(evt: SyntheticEvent) {

    let type = "";
    let value = "";
    if (evt.target instanceof Element) {
      type = evt.target.id;
    }
    if (evt.target instanceof HTMLSelectElement) {
      value = evt.target.value;
    }
    switch (type) {
      case "category":
        let category: Category = salesData.find(c => c.name == value) as Category;
        setSelectedCategory(category);
        setSelectedProduct(category.products[0]);
        setSelectedBrand(category.products[0].brands[0]);
        break;
      case "product":
        let product: Product = selectedCategory.products.find(p => p.name == value) as Product;
        setSelectedProduct(product);
        setSelectedBrand(product.brands[0]);
        break;
      case "brand":
        let brand: Brand = selectedProduct.brands.find(b => b.name == value) as Brand;
        setSelectedBrand(brand);
        break;
    }
  }

  return (
    <>
      <header>
        <div id="header-left">
          <label>Menu</label>
          <label>&#x1F534;User Name</label>
        </div>
        <label>Sales Report</label>
      </header>
      <main>
        <div id="selects">
          <span>
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" onChange={updateSelection}>
              {salesData.map(saleData => (
                <option key={saleData.name} value={saleData.name}>{saleData.name}</option>
              ))}
            </select>
          </span>
          <span>
            <label htmlFor="product">Product: </label>
            <select name="product" id="product" onChange={updateSelection}>
              {selectedCategory.products.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
          </span>
          <span>
            <label htmlFor="brand">Brand: </label>
            <select name="brand" id="brand" onChange={updateSelection}>
              {selectedProduct.brands.map(brand => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
              ))}
            </select>
          </span>
        </div>
        <Chart
          chartType="LineChart"
          height="500px"
          width="95%"
          data={[
            ["Month", "Sales"],
            ...selectedBrand.sales.map(sale => [sale.month, sale.quantity])
          ]}
          options={{
            title: "Sales By Month:",
            hAxis: { title: 'Months' },
            vAxis: { title: 'Sales', ticks: [0, 25, 50, 75, 100, 125, 150, 175, 200] },
            legend: { position: "bottom" }
          }} />
        <div id="chart"></div>
      </main>
    </>
  );
}

