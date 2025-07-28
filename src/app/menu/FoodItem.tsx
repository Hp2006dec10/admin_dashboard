import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faLeaf, faPenToSquare, faToggleOn, faDrumstickBite, faCarrot, faSeedling, faToggleOff } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { fooditem } from "@/components/types/fooditem";

export default function FoodItem({data, selected, changeSelectedItems, dataEdit, confirmDelete} : {
    data: fooditem, 
    selected: string[], 
    changeSelectedItems: (id : string) => void, 
    dataEdit: (fnCode:number, id: string) => void, 
    confirmDelete: (id : string) => void
  }){
  if (data === undefined) return null;
  const {id, image_url, name, description, dish_type, diet, price, available, is_best_seller } = data;
  let url;
  //url = (imgsrc != null) ? URL.createObjectURL(imgsrc) : '/dummy-image.jpg';

  return(
    <div className="border-b-1 border-[rgba(0,0,0,0.1)] w-full flex px-5">
      <div className="w-1/40 flex items-center"><input type="checkbox" checked={selected.length> 0 && selected.includes(id)} onChange={() => changeSelectedItems(id)}/></div>
      <div className='w-1/4 flex justify-start gap-5 items-center px-5 py-2'>
        {/* <Image src={image_url} className="w-1/3 h-fit" width={20} height={20} alt="not found"/> */}
        <Image src='/dummy-image.jpg' className="w-1/3 h-fit" width={20} height={20} alt="not found"/>
        <div className="w-2/3">
          <p className="font-medium">{name}</p>
          <p className="text-gray-500 text-[15px]">{description}</p>
        </div>
      </div>

      <div className="w-3/20 flex items-center">
        <p className="w-9/10">{dish_type}</p>
      </div>

      <div className="w-1/5 flex items-center px-5">
      {diet === "Vegetarian" && <p className="w-fit rounded-[7.5px] text-[12.5px] bg-green-100 text-green-500 flex items-center"><FontAwesomeIcon icon={faLeaf} className="px-2"></FontAwesomeIcon>Vegetarian</p> }
      {diet === "Non-Vegetarian" && <p className="w-fit rounded-[7.5px] text-[12.5px] bg-red-100 text-red-500 flex items-center"><FontAwesomeIcon icon={faDrumstickBite} className="px-2"></FontAwesomeIcon>Non-Vegetarian</p>}
      {diet === "Jain" && <p className="w-fit rounded-[7.5px] text-[12.5px] bg-orange-100 text-orange-500 flex items-center"><FontAwesomeIcon icon={faCarrot} className="px-2"></FontAwesomeIcon>Jain</p>}
      {diet === "Vegan" && <p className="w-fit rounded-[7.5px] text-[12.5px] bg-yellow-100 text-yellow-500 flex items-center"><FontAwesomeIcon icon={faSeedling} className="px-2"></FontAwesomeIcon>Vegan</p>}
      </div>

      <div className="w-3/40 text-[15px] flex items-center">
        <p>${price}</p>
      </div>

      <div className="w-1/10 text-[15px] flex items-center">
        <p>0</p>
      </div>

      <div className="w-1/4 flex justify-start gap-5 items-center">
      {available ? 
        <p className="h-fit text-green-500 bg-green-100 rounded-[10px] px-2 text-[15px]">Available</p> :
        <p className="h-fit text-red-500 bg-red-100 rounded-[10px] px-2 text-[15px]">Unavailable</p>
      }
      {is_best_seller ? <p className="h-fit text-orange-500 bg-orange-100 rounded-[10px] px-2 text-[15px]">Bestseller</p> : ""}
      </div>

      <div className="w-1/10 flex items-center justify-start gap-5">
        <FontAwesomeIcon icon={faPenToSquare} className="text-blue-800 cursor-pointer" ></FontAwesomeIcon>
        <FontAwesomeIcon icon={available ? faToggleOn : faToggleOff} className="text-gray-800 cursor-pointer" onClick={()=> dataEdit(1, id)}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faTrash} className="text-red-600 cursor-pointer" onClick={()=> confirmDelete(id)}></FontAwesomeIcon>
      </div>
    </div>
  )
}