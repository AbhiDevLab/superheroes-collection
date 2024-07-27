'use client'
import React, {useState, useEffect} from "react";
import { addDoc, doc, collection, deleteDoc, getDocs, onSnapshot, query, QuerySnapshot} from "firebase/firestore";
import { db } from  './firebase'
import { count } from "console";
import ImageOne from '@/public/superhero.jpg'
import Image from 'next/image'

export default function Home() {
  
  const [SuperheroNames, setSuperhero] = useState([
    // { name:'Iron-Man', age:'40', ability:'Powered Armor', race:'Human', country:'New York' },
    // { name:'Captain-America', age:'50', ability:'Shield', race:'Human', country:'United States' }
  ]);

  const [newHero, setnewHero] =  useState({name:'', age:'', ability:'', race:'', country:''})
  const [total, setTotal] = useState(0);

  // Add Superheroes to the database 

  const addHero = async (e) => {
    e.preventDefault();
    if(newHero.name !== '' && newHero.age !== '' && newHero.ability !== '' && newHero.race !== '' && newHero.country !== '')
          {
            // setSuperhero([...SuperheroNames, newHero]);
            await addDoc(collection(db, 'SuperheroNames'),{
              name: newHero.name.trim(),
              age: newHero.age,
              ability: newHero.ability,
              race: newHero.race,
              country: newHero.country
            });
            setnewHero({name:'', age:'', ability:'', race:'', country:''});
          }
  }

  // Read Superheroes from database

  useEffect(() => {
     const q = query(collection(db, 'SuperheroNames'));
     const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let HeroArr = []

      QuerySnapshot.forEach((doc) => {
        HeroArr.push({...doc.data(), id: doc.id})
      })
      setSuperhero(HeroArr); 
     });
  },[]);

  // Remove Superheroes from database 
  
  const removeHero = async (id) => {
    await deleteDoc(doc(db, 'SuperheroNames', id));
  }


  return (
    <div>
      <div className=" border-3 border-purple-600 bg-gradient-to-t from-[#76030f] to-[#121b67] dark:bg-gradient-to-t dark:from-[#ff1b6b] dark:to-[#45caff] w-full p-4 rounded-lg light:bg-slate-800">
      <Image src = {ImageOne} alt="SuperHeroes-img" className=" p-4 "/>
      <pre className=" font-bold font-serif p-6 text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#00ee6e] dark:to-[#0c75e6]">                                                                         Super-Heroes Collection</pre>
        <div className="flex items-center gap-6"> 
          <input value = {newHero.name} onChange = {(e) => setnewHero({...newHero, name: e.target.value})} className=" bg-white text-black rounded-lg w-[500px] p-2" placeholder="Enter Your Favourite SuperHero" type="text" />
          <input value = {newHero.age} onChange = {(e) => setnewHero({...newHero, age: e.target.value})} className=" bg-white text-black rounded-lg w-20 p-2" placeholder="Age" type="number" />
          <input value = {newHero.ability} onChange = {(e) => setnewHero({...newHero, ability: e.target.value})} className=" bg-white text-black rounded-lg w-50 p-2" placeholder="SuperHero's Ability" type="text" />
          <input value = {newHero.race} onChange = {(e) => setnewHero({...newHero, race: e.target.value})} className=" bg-white text-black rounded-lg w-50 p-2" placeholder="Race" type="text" />
          <input value = {newHero.country} onChange = {(e) => setnewHero({...newHero, country: e.target.value})} className=" bg-white text-black rounded-lg w-50 p-2" placeholder="Country of Origin" type="text" />
          <button type="submit" onClick={addHero} className=" bg-purple-900 text-white hover:bg-slate-800 transition p-2 rounded-lg w-28">+</button>
        </div>
        <div>
          {SuperheroNames.map((Superhero,id) =>(
            <div key={id} className=" my-4 w-full bg-purple-950 flex justify-between rounded-lg text-white">
              <div className=" flex justify-between w-full p-4 font-mono ">
                <span>{Superhero.name}</span>
                <span>{Superhero.age}</span>
                <span>{Superhero.ability}</span>
                <span>{Superhero.race}</span>
                <span>{Superhero.country}</span>
              </div>
              <button onClick = {() => removeHero(Superhero.id)} className=" p-4 hover:bg-slate-800 hover:rounded-lg border-l-2 border-slate-950 hover:scale-110 transition">X</button>
            </div>
          ))}
        </div>
        <div className=" ml-[400px] p-5">
          <a href="https://www.britannica.com/topic/list-of-superheroes-2024795" target="_m" className="   p-4 font-sans bg-green-600 hover:text-white dark:hover:text-black " >Tap to Know More About All Super-Heroes</a>
        </div>
      </div>
    </div>
  );
}
