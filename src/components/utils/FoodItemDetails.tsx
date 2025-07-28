import { fooditem } from "../types/fooditem";
import { MenuItem } from "../types/menuTypes";

export class FoodItemDetails{
  dbdata : fooditem[];
  categories : string[] = [];
  status : string[] = ["Available", "Unavailable", "Bestseller", "Trending"];
  types : string[] = ["Vegetarian","Non-Vegetarian", "Vegan", "Jain"];
  bulkActions : string[] = ["Delete selected", "Mark as Available", "Mark as Unavailable"];
  
  constructor(){
    this.dbdata = [];
    this.categories = [];
    this.types = [];
  }

  setDBdata(data : fooditem[], categories: string[], types: string[]){
    this.dbdata = data;
    this.categories = categories;
    this.types = types;
  }

  getData() : fooditem[] {
    return this.dbdata;
  }

  getSelectedData(ids : string[]) : fooditem[]{
    let selecteditems = this.dbdata.filter(menuitem => ids.includes(menuitem.id));
    console.log(selecteditems);
    return selecteditems;
  }

  getItemByIndex(id: string) : fooditem | null{
    return this.dbdata.find(menuitem => menuitem.id === id) || null;
  }

  getFilterData(currentItems : fooditem[], filters: {category: string, status: string, type: string}) : fooditem[]{
    const {category, status, type} = filters;
    let newItems : fooditem[] = currentItems;
    if (category != "All Categories") newItems = newItems.filter(elem => elem.dish_type === category);
    if (status === "Available") newItems = newItems.filter(elem => elem.available);
    else if (status === "Unavailable") newItems = newItems.filter(elem => !elem.available);
    else if (status === "Bestseller") newItems = newItems.filter(elem => elem.is_best_seller);
    if (type != "All Types") newItems = newItems.filter(elem => elem.diet === type);
    return newItems;
  }

  getItemsBySearch(searchParam: string) : fooditem[]{
    let newItems : fooditem[] = this.dbdata.filter(item => new RegExp(searchParam, "i").test(item.name));
    return newItems;
  }

  toggleAvailability(id: string) : void{
    this.dbdata = this.dbdata.map(menuitem => {
      if (menuitem.id === id){
        menuitem.available = !menuitem.available;
        menuitem.is_best_seller = menuitem.available ? menuitem.is_best_seller : false;
      }
      return menuitem;
    })   
  }

  toggleBulkAvailability(opCode: number, selectedIDs: string[]) : void{
    if (opCode === 0){
      this.dbdata = this.dbdata.map(menuitem => {
        menuitem.available = selectedIDs.includes(menuitem.id) ? true : menuitem.available;
        return menuitem; 
      })
    }
    else{
      this.dbdata = this.dbdata.map(menuitem => {
        menuitem.available = selectedIDs.includes(menuitem.id) ? false : menuitem.available;
        menuitem.is_best_seller = false;
        return menuitem; 
      })
    }
  }

  deleteItem(id: string){
    this.dbdata = this.dbdata.filter(menuitem => menuitem.id != id);
  }

  deleteBulkItems(selectedIDs: string[]){
    this.dbdata = this.dbdata.filter(menuitem => !selectedIDs.includes(menuitem.id));
  }

  // addData(item : MenuItem) : void{
  //   let newItem : FoodItemStructure = {
  //     imgsrc : item.itemImage, 
  //     itemVideo: item.itemVideo, 
  //     itemdesc : item.description, 
  //     itemname: item.itemName, 
  //     itemno: this.data.length, 
  //     status : [], 
  //     type : item.itemType, 
  //     category: item.category, 
  //     price: item.price, 
  //     spiceLevel: item.spiceLevel, 
  //     allergens: {
  //       hasNuts : item.allergens.hasNuts,
  //       hasDiary : item.allergens.hasDiary,
  //       hasGluten : item.allergens. hasGluten,
  //       hasSeaFood : item.allergens.hasSeaFood
  //     }, backstory : item.backstory, ingredients: item.ingredients,
  //     discount : (item.discount === undefined) ? 0 : item.discount,
  //   }; 
  //   newItem.discount = (item.discount === undefined) ? 0 : item.discount;
  //   if (item.isBestseller != undefined && item.isBestseller) newItem.status.push("Bestseller");
  //   if (item.isTrending != undefined && item.isTrending) newItem.status.push("Trending");
  //   (item.availability) ? newItem.status.push("Available") : newItem.status.push("Unavailable");
  //   console.log(item, newItem);
  //   this.data.push(newItem);
  // }

  applyNewCategories(categories: string[]){
    this.categories = categories;
    this.dbdata = this.dbdata.filter(menuitem => categories.includes(menuitem.dish_type));
  }

  // updateData(existingItem : {item : MenuItem, index: number}) : void{
  //   const {item, index} = existingItem;
  //   let newItem : FoodItemStructure = {
  //     imgsrc : item.itemImage, 
  //     itemVideo: item.itemVideo, 
  //     itemdesc : item.description, 
  //     itemname: item.itemName, 
  //     itemno: index, 
  //     status : [], 
  //     type : item.itemType, 
  //     category: item.category, 
  //     price: item.price, 
  //     spiceLevel: item.spiceLevel, 
  //     allergens: {
  //       hasNuts : item.allergens.hasNuts,
  //       hasDiary : item.allergens.hasDiary,
  //       hasGluten : item.allergens. hasGluten,
  //       hasSeaFood : item.allergens.hasSeaFood
  //     }, backstory : item.backstory, ingredients: item.ingredients,
  //     discount : (item.discount === undefined) ? 0 : item.discount,
  //   }; 
  //   newItem.discount = (item.discount === undefined) ? 0 : item.discount;
  //   if (item.isBestseller != undefined && item.isBestseller) newItem.status.push("Bestseller");
  //   if (item.isTrending != undefined && item.isTrending) newItem.status.push("Trending");
  //   (item.availability) ? newItem.status.push("Available") : newItem.status.push("Unavailable");
  //   this.data[index] = newItem;
  // }
}
