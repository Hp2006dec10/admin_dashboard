export type FoodItemStructure = {
  itemno:  number,
  imgsrc: string,
  itemname: string,
  itemdesc: string,
  category: string,
  type: string,
  price: number,
  discount: number,
  status: string[],
}

let FoodItemData : FoodItemStructure[] = [
  {
    itemno : 0,
    imgsrc : "/dummy-image.jpg",
    itemname: "Pani Puri",
    itemdesc: "Crunchy balls filled with spicy tangy water.",
    category: "Appetizers",
    type: "Vegan",
    price: 3.25,
    discount: 0.25,
    status: ["Available","Trending"]
  },
  {
    itemno : 1,
    imgsrc : "/dummy-image.jpg",
    itemname : "Margherita Pizza",
    itemdesc : "Classic Italian Pizza with Tomato and Cheese",
    category: "Main course",
    type : "Vegetarian",
    price: 14.99,
    discount: 0,
    status: ["Available", "Bestseller"]
  },
  {
    itemno : 2,
    imgsrc: "/dummy-image.jpg",
    itemname : "Chicken Tikka",
    itemdesc : "Marinated chicken pieces grilled to perfection",
    category: "Appetizers",
    type : "Non-Vegetarian",
    price: 10.29,
    discount: 2,
    status: ["Available", "Trending"]
  },
  {
    itemno : 3,
    imgsrc: "/dummy-image.jpg",
    itemname: "Butter Chicken",
    itemdesc: "Creamy tomato gravy with tender chicken pieces.",
    category: "Main course",
    type: "Non-Vegetarian",
    price: 13.49,
    discount: 2,
    status: ["Available"]
  },
  {
    itemno : 4,
    imgsrc: "/dummy-image.jpg",
    itemname: "Gulab Jamun",
    itemdesc: "Sweet fried balls soaked in sugar syrup.",
    category: "Desserts",
    type: "Vegetarian",
    price: 4.5,
    discount: 0.5,
    status: ["Available","Trending"]
  },
  {
    itemno : 5,
    imgsrc: "/dummy-image.jpg",
    itemname: "Mango Lassi",
    itemdesc: "Chilled mango yogurt smoothie.",
    category: "Beverages",
    type: "Vegetarian",
    price: 3.25,
    discount: 0,
    status: ["Unavailable"]
  },
  {
    itemno : 6,
    imgsrc: "/dummy-image.jpg",
    itemname: "Veg Spring Rolls",
    itemdesc: "Crispy rolls filled with spiced vegetables.",
    category: "Appetizers",
    type: "Vegan",
    price: 6.75,
    discount: 1,
    status: ["Available","Bestsellers"]
  },
  {
    itemno : 7,
    imgsrc: "/dummy-image.jpg",
    itemname: "Paneer Butter Masala",
    itemdesc: "Rich tomato-based curry with soft paneer cubes.",
    category: "Main course",
    type: "Vegetarian",
    price: 11.25,
    discount: 1.5,
    status: ["Unavailable"]
  },
  {
    itemno : 8,
    imgsrc: "/dummy-image.jpg",
    itemname: "Tandoori Chicken",
    itemdesc: "Spicy grilled chicken marinated in yogurt and spices.",
    category: "Main course",
    type: "Non-Vegetarian",
    price: 12.99,
    discount: 2,
    status:["Available","Bestsellers"]
  },
  {
    itemno : 9,
    imgsrc: "/dummy-image.jpg",
    itemname: "Chocolate Brownie",
    itemdesc: "Dense chocolate brownie topped with nuts.",
    category: "Desserts",
    type: "Vegetarian",
    price: 5.5,
    discount: 0.75,
    status: ["Available"]
  },
  {
    itemno : 10,
    imgsrc: "/dummy-image.jpg",
    itemname: "Cold Coffee",
    itemdesc: "Iced coffee blended with cream and sugar.",
    category: "Beverages",
    type: "Vegetarian",
    price: 4.25,
    discount: 0.5,
    status: ["Available","Trending"]
  },
  {
    itemno : 11,
    imgsrc: "/dummy-image.jpg",
    itemname: "Hakka Noodles",
    itemdesc: "Stir-fried noodles with veggies in soy sauce.",
    category: "Main course",
    type: "Vegan",
    price: 8.5,
    discount: 1,
    status: ["Unavailable"]
  },
  {
    itemno : 12,
    imgsrc : "/dummy-image.jpg",
    itemname: "Dal Tadka",
    itemdesc: "Yellow lentils tempered with ghee and spices.",
    category: "Main course",
    type: "Jain",
    price: 7.75,
    discount: 0.75,
    status: ["Available"]
  },
  {
    itemno : 13,
    imgsrc : "/dummy-image.jpg",
    itemname: "Vegetable Samosa",
    itemdesc: "Deep-fried pastry filled with spicy potato mix.",
    category: "Appetizers",
    type: "Vegan",
    price: 2.99,
    discount: 0,
    status: ["Available"]
  },
  {
    itemno : 14,
    imgsrc : "/dummy-image.jpg",
    itemname: "Pav Bhaji",
    itemdesc: "Spicy mashed vegetable curry with buttered buns.",
    category: "Main course",
    type: "Vegetarian",
    price: 6.25,
    discount: 0.5,
    status: ["Available","Trending"]
  },
  {
    itemno : 15,
    imgsrc : "/dummy-image.jpg",
    itemname: "Jalebi",
    itemdesc: "Crispy syrupy Indian sweet spirals.",
    category: "Desserts",
    type: "Vegetarian",
    price: 3.5,
    discount: 0.25,
    status: ["Available"]
  },
  {
    itemno : 16,
    imgsrc : "/dummy-image.jpg",
    itemname: "Green Salad",
    itemdesc: "Fresh greens tossed with olive oil and herbs.",
    category: "Appetizers",
    type: "Vegan",
    price: 4.75,
    discount: 0.5,
    status: ["Available"]
  },
  {
    itemno : 17,
    imgsrc : "/dummy-image.jpg",
    itemname: "Masala Dosa",
    itemdesc: "Crispy rice crepe filled with spicy mashed potatoes.",
    category: "Main course",
    type: "Jain",
    price: 5.99,
    discount: 1,
    status: ["Available", "Trending"]
  },
  {
    itemno : 18,
    imgsrc : "/dummy-image.jpg",
    itemname: "Fruit Punch",
    itemdesc: "Chilled mixed fruit drink with soda.",
    category: "Beverages",
    type: "Vegan",
    price: 3.75,
    discount: 0,
    status: ["Available"]
  },
  {
    itemno : 19,
    imgsrc : "/dummy-image.jpg",
    itemname: "Chole Bhature",
    itemdesc: "Spicy chickpeas served with deep-fried bread.",
    category: "Main course",
    type: "Vegetarian",
    price: 9.25,
    discount: 1.25,
    status: ["Available"]
  },
  {
    itemno : 20,
    imgsrc : "/dummy-image.jpg",
    itemname: "Vanilla Ice Cream",
    itemdesc: "Creamy vanilla scoop served chilled.",
    category: "Desserts",
    type: "Vegetarian",
    price: 3.99,
    discount: 0.5,
    status: ["Available"]
  }
]

export class FoodItemDetails{
  data: FoodItemStructure[];
  categories : string[];
  status : string[];
  types : string[];
  bulkActions : string[];
  
  constructor(){
    this.data = FoodItemData;
    this.categories = ["All Categories", "Main course", "Appetizers", "Desserts", "Beverages"];
    this.status = ["All Items", "Available", "Unavailable", "Bestsellers", "Trending"];
    this.types = ["All Types","Vegetarian","Non-Vegetarian", "Vegan", "Jain"];
    this.bulkActions = ["Delete selected", "Mark as Available", "Mark as Unavailable"];
  }
  getData() : FoodItemStructure[] {
    return this.data;
  }

  getSelectedData(indices : number[]) : FoodItemStructure[]{
    return indices.map((value) => FoodItemData[value]);
  }

  getFilterData(currentItems : FoodItemStructure[],category: string = "All categories", status: string = "All Items", type: string = "All Types") : FoodItemStructure[] {
    let newItems : FoodItemStructure[] = currentItems;
    if(category != "All Categories") newItems = newItems.filter(elem => elem.category === category);
    if (status != "All Items") newItems = newItems.filter(elem => elem.status.includes(status));
    if (type != "All Types") newItems = newItems.filter(elem => elem.type === type);
    return newItems;
  }

  getItemsBySearch(searchParam: string) : FoodItemStructure[]{
    let newItems : FoodItemStructure[] = this.data.filter(item => new RegExp(searchParam, "i").test(item.itemname));
    return newItems;
  }

  toggleAvailability(index : number) : void {
    this.data = this.data.map(item => {
      if (item.itemno === index){
        item.status = item.status.includes("Available") ? ["Unavailable"] : ["Available"];
      }
      return item;
    })    
  }

  toggleBulkAvailability(opCode: number, selectItemsIndex: number[]) : void{
    selectItemsIndex.forEach(index => {
      if (opCode === 0 && this.data[index].status.includes("Unavailable")) this.data[index].status = ["Available"];
      if (opCode === 1 && this.data[index].status.includes("Available")) this.data[index].status = ["Unavailable"];
    })
  }

  deleteItem(index: number) : void{
    this.data = this.data.filter(item => item.itemno != index);
  }
  deleteBulkItems(selectItemsIndex: number[]) : void {
    this.data = this.data.filter(item => !selectItemsIndex.includes(item.itemno))
  }


}

export default FoodItemData;