"use client"
import { useState, useEffect, useRef } from "react";
import TopNav from "../../components/navbar/topnav"
import Navbar from "../../components/navbar/leftnav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolderPlus, faSearch, faChevronDown, faChevronUp, faCheck, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import FoodItem from "./FoodItem";
import FilterButton from "./FilterButton";
import Image from "next/image";
import { FoodItemStructure, FoodItemDetails } from "../../components/utils/FoodItemDetails";
import ManageCategories from "../../components/forms/ManageCategories";
import { MenuItem } from "../../components/types/menuTypes";
import AddMenuItemForm from "../../components/forms/AddItemForm";
import {ConfirmationPopup, DeleteBulkPopup} from "../../components/utils/ConfirmationPopup";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { fooditem } from "@/components/types/fooditem";

const items = new FoodItemDetails()
let status = ["All Items", ...FoodItemDetails.status], types : string[] = ["All Types", ...FoodItemDetails.types];
let bulkActions : string[] = FoodItemDetails.bulkActions, categoriesFilter : string[] = ["All Categories",...FoodItemDetails.categories];

export default function Home() {

  const [currentItems, setCurrentItems] = useState<FoodItemStructure[]>([]);
  const [page, setPage] = useState(1);
  const [pageParam, setPageParam] = useState("1");
  const [paginationValue, setPaginationValue] = useState(5);
  const [isPaginationClicked, setIsPaginationClicked] = useState(false);
  const [openStates, setOpenStates] = useState<boolean[]>([false]);
  const [filters, setFilters] = useState({category: "All Categories", status: "All Items", type: "All Types"})
  const [searchParam, setNewSearchParam] = useState<string>("");
  const [selectItemsIndex, setSelectItemsIndex] = useState<number[]>([]);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [isBulkActionSelected, setIsBulkActionSelected] = useState<boolean>(false);
  const [selectedBulkAction, setSelectedBulkAction] = useState(0);
  const [showManagePopup, setShowManagePopup] = useState(false);
  const [categories, setCategories] = useState<string[]>(categoriesFilter);
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [bulkDeletePopup, setBulkDeletePopup] = useState(false);
  const [existingItem, setExistingItem] = useState<({item : MenuItem, index : number} | null)>(null);
  const [itemToDelete, changeItemToDelete] = useState<number>(-1);

  const dropDownRefs = useRef<(HTMLDivElement| null)[]>([]);
  const inputRef = useRef<(HTMLInputElement | null)>(null);
  const bulkActiondropdownRef = useRef<(HTMLDivElement|null)>(null);
  const paginationdropdownRef = useRef<(HTMLDivElement|null)>(null);

  const startElem = currentItems.length == 0 ? 0 : paginationValue * (page - 1) + 1;
  const endElem = currentItems.length === 0 ? 0 : paginationValue * (page - 1) + Math.min(paginationValue, Math.abs(currentItems.length - (paginationValue * (page - 1))));
  const maxPage = Math.floor(currentItems.length/paginationValue) + (currentItems.length/paginationValue === Math.floor(currentItems.length/paginationValue) ? 0 : 1);

  // Function to check page addition parameter
  const shouldAddExtra = (newItems : FoodItemStructure[]) => 
    (newItems.length/paginationValue === Math.floor(newItems.length/paginationValue) ? 0 : 1)
  
  // Function to check if all the display items are selected 
  //subject to change
  const checkAllSelected = () =>
    currentItems.every(item => selectItemsIndex.includes(item.itemno))

  useEffect(() => {
    const getDocuments = async () => {
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
      console.log("Before update",docs);
      items.setDBdata(docs);
      console.log(items.getItemsBySearchModified("p"));
    }
    getDocuments();
    setCurrentItems(items.getData());
    setPage(1);
  }, [])

  // Page change when All items in the page are deleted
  useEffect(() => {
    if (startElem > endElem) {
      handlePageChange(-1);
    }
  },[currentItems])

  useEffect(() => {
    console.log(currentItems.length);
    console.log(startElem, endElem);
  })

  //To register the handle click outside functions for the filter dropdowns
  useEffect(() => {
    const handlers =  openStates.map((isOpen, index) => {
      if (isOpen){
        document.addEventListener("mousedown", handleClickOutside(index));
        return handleClickOutside(index);
      }
      return null;
    });

    return () => {
      handlers.forEach(handler => {
        if (handler) document.removeEventListener("mousedown", handler);
      })
    }
  }, [openStates]);

  //To register handle click outside for bulk action drop-down
  useEffect(() => {
    if (isBulkActionSelected) document.addEventListener("mousedown", handleClickOutModify)
    return () => document.removeEventListener("mousedown", handleClickOutModify);
  }, [isBulkActionSelected]);
  
  // To register handle click outside for pagination dropdown
  useEffect(() => {
    if (isPaginationClicked) document.addEventListener("mousedown", handleClickOutPagination);
    return () => document.removeEventListener("mousedown", handleClickOutPagination);
  }, [isPaginationClicked]);

  // Function to close filters dropdown
  const handleClickOutside = (index: number) => 
    (e : MouseEvent) => {
      const target = e.target as Node;
      const currentRef = dropDownRefs.current[index];

      if (currentRef && !currentRef.contains(target)) 
        setOpenStates ((prev: boolean[]) => {
          const newArr = [...prev];
          newArr[index] = false;
          return newArr;
        })
      }

  // Function to close bulk action drop-down
  const handleClickOutModify = (e : MouseEvent) =>
      (bulkActiondropdownRef.current && !bulkActiondropdownRef.current.contains(e.target as Node)) ? setIsBulkActionSelected(false) : "";

  // Function to close pagination dropdown
  const handleClickOutPagination = (e: MouseEvent) =>
    (paginationdropdownRef.current && !paginationdropdownRef.current.contains(e.target as Node)) ? setIsPaginationClicked(false) : "";

   //Function to toggle the drop-down for filters
  const toggleDropdown = (index: number) =>
    setOpenStates((prev : boolean[]) => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    })

  // To get items based on search
  //subject to change
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { 
      let newItems : FoodItemStructure[] = items.getItemsBySearch(searchParam);
      if (showOnlySelected) newItems = newItems.filter(item => selectItemsIndex.includes(item.itemno));
      setCurrentItems(newItems);
      setFilters({category: "All Categories", status: "All Items", type: "All Types" });
      setPage(1);
      setPageParam("1");
    }
  }

  // To get filtered data
  //subject to change
  const handleFilterChange = (key: string, value: string, index:number) => {
    let newFilter, newItems : FoodItemStructure[];
    setFilters(prev => {
      newFilter = {...prev, [key]:value};
      newItems = items.getFilterData(showOnlySelected ? items.getSelectedData(selectItemsIndex) : items.getData(), newFilter);
      setCurrentItems(newItems);
      setPage(1);
      setPageParam("1");
      setNewSearchParam("");
      return newFilter;
    })
    toggleDropdown(index);
  }

  // To remove all the filters 
  //subject to change
  const removeFilter = () => {
    setFilters({category: "All Categories", status: "All Items", type: "All Types"})
    setCurrentItems(() => {
      let newItems = items.getData();
      if (showOnlySelected) newItems = newItems.filter(item => selectItemsIndex.includes(item.itemno));
      return newItems;
    });
    setPage(1);
    setPageParam("1");
  }

  //Toggle between all data and selected data
  //subject to change
  const showOnlySelectedData = () => {
    let newItems : FoodItemStructure[];
    if(searchParam === "") newItems = items.getFilterData((!showOnlySelected) ? items.getSelectedData(selectItemsIndex)
    : items.getData(), filters);
    else {
      newItems = items.getItemsBySearch(searchParam);
      if (!showOnlySelected) newItems = newItems.filter(item => selectItemsIndex.includes(item.itemno)); 
    }
    setCurrentItems(newItems);
    setPage(1);
    setPageParam("1");
    setShowOnlySelected(prev => !prev);
  }

  // Editing individual item from actions
  //subject to change
  const editData = (fnCode: number, itemno: number) => {
    if (fnCode === 0) handleEditItem(items.getItemByIndex(itemno));
    if (fnCode === 1) items.toggleAvailability(itemno);
    else if (fnCode === 2) {
      items.deleteItem(itemno);
      setSelectItemsIndex(prev => {
        let next = prev.filter(index => index != itemno);
        console.log(next);
        return next;
      })
      changeItemToDelete(-1);
      setDeletePopup(false);
    }
    setCurrentItems(() => {
      let newItems: FoodItemStructure[];
      if (searchParam === "") newItems = items.getFilterData(items.getData(), filters);
      else newItems = items.getItemsBySearch(searchParam);
      return newItems;
    });
  }
  
  // To apply bulk actions
  //subject to change
  const applyBulkAction = () =>{
    const select = bulkActions[selectedBulkAction];
    if (select === "Delete selected") setBulkDeletePopup(true);
    else {
      if (select === "Mark as Available") items.toggleBulkAvailability(0, selectItemsIndex);
      else if (select === "Mark as Unavailable") items.toggleBulkAvailability(1, selectItemsIndex);
      setCurrentItems(() => {
        let newItems :FoodItemStructure[];
        if (searchParam === "") newItems = items.getFilterData(items.getData(),filters);
        else newItems = items.getItemsBySearch(searchParam);
        // setNewPages(() => {
        //   let newPages = Math.floor(newItems.length/paginationValue) + shouldAddExtra(newItems);
        //   if (page > newPages){
        //     setPage(newPages); 
        //     setPageParam(`${newPages}`);
        //   }
        //   return newPages;
        // });
        let newPages = Math.floor(newItems.length/paginationValue) + shouldAddExtra(newItems);
        if (page > newPages){
          setPage(newPages); 
          setPageParam(`${newPages}`);
        }
        return newItems
      });
      setSelectItemsIndex([]);
      setSelectedBulkAction(0);
    }
  } 

  //subject to change
  const confirmDelete = (itemno : number) => {
    setDeletePopup(true);
    console.log(itemno);
    changeItemToDelete(itemno);
  }

  //subject to change
  const deleteBulkItems = () => {
    items.deleteBulkItems(selectItemsIndex);
    setCurrentItems(() => {
      let newItems :FoodItemStructure[];
      if (searchParam === "") newItems = items.getFilterData(items.getData(),filters);
      else newItems = items.getItemsBySearch(searchParam);
      // setNewPages(() => {
      //   let newPages = Math.floor(newItems.length/paginationValue) + shouldAddExtra(newItems);
      //   if (page > newPages){
      //     setPage(newPages); 
      //     setPageParam(`${newPages}`);
      //   }
      //   return newPages;
      // });
      let newPages = Math.floor(newItems.length/paginationValue) + shouldAddExtra(newItems);
      if (page > newPages){
        setPage(newPages); 
        setPageParam(`${newPages}`);
      }
      //setPage(1);
      return newItems
    });
    setSelectItemsIndex([]);
    setSelectedBulkAction(0);
  }

  // To handle save categories
  //subject to change
  const handleSaveCategories = (newCategories: { id: string, name: string }[]) => {
    setCategories(() => {
      let editedCategories = newCategories.map(cat => cat.name);
      items.applyNewCategories(editedCategories);
      return ["All Categories",...editedCategories];
    });
    setFilters(prev => {
      let newFilters = {category: "All Categories", status: prev.status, type: prev.type};
      setCurrentItems(() => {
        let newItems = items.getData();
        if (searchParam === "") newItems = items.getFilterData(newItems, newFilters);
        else newItems = items.getItemsBySearch(searchParam);
        if (showOnlySelected) newItems = newItems.filter(item => selectItemsIndex.includes(item.itemno));
        return newItems;
      })
      return newFilters;
    })
    
    setShowManagePopup(false);
  };

  // To save new item
  //subject to change
  const handleSaveItem = (item: MenuItem) => {
    console.log('Saved Item:', item);
    existingItem === null ? items.addData(item) : items.updateData({item : item, index: existingItem.index});
    setExistingItem(null);
    setCurrentItems(() => {
      let newItems = items.getData();
      if (searchParam === "") newItems = items.getFilterData(newItems, filters);
      else newItems = items.getItemsBySearch(searchParam);
      if (showOnlySelected) newItems = newItems.filter(item => selectItemsIndex.includes(item.itemno));
      return newItems;
    })
    setShowAddItemPopup(false);
  }

  //subject to change
  const handleEditItem = (item : FoodItemStructure) =>{
    let menuItem : MenuItem = {
      itemName : item.itemname,
      price: item.price,
      discount: item.discount,
      category: item.category,
      itemImage: item.imgsrc,
      itemType: item.type,
      itemVideo : item.itemVideo,
      spiceLevel: item.spiceLevel,
      allergens: item.allergens,
      isBestseller : item.status.includes("Bestseller"),
      isTrending: item.status.includes("Trending"),
      availability: item.status.includes("Available"),
      description : item.itemdesc,
      backstory: item.backstory,
      ingredients: item.ingredients
    }
    setExistingItem({item : menuItem, index: item.itemno});
    setShowAddItemPopup(true);
  }
  
  // Toggling the select all
  //aubject to change
  const toggleSelectAll = () => 
    (currentItems.length > 0 && checkAllSelected()) ? 
    setSelectItemsIndex((prev) => {
      let oldIndex : number[] = [], oldItems : string[] = [];
      currentItems.forEach(item => {
        if (selectItemsIndex.includes(item.itemno)) {oldIndex.push(item.itemno); oldItems.push(item.itemname)}; 
      })
      let newIndex = prev.filter(index => !oldIndex.includes(index));
      return newIndex;
    }) : 
    setSelectItemsIndex(currentItems.map(item => item.itemno));

  // Handling selected items
  //subject to change
  const changeSelectedItems = (itemno: number) =>{
    let newIndices;
    setSelectItemsIndex(prev => {
      newIndices = prev.includes(itemno) ? prev.filter(elem => elem != itemno) : [...prev, itemno];
      if (showOnlySelected) setCurrentItems(items.getSelectedData(newIndices));
      console.log(newIndices);
      return newIndices;
    });
  }

 
  // To change pagination value
  const changePagination = (value : number) => {
    setPaginationValue(value);
    setIsPaginationClicked(false);
    setPage(1);
    setPageParam("1");
  }  

  //To change page
  const handlePageChange = ( step: number) => {
    setPage(prev => {
      setPageParam(`${prev + step}`);
      return prev + step
    });
    const element = document.getElementById("page-top");
    if (element) element.scrollTop = 0;
  }

  //Navigating to any page
  const navigateToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter"){
      if (parseInt(pageParam) > maxPage || parseInt(pageParam) <= 0) setPageParam(`${page}`) ;
      else {
        setPage(parseInt(pageParam));
        const element = document.getElementById("page-top");
        if (element) element.scrollTop = 0;
      }
    }
  }

  const cancelSelection = () => {
    setSelectItemsIndex([]);
    if (showOnlySelected) setCurrentItems([]);
  }

  return (
    <div className="relative">
      <div className="z-0">
        <TopNav useSave={true}/>
        <main className="flex flex-wrap w-full dark:text-black">
          <Navbar />
          {/* Page */}
          <div id="page-top" className="max-h-[80vh] overflow-auto scrollable w-5/6 font-[family-name:var(--font-geist-sans)] flex flex-col gap-5 bg-gray-100 px-5 py-10 text-[20px]">
            {/* Top */}
            <div className="w-full flex justify-between items-center">
              <p className="text-[25px] font-semibold">Menu Management</p>
              <div className="flex gap-5">
                <button className="bg-blue-700 text-white rounded-[5px] border-1 cursor-pointer border-[rgba(0,0,0,0.2)] pr-4 py-2" onClick={() => setShowAddItemPopup(true)}><FontAwesomeIcon icon={faPlus} className="px-4"></FontAwesomeIcon>Add item</button>
                <button className="bg-white rounded-[5px] border-1 cursor-pointer border-[rgba(0,0,0,0.2)] pr-4 py-2" onClick={() => setShowManagePopup(true)}><FontAwesomeIcon icon={faFolderPlus} className="px-4"></FontAwesomeIcon>Manage categories</button>
              </div>
            </div>

            {/* Filters*/}
            <div className="flex justify-between items-center w-full bg-white px-4 rounded-[7.5px] border-1 border-[rgba(0,0,0,0.1)] gap-4">
              {/*Clear filters option */}
              {(filters.category!= "All Categories" || filters.status != "All Items" || filters.type != "All Types" || searchParam != "") && 
              <div className="w-1/7 h-full p-2 flex items-center gap-2">
                <div className="w-fit h-fit p-2 py-1 flex items-center gap-2 bg-gray-300 text-gray-500 text-[15px] rounded-[7.5px]">
                  <FontAwesomeIcon icon={faXmark} className="cursor-pointer" onClick={() => {setNewSearchParam(""); removeFilter()}}></FontAwesomeIcon><p>clear filters</p>
                </div>
                <div className="w-1/10 h-2/3 border-r-1 border-gray-200"></div>
              </div>}

              <div className="w-6/7 flex flex-1 justify-between py-4">
                {/* Filter by search */}
                <div className="border-1 border-[rgba(0,0,0,0.1)] px-2 py-2 rounded-[5px]">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400 px-2"></FontAwesomeIcon>
                  <input type="text" ref={inputRef} placeholder="Search items" className="focus:outline-none" value={searchParam} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSearchParam(()=> e.target.value)} onKeyDown={handleKeyDown}/>
                </div>
                {/* Specific filters */}
                <FilterButton dropDownRefs={dropDownRefs} filterIndex={0} toggleDropdown={toggleDropdown} selectedBulkAction={filters.category} openStates={openStates} data={categories} filter="category" handleValueChange={handleFilterChange}/>
                <FilterButton dropDownRefs={dropDownRefs} filterIndex={1} toggleDropdown={toggleDropdown} selectedBulkAction={filters.status} openStates={openStates} data={status} filter="status" handleValueChange={handleFilterChange}/>
                <FilterButton dropDownRefs={dropDownRefs} filterIndex={2} toggleDropdown={toggleDropdown} selectedBulkAction={filters.type} openStates={openStates} data={types} filter="type" handleValueChange={handleFilterChange}/>
              </div>
            </div>

            {/* Select and modify feature */}
            <div className="w-full bg-white py-4 px-5 rounded-[7.5px] border-1 border-[rgba(0,0,0,0.1)] flex items-center gap-5">
              {/* No of items selected*/}
              <div className="w-1/5 flex gap-3 items-center">
                <div>{selectItemsIndex.length === 0 ? "No items selected" : selectItemsIndex.length === 1 ? "1 item selected" : `${selectItemsIndex.length} items selected`}</div>
              </div>
              {/* Applying bulk actions */}
              <div className={`w-3/5 justify-between flex items-center ${selectItemsIndex.length === 0 ? "grayscale opacity-[0.5] pointer-events-none cursor-not-allowed" : ""}`}>            
                <div className="relative w-2/5" ref={bulkActiondropdownRef}>
                  <button className="bg-white w-full border border-gray-300 rounded px-4 py-2 text-left flex justify-between gap-2 items-center focus:outline-none  hover:border-blue-500" onClick={() => setIsBulkActionSelected(prev => !prev)}>{bulkActions[selectedBulkAction]}
                    <FontAwesomeIcon icon={isBulkActionSelected ? faChevronUp : faChevronDown}></FontAwesomeIcon>
                  </button>
                  {isBulkActionSelected && 
                  <ul className="absolute bg-gray-100 z-10 w-full border text-[15px] border-gray-300 rounded shadow-md max-h-60 overflow-auto">
                    {bulkActions.map((value, index) => (
                      <div key={index} className="flex border-b border-gray-300 hover:bg-blue-100 items-center gap-2 cursor-pointer" onClick={() => {setIsBulkActionSelected(false); setSelectedBulkAction(index)}}>
                      <span className=" ml-4 w-5">{selectedBulkAction === index ? <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> : " "}</span>
                      <li key={index} className=" py-2">{value}</li>
                      </div> 
                    ))}
                  </ul>
                  }
                </div>
                <button className="w-1/8 bg-gray-200 rounded-[2.5px] px-2 py-1 cursor-pointer" onClick={() => applyBulkAction()}>Apply</button>
                <button className="w-1/4 bg-red-200 text-red-500 rounded-[5px] px-2 py-1 cursor-pointer" onClick={() =>  {setSelectItemsIndex([]);if (showOnlySelected) setCurrentItems([]);}}>Cancel selection</button>
              </div>                        
            </div>

            {/* Items table*/}
            <div className="w-full bg-white rounded-[7.5px] border-1 border-[rgba(0,0,0,0.1)]">
              {/* Navigation configurations */}
              <div className="border-b-1 border-[rgba(0,0,0,0.1)] w-full py-5 px-5 flex justify-between">
                  {/*Items per page configuration */}
                  <div className="flex items-center gap-2 w-1/4">
                    <p className="w-1/2">Items per page</p>
                    <div className="relative w-1/4" ref={paginationdropdownRef}>
                      <button className="w-full flex items-center hover:border-blue-500 border-1 text-blue-500 border-gray-300 rounded-[2.5px] px-2 gap-3" onClick={() => setIsPaginationClicked(prev => !prev)}>
                        <p>{paginationValue}</p>
                        <FontAwesomeIcon icon={isPaginationClicked ? faChevronUp : faChevronDown}></FontAwesomeIcon>
                      </button>
                      {isPaginationClicked && 
                        <ul className="absolute bg-gray-100 z-10 w-full border text-[15px] border-gray-300 rounded shadow-md max-h-60 overflow-auto">
                        {[5, 10, 25, 50, 100].map((value, index) => (
                          <div key={index} className="flex border-b border-gray-300 hover:bg-blue-100 items-center gap-2 cursor-pointer px-2 py-1" onClick={() => changePagination(value)}>
                            <span className=" w-5">{paginationValue === value ? <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> : " "}</span>
                            <li>{value}</li>
                          </div>
                        ))}
                        </ul>
                      }
                    </div>
                  </div>
                  {/* Toggle only selected configuration*/}
                  <div>
                    Show only selected
                    <FontAwesomeIcon icon={showOnlySelected ? faToggleOn : faToggleOff} className="px-2" onClick={() => showOnlySelectedData()}></FontAwesomeIcon>
                  </div>
                </div>
              {/* Headings */}
              <div className="border-b-1 border-[rgba(0,0,0,0.1)] w-full py-4 px-5 text-gray-500 flex text-[15px]">
                <div className="w-1/40 flex items-center gap-2"><input type="checkbox" checked={currentItems.length > 0 && checkAllSelected()} onChange={() => toggleSelectAll()}/></div>
                <p className="w-1/4 text-center">Item</p>
                <p className="w-3/20">Category</p>
                <p className="w-1/5">Type</p>
                <p className="w-3/40">Price</p>
                <p className="w-1/10">Discount</p>
                <p className="w-1/4">Status</p>
                <p className="w-1/10">Actions</p>
              </div>
              {/* Items */}
              {currentItems.length > 0 
              ? 
              <div>
                {Array.from({length: endElem - startElem + 1}, (e, index) => (
                  <FoodItem data={currentItems[paginationValue * (page - 1) + index]} key = {paginationValue * (page - 1) + index} ordered={selectItemsIndex} changeSelectedItems={changeSelectedItems} dataEdit={editData} confirmDelete={confirmDelete}/>
                ))}
                <div className="py-2 px-10 w-full flex items-center justify-between">
                  <div className="text-gray-500">
                    {(startElem != endElem) ? `Showing ${startElem} to ${endElem} of ${currentItems.length} results` : `Showing ${endElem} of ${currentItems.length} results`}
                  </div>
                  <div className="flex gap-1">
                    <button className={`cursor-pointer border-2 border-gray-300 p-1 px-2 rounded-[5px] ${page === 1 ? "text-gray-400 pointer-events-none" : ""}`} onClick={() => {handlePageChange(-1)}}>Previous</button>
                    <input type="text" className="w-10 text-center border-2 rounded-[5px] border-gray-300 hover:border-blue-500 focus:outline-none" value={pageParam} onChange={(e) => setPageParam(e.target.value)} onKeyDown={navigateToPage}/>
                    <button className={`cursor-pointer border-2 border-gray-300 p-1 px-2 rounded-[5px] ${page === maxPage ? "text-gray-400 pointer-events-none" : ""}`} onClick={() => {handlePageChange(1)}}>Next</button>
                  </div>
                </div>
              </div>
              :
              <div className="w-full flex flex-col items-center p-10">
                {/* No item found configuration*/}
                <Image src="/chef-duck.jpg" width={300} height={300} className="grayscale opacity-[0.4]" alt="no-duck"/>
                <p className="text-gray-400 text-[40px]">Oops! We can't find any dish for you...</p>
              </div>
              } 
            </div>
          </div>
        </main>
      </div>
      {showManagePopup && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          {/* Translucent Background */}
          <div className="fixed inset-0 popup"></div>

          {/* Popup Box */}
          <ManageCategories 
            isOpen={showManagePopup}
            initialCategories={FoodItemDetails.categories.map((name, i) => ({ id: String(i), name }))}
            onSave={handleSaveCategories}
            onClose={() => setShowManagePopup(false)}
          />
        </div>
      )}
      {showAddItemPopup && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          {/* Translucent Background */}
          <div className="fixed inset-0 popup"></div>

          {/* Popup Box */}
          <AddMenuItemForm
            onSave={handleSaveItem}
            categories={FoodItemDetails.categories}
            onClose={() => {setShowAddItemPopup(false); setExistingItem(null);}}
            existingItem={existingItem != null ? existingItem.item : undefined}
          />

          {/* Popup for confirmation */}
        </div>
      )}
      { deletePopup && 
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="fixed inset-0 popup"></div>
          <ConfirmationPopup onConfirm={() => editData(2, itemToDelete)} onCancel={() => {setDeletePopup(false); changeItemToDelete(-1);}}/>
        </div>
      }
      {bulkDeletePopup &&
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="fixed inset-0 popup"></div>
          <DeleteBulkPopup onCancel={() => setBulkDeletePopup(false)} onConfirm={() => {deleteBulkItems();setBulkDeletePopup(false)}}/>
        </div>
      }
    </div>
  );
}
