import './TimeList.css'
import AlertDialogDelete from './AlertDialogDelete.jsx'
import { useState } from 'react'

export default function TimeList({ timeValues, setTimeValues }) {

    const [openApplyDialog, setOpenApplyDialog] = useState(false);
    const [timeToDelete, setTimeToDelete] = useState()

    const handleDeleteConfirmation = (timeValue) => {
        setTimeToDelete(timeValue)
        setOpenApplyDialog(true)
    }

    const handleDelete = () => {
        setTimeValues(timeValues.filter(t => t !== timeToDelete))
        setOpenApplyDialog(false)
    }

    const listItems = timeValues.map((timeValue) =>
        <div className={'timeItem'} onClick={() => handleDeleteConfirmation(timeValue)}
            key={timeValue}>{timeValue}</div>,
    )


    return (
        <div className={'timeListContainer'}>
            <AlertDialogDelete setOpen={setOpenApplyDialog} open={openApplyDialog} applyDelete={handleDelete} >

            </AlertDialogDelete>
            {timeValues.length !== 0
                ? <div className={'timeItems'}>{listItems}</div>
                : <></>
            }
        </div>
    )
}