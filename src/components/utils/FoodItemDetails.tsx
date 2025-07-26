import { fooditem } from "../types/fooditem";
import { MenuItem } from "../types/menuTypes";
import { db } from "../../../firebase";
import { getDocs, collection, doc } from "firebase/firestore";

export type FoodItemStructure = {
  itemno:  number,
  imgsrc:File | null,
  itemVideo: File | null | string;
  itemname: string,
  itemdesc: string,
  category: string,
  type: string,
  price: number,
  discount: number,
  status: string[],
  backstory: string,
  ingredients: string,
  allergens: {
    hasNuts: boolean,
    hasDiary: boolean,
    hasSeaFood: boolean,
    hasGluten: boolean
  },
  spiceLevel: 'Mild' | 'Medium'|'Hot'|'Very Hot'
}

const FoodItemData : FoodItemStructure[] = [
  {
    itemno : 0,
    imgsrc : null,
    itemname: "Pani Puri",
    itemdesc: "Crunchy balls filled with spicy tangy water.",
    category: "Appetizers",
    type: "Vegan",
    price: 3.25,
    backstory: "",
    ingredients: "",
    discount: 0.25,
    status: ["Available","Trending"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 1,
    imgsrc : null,
    itemname : "Margherita Pizza",
    itemdesc : "Classic Italian Pizza with Tomato and Cheese",
    category: "Main Course",
    type : "Vegetarian",
    price: 14.99,
    backstory: "",
    ingredients: "",
    discount: 0,
    status: ["Available", "Bestseller"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 2,
    imgsrc: null,
    itemname : "Chicken Tikka",
    itemdesc : "Marinated chicken pieces grilled to perfection",
    category: "Appetizers",
    type : "Non-Vegetarian",
    price: 10.29,
    backstory: "",
    ingredients: "",
    discount: 2,
    status: ["Available", "Trending"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 3,
    imgsrc: null,
    itemname: "Butter Chicken",
    itemdesc: "Creamy tomato gravy with tender chicken pieces.",
    category: "Main Course",
    type: "Non-Vegetarian",
    price: 13.49,
    backstory: "",
    ingredients: "",
    discount: 2,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 4,
    imgsrc: null,
    itemname: "Gulab Jamun",
    itemdesc: "Sweet fried balls soaked in sugar syrup.",
    category: "Desserts",
    type: "Vegetarian",
    price: 4.5,
    backstory: "",
    ingredients: "",
    discount: 0.5,
    status: ["Available","Trending"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 5,
    imgsrc: null,
    itemname: "Mango Lassi",
    itemdesc: "Chilled mango yogurt smoothie.",
    category: "Beverages",
    type: "Vegetarian",
    price: 3.25,
    backstory: "",
    ingredients: "",
    discount: 0,
    status: ["Unavailable"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 6,
    imgsrc: null,
    itemname: "Veg Spring Rolls",
    itemdesc: "Crispy rolls filled with spiced vegetables.",
    category: "Appetizers",
    type: "Vegan",
    price: 6.75,
    backstory: "",
    ingredients: "",
    discount: 1,
    status: ["Available","Bestseller"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 7,
    imgsrc: null,
    itemname: "Paneer Butter Masala",
    itemdesc: "Rich tomato-based curry with soft paneer cubes.",
    category: "Main Course",
    type: "Vegetarian",
    price: 11.25,
    backstory: "",
    ingredients: "",
    discount: 1.5,
    status: ["Unavailable"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 8,
    imgsrc: null,
    itemname: "Tandoori Chicken",
    itemdesc: "Spicy grilled chicken marinated in yogurt and spices.",
    category: "Main Course",
    type: "Non-Vegetarian",
    price: 12.99,
    backstory: "",
    ingredients: "",
    discount: 2,
    status:["Available","Bestseller"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 9,
    imgsrc: null,
    itemname: "Chocolate Brownie",
    itemdesc: "Dense chocolate brownie topped with nuts.",
    category: "Desserts",
    type: "Vegetarian",
    price: 5.5,
    backstory: "",
    ingredients: "",
    discount: 0.75,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 10,
    imgsrc: null,
    itemname: "Cold Coffee",
    itemdesc: "Iced coffee blended with cream and sugar.",
    category: "Beverages",
    type: "Vegetarian",
    price: 4.25,
    backstory: "",
    ingredients: "",
    discount: 0.5,
    status: ["Available","Trending"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 11,
    imgsrc: null,
    itemname: "Hakka Noodles",
    itemdesc: "Stir-fried noodles with veggies in soy sauce.",
    category: "Main Course",
    type: "Vegan",
    price: 8.5,
    backstory: "",
    ingredients: "",
    discount: 1,
    status: ["Unavailable"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 12,
    imgsrc : null,
    itemname: "Dal Tadka",
    itemdesc: "Yellow lentils tempered with ghee and spices.",
    category: "Main Course",
    type: "Jain",
    price: 7.75,
    backstory: "",
    ingredients: "",
    discount: 0.75,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 13,
    imgsrc : null,
    itemname: "Vegetable Samosa",
    itemdesc: "Deep-fried pastry filled with spicy potato mix.",
    category: "Appetizers",
    type: "Vegan",
    price: 2.99,
    backstory: "",
    ingredients: "",
    discount: 0,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 14,
    imgsrc : null,
    itemname: "Pav Bhaji",
    itemdesc: "Spicy mashed vegetable curry with buttered buns.",
    category: "Main Course",
    type: "Vegetarian",
    price: 6.25,
    backstory: "",
    ingredients: "",
    discount: 0.5,
    status: ["Available","Trending"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 15,
    imgsrc : null,
    itemname: "Jalebi",
    itemdesc: "Crispy syrupy Indian sweet spirals.",
    category: "Desserts",
    type: "Vegetarian",
    price: 3.5,
    backstory: "",
    ingredients: "",
    discount: 0.25,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 16,
    imgsrc : null,
    itemname: "Green Salad",
    itemdesc: "Fresh greens tossed with olive oil and herbs.",
    category: "Appetizers",
    type: "Vegan",
    price: 4.75,
    backstory: "",
    ingredients: "",
    discount: 0.5,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 17,
    imgsrc : null,
    itemname: "Masala Dosa",
    itemdesc: "Crispy rice crepe filled with spicy mashed potatoes.",
    category: "Main Course",
    type: "Jain",
    price: 5.99,
    backstory: "",
    ingredients: "",
    discount: 1,
    status: ["Available", "Trending"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 18,
    imgsrc : null,
    itemname: "Fruit Punch",
    itemdesc: "Chilled mixed fruit drink with soda.",
    category: "Beverages",
    type: "Vegan",
    price: 3.75,
    backstory: "",
    ingredients: "",
    discount: 0,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 19,
    imgsrc : null,
    itemname: "Chole Bhature",
    itemdesc: "Spicy chickpeas served with deep-fried bread.",
    category: "Main Course",
    type: "Vegetarian",
    price: 9.25,
    backstory: "",
    ingredients: "",
    discount: 1.25,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  },
  {
    itemno : 20,
    imgsrc : null,
    itemname: "Vanilla Ice Cream",
    itemdesc: "Creamy vanilla scoop served chilled.",
    category: "Desserts",
    type: "Vegetarian",
    price: 3.99,
    backstory: "",
    ingredients: "",
    discount: 0.5,
    status: ["Available"],
    allergens: {
      hasNuts: false,
      hasDiary: false,
      hasSeaFood: false,
      hasGluten: false
    },
    spiceLevel: 'Medium',
    itemVideo: null  
  }
]

export class FoodItemDetails{
  data: FoodItemStructure[];
  dbdata : fooditem[] = [];
  categories : string[];
  status : string[];
  types : string[];
  bulkActions : string[];
  
  constructor(){
    this.data = FoodItemData;
    this.dbdata = [];
    this.categories = ["Main Course", "Appetizers", "Desserts", "Beverages"];
    this.status = ["Available", "Unavailable", "Bestseller", "Trending"];
    this.types = ["Vegetarian","Non-Vegetarian", "Vegan", "Jain"];
    this.bulkActions = ["Delete selected", "Mark as Available", "Mark as Unavailable"];
  }

  getDataModified() : fooditem[] {
    return this.dbdata;
  }

  getSelectedDataModified(ids : string[]) : fooditem[]{
    let selecteditems = this.dbdata.filter(menuitem => ids.includes(menuitem.id));
    console.log(selecteditems);
    return selecteditems;
  }

  getItemByIndexModified(id: string) : fooditem | null{
    return this.dbdata.find(menuitem => menuitem.id === id) || null;
  }

  getFilterDataModified(currentItems : fooditem[], filters: {category: string, status: string, type: string}) : fooditem[]{
    const {category, status, type} = filters;
    let newItems : fooditem[] = currentItems;
    if (category != "All Categories") newItems = newItems.filter(elem => elem.dish_type === category);
    if (status === "Available") newItems = newItems.filter(elem => elem.available);
    else if (status === "Unavailable") newItems = newItems.filter(elem => !elem.available);
    else if (status === "Bestseller") newItems = newItems.filter(elem => elem.is_best_seller);
    if (type != "All Types") newItems = newItems.filter(elem => elem.diet === type);
    return newItems;
  }

  getItemsBySearchModified(searchParam: string) : fooditem[]{
    let newItems : fooditem[] = this.dbdata.filter(item => new RegExp(searchParam, "i").test(item.name));
    return newItems;
  }

  toggleAvailabilityModified(id: string) : void{
    this.dbdata = this.dbdata.map(menuitem => {
      if (menuitem.id === id){
        menuitem.available = !menuitem.available;
      }
      return menuitem;
    })   
  }

  toggleBulkAvailabilityModified(opCode: number, selectedIDs: string[]) : void{
    if (opCode === 0){
      this.dbdata = this.dbdata.map(menuitem => {
        menuitem.available = selectedIDs.includes(menuitem.id) ? true : menuitem.available;
        return menuitem; 
      })
    }
    else{
      this.dbdata = this.dbdata.map(menuitem => {
        menuitem.available = selectedIDs.includes(menuitem.id) ? false : menuitem.available;
        return menuitem; 
      })
    }
  }

  deleteItemModified(id: string){
    this.dbdata = this.dbdata.filter(menuitem => menuitem.id != id);
  }

  deleteBulkItemsModified(selectedIDs: string[]){
    this.dbdata = this.dbdata.filter(menuitem => !selectedIDs.includes(menuitem.id));
  }

  applyNewCategoriesModified(categories: string[]){
    this.categories = categories;
    this.dbdata = this.dbdata.filter(menuitem => categories.includes(menuitem.dish_type));
  }

  getData() : FoodItemStructure[] {
    return this.data;
  }

  getSelectedData(indices : number[]) : FoodItemStructure[]{
    return indices.map((value) => FoodItemData[value]);
  }

  getItemByIndex(itemno : number) : FoodItemStructure{
    return this.data[itemno];
  }

  getFilterData(currentItems : FoodItemStructure[], filters: {category: string, status: string, type: string}) : FoodItemStructure[] {
    const {category, status, type} = filters;
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

  addData(item : MenuItem) : void{
    let newItem : FoodItemStructure = {
      imgsrc : item.itemImage, 
      itemVideo: item.itemVideo, 
      itemdesc : item.description, 
      itemname: item.itemName, 
      itemno: this.data.length, 
      status : [], 
      type : item.itemType, 
      category: item.category, 
      price: item.price, 
      spiceLevel: item.spiceLevel, 
      allergens: {
        hasNuts : item.allergens.hasNuts,
        hasDiary : item.allergens.hasDiary,
        hasGluten : item.allergens. hasGluten,
        hasSeaFood : item.allergens.hasSeaFood
      }, backstory : item.backstory, ingredients: item.ingredients,
      discount : (item.discount === undefined) ? 0 : item.discount,
  
    }; 
    newItem.discount = (item.discount === undefined) ? 0 : item.discount;
    if (item.isBestseller != undefined && item.isBestseller) newItem.status.push("Bestseller");
    if (item.isTrending != undefined && item.isTrending) newItem.status.push("Trending");
    (item.availability) ? newItem.status.push("Available") : newItem.status.push("Unavailable");
    console.log(item, newItem);
    this.data.push(newItem);
  }

  applyNewCategories(categories: string[]) : void {
    this.categories = categories;
    this.data = this.data.filter(item => categories.includes(item.category));
    console.log(this.categories, this.data);
  }

  updateData(existingItem : {item : MenuItem, index: number}) : void{
    const {item, index} = existingItem;
    let newItem : FoodItemStructure = {
      imgsrc : item.itemImage, 
      itemVideo: item.itemVideo, 
      itemdesc : item.description, 
      itemname: item.itemName, 
      itemno: index, 
      status : [], 
      type : item.itemType, 
      category: item.category, 
      price: item.price, 
      spiceLevel: item.spiceLevel, 
      allergens: {
        hasNuts : item.allergens.hasNuts,
        hasDiary : item.allergens.hasDiary,
        hasGluten : item.allergens. hasGluten,
        hasSeaFood : item.allergens.hasSeaFood
      }, backstory : item.backstory, ingredients: item.ingredients,
      discount : (item.discount === undefined) ? 0 : item.discount,
    }; 
    newItem.discount = (item.discount === undefined) ? 0 : item.discount;
    if (item.isBestseller != undefined && item.isBestseller) newItem.status.push("Bestseller");
    if (item.isTrending != undefined && item.isTrending) newItem.status.push("Trending");
    (item.availability) ? newItem.status.push("Available") : newItem.status.push("Unavailable");
    this.data[index] = newItem;
  }
}

async function getDocuments() : Promise<fooditem[]>{
  const docRef = collection(db, "restaurants","bbq_in","menu");
  const docSnapShot = await getDocs(docRef);
  let docs : fooditem[] = [];
  docSnapShot.docs.forEach(doc => {
    const data = doc.data();
    const item : fooditem = {
      id: doc.id, 
      allergens: data.allergens,
      available: data.available,
      available_time: data.available_time,
      calories: data.calories,
      carbs: data.carbs,
      combo_items: data.combo_items,
      cooking_method: data.cooking_method,
      cuisine: data.cuisine,
      description: data.description,
      diet: data.diet,
      dish_type: data.dish_type,
      fat: data.fat,
      flavor_tags: data.flavor_tags,
      image_url: data.image_url,
      ingredients: data.ingredients,
      is_best_seller: data.is_best_seller,
      meal_type: data.meal_type,
      name: data.name,
      occasion: data.occasion,
      pairs_well_with: data.pairs_well_with,
      portion_size: data.portion_size,
      prep_time: data.prep_time,
      price: data.price,
      protein: data.protein,
      rating: data.rating,
      review_count: data.review_count,
      serves:data.serves,
      spice_level: data.spice_level,
      taste_profile: data.taste_profile
    }
    docs.push(item);
  })
  return docs;
}