import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faLeaf, faPenToSquare, faToggleOn, faDrumstickBite, faCarrot, faSeedling, faToggleOff } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { FoodItemStructure } from "../../components/utils/FoodItemDetails";

export default function FoodItem({data, ordered, changeSelectedItems, dataEdit} : {data:FoodItemStructure, ordered: number[], changeSelectedItems: (itemno : number) => void, dataEdit: (fnCode:number, index: number) => void}){
  const {itemno, imgsrc, itemname, itemdesc, category, type, price, discount, status} = data;
  let url;
  url = (imgsrc != null) ? URL.createObjectURL(imgsrc) : '/dummy-image.jpg';

  return(
    <div className="border-b-1 border-[rgba(0,0,0,0.1)] w-full flex px-5">
      <div className="w-1/40 flex items-center"><input type="checkbox" checked={ordered.length> 0 && ordered.includes(itemno)} onChange={() => changeSelectedItems(itemno)}/></div>

      <div className='w-1/4 flex justify-start gap-5 items-center px-5 py-2'>
        <Image src={url} className="w-1/3 h-fit" width={20} height={20} alt="not found"/>
        <div className="w-2/3">
          <p className="font-medium">{itemname}</p>
          <p className="text-gray-500 text-[15px]">{itemdesc}</p>
        </div>
      </div>

      <div className="w-3/20 flex items-center">
        <p className="w-9/10">{category}</p>
      </div>

      <div className="w-1/5 flex items-center px-5">
      {type === "Vegetarian" && <p className="w-fit rounded-[7.5px] text-[12.5px] bg-green-100 text-green-500 flex items-center"><FontAwesomeIcon icon={faLeaf} className="px-2"></FontAwesomeIcon>Vegetarian</p> }
      {type === "Non-Vegetarian" && <p className="w-fit rounded-[7.5px] text-[12.5px] bg-red-100 text-red-500 flex items-center"><FontAwesomeIcon icon={faDrumstickBite} className="px-2"></FontAwesomeIcon>Non-Vegetarian</p>}
      {type === "Jain" && <p className="w-fit rounded-[7.5px] text-[12.5px] bg-orange-100 text-orange-500 flex items-center"><FontAwesomeIcon icon={faCarrot} className="px-2"></FontAwesomeIcon>Jain</p>}
      {type === "Vegan" && <p className="w-fit rounded-[7.5px] text-[12.5px] bg-yellow-100 text-yellow-500 flex items-center"><FontAwesomeIcon icon={faSeedling} className="px-2"></FontAwesomeIcon>Vegan</p>}
      </div>

      <div className="w-3/40 text-[15px] flex items-center">
        <p>${price}</p>
      </div>

      <div className="w-1/10 text-[15px] flex items-center">
        <p className={`${discount > 0 ? "text-red-500" : ""}`}>${discount}</p>
      </div>

      <div className="w-1/4 flex justify-start gap-5 items-center">
      {(status.includes("Available")) ? <p className="h-fit text-green-500 bg-green-100 rounded-[10px] px-2 text-[15px]">Available</p> : ""}
      {(status.includes("Unavailable")) ? <p className="h-fit text-red-500 bg-red-100 rounded-[10px] px-2 text-[15px]">Unavailable</p> : ""}
      {(status.includes("Bestseller")) ? <p className="h-fit text-orange-500 bg-orange-100 rounded-[10px] px-2 text-[15px]">Bestseller</p> : ""}
      {(status.includes("Trending")) ? <p className="h-fit text-purple-500 bg-purple-100 rounded-[10px] px-2 text-[15px]">Trending</p> : ""}
      </div>
      
      <div className="w-1/10 flex items-center justify-start gap-5">
        <FontAwesomeIcon icon={faPenToSquare} className="text-blue-800 cursor-pointer"></FontAwesomeIcon>
        <FontAwesomeIcon icon={!status.includes("Unavailable")? faToggleOn : faToggleOff} className="text-gray-800 cursor-pointer" onClick={()=> dataEdit(1, itemno)}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faTrash} className="text-red-600 cursor-pointer" onClick={()=> dataEdit(2, itemno)}></FontAwesomeIcon>
      </div>
    </div>
  )
}