const ConfimationPopup = ({onConfirm, onCancel} : {onConfirm : () => void ,  onCancel : () => void}) => {
    return (
        <div className="z-30 bg-white w-1/4 h-1/4 rounded-[10px]">
            <div className="flex items-center w-full justify-center h-3/4 text-2xl">Are you sure want to delete?</div>
            <div className="flex justify-evenly w-full h-1/4">
                <button className="flex-1 bg-red-600 text-white cursor-pointer" onClick={onConfirm}>Yes</button>
                <button className="flex-1 bg-blue-500 text-white cursor-pointer" onClick={onCancel}>Cancel</button>
            </div>
            
        </div>
    )
}

export default ConfimationPopup;