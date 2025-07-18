"use client"
import { useState, useEffect, useRef } from "react";
import TopNav from "../components/topnav";
import Navbar from "../components/leftnav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolderPlus, faSearch, faChevronDown, faChevronUp, faCheck, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import FoodItem from "./FoodItem";
import FilterButton from "./FilterButton";
import Image from "next/image";
import FoodItemData, { FoodItemStructure, FoodItemDetails } from "./FoodItemDetails";

const items = new FoodItemDetails();
const status = items.status, types = items.types, bulkActions = items.bulkActions, categories = items.categories;

export default function Home() {

  const [currentItems, setCurrentItems] = useState<FoodItemStructure[]>(items.getData());
  const [page, setPage] = useState(1);
  const [pageParam, setPageParam] = useState("1");
  const [paginationValue, setPaginationValue] = useState<number>(5);
  const [isPaginationClicked, setIsPaginationClicked] = useState(false);
  const [maxpage, setNewPages] = useState(Math.round(currentItems.length/paginationValue) + (currentItems.length/paginationValue === Math.round(currentItems.length/paginationValue) ? 0 : 1));
  const [openStates, setOpenStates] = useState<boolean[]>([false]);
  const [filters, setFilters] = useState({category: "All Categories", status: "All Items", type: "All Types"})
  const [searchParam, setNewSearchParam] = useState<string>("");
  const [selectItemsIndex, setSelectItemsIndex] = useState<number[]>([]);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [isBulkActionSelected, setIsBulkActionSelected] = useState<boolean>(false);
  const [selectedBulkAction, setSelectedBulkAction] = useState(0);

  const dropDownRefs = useRef<(HTMLDivElement| null)[]>([]);
  const inputRef = useRef<(HTMLInputElement | null)>(null);
  const bulkActiondropdownRef = useRef<(HTMLDivElement|null)>(null);
  const paginationdropdownRef = useRef<(HTMLDivElement|null)>(null);

  const startElem = paginationValue * (page - 1) + 1;
  const endElem = paginationValue * (page - 1) + Math.min(paginationValue, Math.abs(currentItems.length - (paginationValue * (page - 1))));

  const shouldAddExtra = (newItems : FoodItemStructure[]) => 
    (newItems.length/5 === Math.floor(newItems.length/paginationValue) ? 0 : 1)

  // Function to check if all the display items are selected
  const checkAllSelected = () => {
    let cnd = currentItems.every(item => selectItemsIndex.includes(item.itemno))
    return cnd;
  }

  //To register the handleClickOutside functions for the open-dropdown
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

  // Function to close dropdown on clicking outside for filters
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

    //Function to close status modification drop-down
  const handleClickOutModify = (e : MouseEvent) =>
      (bulkActiondropdownRef.current && !bulkActiondropdownRef.current.contains(e.target as Node)) ? setIsBulkActionSelected(false) : "";

  //Function to close pagination dropdown
  const handleClickOutPagination = (e: MouseEvent) =>
    (paginationdropdownRef.current && !paginationdropdownRef.current.contains(e.target as Node)) ? setIsPaginationClicked(false) : "";

  // To get items based on search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { 
      let newItems : FoodItemStructure[] = items.getItemsBySearch(searchParam);
      setCurrentItems(() => newItems);
      setNewPages(Math.floor(newItems.length/paginationValue) +shouldAddExtra(newItems));
      setFilters({category: "All Categories", status: "All Items", type: "All Types", });
      setPage(1);
      setPageParam("1");
    }
  }

  // To get filtered data
  const handleFilterChange = (key: string, value: string, index:number) => {
    let newFilter, newItems : FoodItemStructure[];
    setFilters(prev => {
      newFilter = {...prev, [key]:value};
      newItems = items.getFilterData(showOnlySelected ? items.getSelectedData(selectItemsIndex) : items.getData(), newFilter.category, newFilter.status, newFilter.type);
      setCurrentItems(newItems);
      setNewPages(Math.floor(newItems.length/paginationValue) + shouldAddExtra(newItems));
      setPage(1);
      setPageParam("1");
      setNewSearchParam("");
      return newFilter;
    })
    toggleDropdown(index);
  }
  // useEffect(() => {
  //   if (showOnlySelected){
  //     let newItems : FoodItemStructure[] = items.getSelectedData(selectItemsIndex);
  //     setCurrentItems(newItems);
  //     setNewPages(Math.round(newItems.length/paginationValue) + shouldAddExtra(newItems));
  //     setFilters({category: "All Categories", status: "All Items", type: "All Types"})
  //     setPage(1);
  //     setPageParam("1");
  //   }
  // }, [selectItemsIndex]);

  // To remove all the filters and fetch all the items
  const removeFilter = () => {
    setFilters({category: "All Categories", status: "All Items", type: "All Types"})
    setCurrentItems(showOnlySelected ? items.getSelectedData(selectItemsIndex) : items.getData());
    setPage(1);
    setPageParam("1");
  }

  // To change pagination value
  const changePagination = (value : number) => {
    setPaginationValue(value);
    setIsPaginationClicked(false);
    if(value <= currentItems.length) 
      setNewPages(Math.round(currentItems.length/value) + shouldAddExtra(currentItems));
    else setNewPages(1);
    setPage(1);
    setPageParam("1");
  }  

  // Editing item from actions
  const editData = (fnCode: number, index: number) => {
    if (fnCode === 1) items.toggleAvailability(index);
    else if (fnCode === 2) items.deleteItem(index);
    setCurrentItems(showOnlySelected ? items.getSelectedData(selectItemsIndex) : items.getData());
    setCurrentItems(items.getData());
    setNewPages(Math.round(currentItems.length/paginationValue) + shouldAddExtra(currentItems));
    setFilters(prev=> ({category: prev.category, status: prev.status, type: prev.type, }));
  }
  
  // To apply bulk actions
  const applyBulkAction = () =>{
    const select = bulkActions[selectedBulkAction];
    if (select === "Mark as Available") items.toggleBulkAvailability(0, selectItemsIndex);
    else if (select === "Mark as Unavailable") items.toggleBulkAvailability(1, selectItemsIndex);
    else if (select === "Delete selected") items.deleteBulkItems(selectItemsIndex);
    setCurrentItems(items.getData());
    setNewPages(Math.round(currentItems.length/paginationValue) + shouldAddExtra(currentItems));
    setFilters(prev=> ({category: prev.category, status: prev.status, type: prev.type, }));
    setSelectItemsIndex([]);
    setSelectedBulkAction(0);
  } 
  
  // Handling selected items
  const changeSelectedItems = (itemno: number) =>{
    let newIndices, newItems;
    setSelectItemsIndex(prev => {
      newIndices = prev.includes(itemno) ? prev.filter(elem => elem != itemno) : [...prev, itemno];
      console.log(newIndices);
      newItems = items.getSelectedData(newIndices);
      if(showOnlySelected) setCurrentItems(newItems);
      setNewPages(Math.round(newItems.length/paginationValue) + shouldAddExtra(newItems));
      setFilters({category: "All Categories", status: "All Items", type: "All Types"})
      setPage(1);
      setPageParam("1");
      return newIndices;
    });
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
      if (parseInt(pageParam) > maxpage || parseInt(pageParam) <= 0) setPageParam(`${page}`) ;
      else {
        setPage(parseInt(pageParam));
        const element = document.getElementById("page-top");
        if (element) element.scrollTop = 0;
      }
    }
  }

  // Toggling the select all
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

  //Toggle between all data and selected data
  const showOnlySelectedData = () => {
    let newItems : FoodItemStructure[] = (!showOnlySelected) ? items.getSelectedData(selectItemsIndex)
    : items.getData();
    setCurrentItems(newItems);
    setNewPages(Math.round(newItems.length/paginationValue) + shouldAddExtra(newItems));
    setFilters({category: "All Categories", status: "All Items", type: "All Types"})
    setPage(1);
    setPageParam("1");
    setShowOnlySelected(prev => !prev);
  }

  //Function to toggle the drop-down for bulk actions when the button is clicked again
  const toggleDropdown = (index: number) =>
    setOpenStates((prev : boolean[]) => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    })

  return (
    <div>
      <TopNav useSave={true}/>
      <main className="flex flex-wrap w-full dark:text-black">
        <Navbar />
        {/* Page */}

        <div id="page-top" className="max-h-[80vh] overflow-auto scrollable w-5/6 font-[family-name:var(--font-geist-sans)] flex flex-col gap-5 bg-gray-100 px-5 py-10 text-[20px]">
          {/* Top */}
          <div className="w-full flex justify-between items-center">
            <p className="text-[25px] font-semibold">Menu Management</p>
            <div className="flex gap-5">
              <button className="bg-blue-700 text-white rounded-[5px] border-1 cursor-pointer border-[rgba(0,0,0,0.2)] pr-4 py-2"><FontAwesomeIcon icon={faPlus} className="px-4"></FontAwesomeIcon>Add item</button>
              <button className="bg-white rounded-[5px] border-1 cursor-pointer border-[rgba(0,0,0,0.2)] pr-4 py-2"><FontAwesomeIcon icon={faFolderPlus} className="px-4"></FontAwesomeIcon>Manage categories</button>
            </div>
          </div>

          {/* Filters*/}
          <div className="flex justify-between items-center w-full bg-white px-4 rounded-[7.5px] border-1 border-[rgba(0,0,0,0.1)] gap-4">
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
              {/* Spec filters */}
              <FilterButton dropDownRefs={dropDownRefs} filterIndex={0} toggleDropdown={toggleDropdown} selectedBulkAction={filters.category} openStates={openStates} data={categories} filter="category" handleValueChange={handleFilterChange}/>
              <FilterButton dropDownRefs={dropDownRefs} filterIndex={1} toggleDropdown={toggleDropdown} selectedBulkAction={filters.status} openStates={openStates} data={status} filter="status" handleValueChange={handleFilterChange}/>
              <FilterButton dropDownRefs={dropDownRefs} filterIndex={2} toggleDropdown={toggleDropdown} selectedBulkAction={filters.type} openStates={openStates} data={types} filter="type" handleValueChange={handleFilterChange}/>
            </div>
          </div>

          {/* Select and modify feature */}
          <div className="w-full bg-white py-4 px-5 rounded-[7.5px] border-1 border-[rgba(0,0,0,0.1)] flex items-center gap-5">
            <div className="w-1/5 flex gap-3 items-center">
              <div>{selectItemsIndex.length === 0 ? "No items selected" : selectItemsIndex.length === 1 ? "1 item selected" : `${selectItemsIndex.length} items selected`}</div>
            </div>
            
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
              <button className="w-1/4 bg-red-200 text-red-500 rounded-[5px] px-2 py-1 cursor-pointer" onClick={() => setSelectItemsIndex([])}>Cancel selection</button>
            </div>                        
          </div>

          {/* Items table*/}
          <div className="w-full bg-white rounded-[7.5px] border-1 border-[rgba(0,0,0,0.1)]">
            {/* Navigation configurations */}
            <div className="border-b-1 border-[rgba(0,0,0,0.1)] w-full py-5 px-5 flex justify-between">
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
                <FoodItem data={currentItems[paginationValue * (page - 1) + index]} key = {paginationValue * (page - 1) + index} ordered={selectItemsIndex} changeSelectedItems={changeSelectedItems} dataEdit={editData}/>
              ))}
              <div className="py-2 px-10 w-full flex items-center justify-between">
                <div className="text-gray-500">
                  {(startElem != endElem) ? `Showing ${startElem} to ${endElem} of ${currentItems.length} results` : `Showing ${endElem} of ${currentItems.length} results`}
                </div>
                <div className="flex gap-1">
                  <button className={`cursor-pointer border-2 border-gray-300 p-1 px-2 rounded-[5px] ${page === 1 ? "text-gray-400 pointer-events-none" : ""}`} onClick={() => {handlePageChange(-1)}}>Previous</button>
                  <input type="text" className="w-10 text-center border-2 rounded-[5px] border-gray-300 hover:border-blue-500 focus:outline-none" value={pageParam} onChange={(e) => setPageParam(e.target.value)} onKeyDown={navigateToPage}/>
                  <button className={`cursor-pointer border-2 border-gray-300 p-1 px-2 rounded-[5px] ${page === maxpage ? "text-gray-400 pointer-events-none" : ""}`} onClick={() => {handlePageChange(1)}}>Next</button>
                </div>
              </div>
            </div>
            :
            <div className="w-full flex flex-col items-center p-10">
              <Image src="/chef-duck.jpg" width={300} height={300} className="grayscale opacity-[0.4]" alt="no-duck"/>
              <p className="text-gray-400 text-[40px]">Oops! We can't find any dish for you...</p>
            </div>
            } 
          </div>
        </div>
      </main>
    </div>
  );
}
