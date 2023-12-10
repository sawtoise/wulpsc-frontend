import './TimeList.css'

export default function TimeList({ timeValues, setTimeValues }) {

    const handleDelete = (timeValue) => {
        window.confirm('Delete?') ? setTimeValues(timeValues.filter(t => t.time !== timeValue.time)) : console.log()
    }

    const listItems = timeValues.map((timeValue) =>
        <li className={'timeItem'} onClick={() => handleDelete(timeValue)}
            key={timeValue.id}>{timeValue.time}</li>,
    )


    return (
        <div className={'timeListContainer'}>
            {timeValues.length !== 0
                ? <ul className={'timeItems'}>{listItems}</ul>
                : <></>
            }
        </div>
    )
}