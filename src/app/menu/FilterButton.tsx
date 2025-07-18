import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

type FilterButtonProps = {
    dropDownRefs : React.MutableRefObject<(HTMLDivElement | null)[]>,
    filterIndex : number
    toggleDropdown : (index: number) => void,
    selectedBulkAction : string,
    filter: string,
    openStates : boolean[],
    data : string[],
    handleValueChange : (key:string, value: string, index:number) => void
}

const FilterButton = ({dropDownRefs, filterIndex, toggleDropdown, selectedBulkAction, filter, openStates, data, handleValueChange} : FilterButtonProps) => {
    return (
    <div ref={(el) => {dropDownRefs.current[filterIndex] = el}} className="relative w-1/5">
        <button onClick={() => toggleDropdown(filterIndex)}
        className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-left
                flex justify-between items-center focus:outline-none  hover:border-blue-500">
        {selectedBulkAction}
        <FontAwesomeIcon icon={openStates[filterIndex] ? faChevronUp : faChevronDown}></FontAwesomeIcon>
        </button>
        {openStates[filterIndex] && <ul className="absolute bg-gray-100 z-10 w-full border text-[15px] border-gray-300 rounded shadow-md max-h-60 overflow-auto">
            {data.map((value, index) => (
                <div key={index} className="flex border-b border-gray-300 hover:bg-blue-100 items-center gap-2 cursor-pointer" onClick={() => handleValueChange(filter, value, filterIndex)}>
                <span className=" ml-4 w-5">{selectedBulkAction === value ? <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> : " "}</span>
                <li key={index} className=" py-2">{value}</li>
                </div> 
            ))}
        </ul>}
    </div>
    );
}

export default FilterButton;