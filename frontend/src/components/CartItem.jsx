import { Icon } from "@iconify/react"

export default function CartItem (props) {
    return (
        <div className="border-gray-400 flex">
            <div className="flex">
                <img src={props.image} alt={props.name} />
                <div className="flex flex-col">
                    <h2 className="font-bold">{props.name}</h2>
                </div>
                <p><span className="text-orange">₦</span>{props.price}</p>
                <button>Add</button>
            </div>
            <button onClick={props.onDelete}>
                <Icon icon="ph:trash-bold"/>
            </button>
        </div>
    )
}