import React ,{useEffect, useState } from 'react';
import Message from '../components/message';

const HomePage = () => {
    const Username ='';
    const [name,setName] = useState('Aditya');
    const [age,setAge] = useState(0);
    
    useEffect(() => {
       setName('Aadi');
    
    }, [age])
    return (
    <>
    <div>
        {name}
    </div>

    <button onClick={() => setAge(age+1)}> 
        Click me

    </button>
    <div>
        {age}
    </div>
    <div>
        {Username}
    </div>
        <div className='justify-center items-center flex'>
            <div className="container">
                <h1 className='bg-black md:bg-blue-300 text-[#fff]'>hello</h1>
            </div>
        </div>
    </>
    );
    }

export default HomePage;