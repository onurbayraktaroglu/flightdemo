import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

import SearchPage from '../src/components/SearchPage';
import ListPage from '../src/components/ListPage';
import ResultPage from "./components/ResultPage";


export default function App() {
  const [searchPage, setSearchPage] = useState(true);
  const [flyListPage, setFlyListPage] = useState(false);
  const [newCount, setnewCount] = useState(1);
  const [startName, setStartName] = useState("");
  const [endName, setEndName] = useState("");
  const [checkInResult, setCheckInResult] = useState(false);
  const [price, setPrice] = useState("");
  
  return (
    <div className="App">
      <header className="App-header">
        <p>flightcheck</p>
      </header>
      {searchPage && !flyListPage && 
        <SearchPage Counter={setnewCount} setListPage={setFlyListPage} startFlyName={setStartName} endFlyName={setEndName}/>
      }
      {flyListPage && !checkInResult &&
        <ListPage checkInDetail={setCheckInResult} setTotalPrice={setPrice} TravelerLength={newCount} TravelStart={startName} TravelEnd={endName} />
      }
      {checkInResult &&
        <ResultPage totalPrice={price} TravelerLength={newCount}/>
      }
    </div>
  );
}
