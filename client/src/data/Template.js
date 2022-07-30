import React from 'react'
import { FiHash, FiBook, FiShoppingBag } from 'react-icons/fi'

export const templateData = [
    {
        title : 'Dashboard',
        icon : <FiBook />,
        content : null
    },
    {
        title : 'Order',
        icon : <FiShoppingBag />,
        content : null
    },
    {
        title : 'Filter',
        icon : <FiHash />,
        content : [
            {
                category : 'Type',
                dropdown : [
                    'Kohaku',
                    'Shiro',
                    'Showa',
                    'Sanke',
                ]
            },
            {
                category : 'Size',
                dropdown : [
                    'Minions (< 25 cm)',
                    'Standard (25 - 40 cm)',
                    'Large (41 - 60 cm)',
                    'Jumbo (> 60 cm)',
                ] 
            },
            {
                category : 'Gender',
                dropdown : [
                    'Male',
                    'Female',
                ]
            },
            {
                category : 'Price',
                dropdown : [
                    '< IDR 1 mil',
                    '< IDR 5 mil',
                    '< IDR 10 mil',
                ]
            }
        ]
    }
]

export const biddingData = [
    {
        value : 50000,
        label : '50K',
    },
    {
        value : 100000,
        label : '100K',
    },
    {
        value : 500000,
        label : '500K',
    }
]

export const postProductData = [
    {
        title : 'Type',
        dropdown : [
            'Kohaku',
            'Shiro',
            'Showa',
            'Sanke',
        ]
    },
    {
        title : 'Gender',
        dropdown : [
            'Male',
            'Female',
            'Unknown',
        ]
    }
]