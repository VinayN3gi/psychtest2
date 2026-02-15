import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface DialogProps {
    isOpen: boolean 
} 

const DestructiveDialog = ({isOpen}:DialogProps) => {
  return (
    <div>DestructiveDialog</div>
  )
}

export default DestructiveDialog