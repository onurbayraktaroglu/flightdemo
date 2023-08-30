import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPerson, faPlane, faPlaneArrival, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import DataList from '../../src/defaultFlights.json';
import NewDataList from '../../src/flights.json';
import { Modal, Button } from 'react-bootstrap';

export default function SearchPage({ setListPage, Counter, endFlyName ,startFlyName }) {
  //DatePicker
  const [startDate, setStartDate] = useState(new Date());
  //Uçuş listeleme Popup
  const [startFly, setStartFly] = useState(false);
  const [endFly, setEndFly] = useState(false);
  const [selectTraveler, setSelectTraveler] = useState(false);

  //Uçuş Value
  const [startVal, setStartVal] = useState("");
  const [endVal, setEndVal] = useState("");

  const [count, setCount] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleIncrement = () => {
    setCount(count + 1);
    Counter(count + 1)
  };

  const handleDecrement = () => {
    if (count > 0) {
        setCount(count - 1);
        Counter(count - 1)
    }
  };
  function selectStartDate(e) {
    const startDateVal = document.getElementById("checkin_input")
    startDateVal.setAttribute("value", `${e.target.outerText}`);
    setStartFly(false)
    setStartVal(e.target.outerText)
    startFlyName(e.target.outerText)
  }
  function selectEndDate(e) {
    const endDateVal = document.getElementById("checkout_input")
    endDateVal.setAttribute("value", `${e.target.outerText}`);
    setEndFly(false)
    setEndVal(e.target.outerText);
    endFlyName(e.target.outerText);
  }

  function handleSearchFromWhere(e) {
    setStartFly(true)
  }
  
  function handleSearchToWhere(e) {
    setEndFly(true);
  }
  function handleSearchTraveler(e) {
    setSelectTraveler(true);
  }

  function searchFly(e) {
    NewDataList.flights.forEach(function(fly) {
      if(startVal == fly.originAirport.name && endVal == fly.destinationAirport.name ){
        setListPage(true);
      } else {
        setListPage(false);
        handleShow()
      }
    });
  }
  return (
    <><div className='ticket-buy-wrapper'>
      <div className='container'>
        <div className='row input-group'>
          <div className='col-md-3 form-checkin-input'>
            <FontAwesomeIcon icon={faPlane} />
            <input type="text" id="checkin_input" className="form-control" placeholder="Nereden" aria-label="Username" aria-describedby="basic-addon1" onClick={handleSearchFromWhere} />
            {startFly == true &&
              <div className="plane-list">
                {DataList.flights.map((item) => (
                  <span key={item.id} onClick={selectStartDate}>{item.originAirport.name}</span>
                ))}
              </div>}
          </div>
          <div className='col-md-3 form-checkin-input'>
            <FontAwesomeIcon icon={faPlaneArrival} />
            <input type="text" id="checkout_input" className="form-control" placeholder="Nereye" aria-label="Username" aria-describedby="basic-addon1" onClick={handleSearchToWhere} />
            {endFly == true &&
              <div className="plane-list">
                {DataList.flights.map((item) => (
                  <span key={item.id} onClick={selectEndDate}>{item.destinationAirport.name}</span>
                ))}
              </div>}
          </div>
          <div className='col-md-6'>
            <div className="row input-group">
              <div className="col-6 col-md-6">
                <FontAwesomeIcon icon={faCalendarDays} className="date-input" />
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control" />
              </div>
              <div className="col-6 col-md-4">
                <div className="ticket-buy-traveler" onClick={handleSearchTraveler}>
                  <FontAwesomeIcon icon={faPerson} />
                  <span>{count}</span>
                  {selectTraveler == true &&
                    <div className="traveler-list">
                      <span>Kabin ve Yolcu Seçimi</span>
                      <div className="traveler-list-container">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="options"
                            value="option1" />
                          <label className="form-check-label">Economy Class</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="options"
                            value="option2" />
                          <label className="form-check-label">Business Class</label>
                        </div>
                      </div>
                      <div className="traveler-list-bottom">
                        <span>Yolcu</span>
                        <div className="traveler-list-bottom-count">
                          <button className="btn btn-light border" onClick={handleDecrement}> - </button>
                          <span>{count}</span>
                          <button className="btn btn-light border" onClick={handleIncrement}> + </button>
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
              <div className="col-md-2" style={{ padding: '0' }}>
                <div className="ticket-buy-button" onClick={searchFly}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aradğınız Uçuş bulunamadı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>İstanbul - Antalya Uçuşlarını deneyebilirsiniz.</p>
        </Modal.Body>
      </Modal></>
  );
}
