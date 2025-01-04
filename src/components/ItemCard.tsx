'use client'


import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from './ui/card'

interface ItemProps {
    id: number
    name: string
    description: string
}

const ItemCard: React.FC = () => {

    const [item, setItem] = useState<ItemProps[]>([])

    const fetchItem = async () => {
        try {
            const response = await fetch("/api/")
            const result = await response.json()
            setItem(result)
            console.log(result)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchItem()
    }, [])

  return (
    <div>
        {item.map((index) => (
            <Card key={index.id}>
                <CardContent className="flex items-center justify-center">
                    <CardTitle>
                        {index.name}
                    </CardTitle>
                </CardContent>
            </Card>
        ))}
    </div>
  )
}

export default ItemCard
