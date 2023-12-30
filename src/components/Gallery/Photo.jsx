import PlaceholderPhoto from '../../assets/IMG_VGA_Q2.png';
import './Photo.css'
import { useNavigate } from 'react-router-dom'
export default function Photo( {data} ) {

const navigate = useNavigate()

    return (
        <>
            <div className={"photoContainer"}>
            <img width={300} className={"photo"} alt={""} src={"data:image/jpeg;base64," + data.image}
                 onClick={() => {
                     navigate(`/photos/${data.id}`,)
                 }}
            ></img>
                <div className={"photoDate"}>10/12/2023 19:20 UTC</div>
            </div>
        </>
    )
}