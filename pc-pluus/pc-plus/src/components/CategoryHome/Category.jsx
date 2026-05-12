import React from 'react'
import './Category.css'
import CateHomeCarts from '../UI/CateHomeCarts'
import ramImg from '../../assets/ram.png'
import gpuImg from '../../assets/gpu.png'
import cpuImg from '../../assets/cpu.png'
import motherboardImg from '../../assets/motherboard.png'
import ssdImg from '../../assets/ssd-hdd.png'
import psuImg from '../../assets/power-suplly.png'
import monitorImg from '../../assets/monitor.png'
import casesImg from '../../assets/case.png'
import accessoriesImg from '../../assets/accessories.png'


const Category = () => {

    const categories = [
        { id: 1, title: 'CPU', img: cpuImg },
        { id: 2, title: 'GPU', img: gpuImg }, 
        { id: 3, title: 'Motherboard', img: motherboardImg },
        { id: 4, title: 'RAM', img: ramImg },
        { id: 5, title: 'SSD/HDD', img: ssdImg },
        { id: 6, title: 'Power Supply', img: psuImg },
        { id: 7, title: 'Monitor', img: monitorImg },
        { id: 8, title: 'Case', img: casesImg },
        { id: 9, title: 'Accessories', img: accessoriesImg },
    ];
    return (

        <div className='Category-container'>

            <h1 className='category-home-title'>Shop By Category</h1>

            <div className="category-home-carts">

                {
                    categories.map((item) => (

                        <CateHomeCarts key={item.id} hardawareImg={item.img} title={item.title}/>
                    ))
                }
            </div>

        </div>
    )
}

export default Category