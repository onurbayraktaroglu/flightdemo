import React, { useState, useEffect, useRef  } from "react";
import FlightsLlist from '../../src/flights.json';

export default function ListPage({ TravelerLength, TravelStart, TravelEnd, checkInDetail, setTotalPrice }) {
  const [economyActive, setEconomyActive] = useState(false);
  const [businessActive, setBusinessActive] = useState(false);
  const [elementPrice, setElementPrice] = useState();
  const [promotionCodeActive, setPromotionCodeActive] = useState();
  const [dataFlight, setDataFlight] = useState(FlightsLlist.flights)
  const [sortAsc, setSortAsc] = useState(true);
  const [sortAscFlight, setSortAscFlight] = useState(true);
  const [activePriceSort, setActivePriceSort] = useState(false);
  const [activeFlightSort, setActiveFlightSort] = useState(false);

  const targetRef = useRef(null);
  
  const handleSortPrice = () => {
    setActivePriceSort(!activePriceSort);
    setSortAsc(!sortAsc);
    setDataFlight([...dataFlight].sort((a, b) => (sortAsc ? a.fareCategories.ECONOMY.subcategories[0].price.amount - b.fareCategories.ECONOMY.subcategories[0].price.amount : b.fareCategories.ECONOMY.subcategories[0].price.amount - a.fareCategories.ECONOMY.subcategories[0].price.amount)));
  };

  const handleSortFlight = (e) => {
    setActiveFlightSort(!activeFlightSort);
    setSortAscFlight(!sortAscFlight);
    setDataFlight([...dataFlight].sort((a, b) => (sortAscFlight ? a.arrivalDateTimeDisplay.replace(/:/g, "") - b.arrivalDateTimeDisplay.replace(/:/g, "") : b.arrivalDateTimeDisplay.replace(/:/g, "") - a.arrivalDateTimeDisplay.replace(/:/g, ""))));
  };

  function flyEconomy(e) {
    const flyDetailBig = document.querySelectorAll(".fly-list-container-box .fly-detail-big")
    const dataGetAttr = e.currentTarget.getAttribute("data-attr");
    const dateGetAttrId = document.getElementById(dataGetAttr);
    const thisTarget = e.currentTarget;
    const selectRadio = thisTarget.querySelector(".fly_economy_radio");

    selectRadio.checked = true;

    flyDetailBig.forEach(function(fly) {
        fly.classList.remove("active");
    });
    
    setBusinessActive(false);
    setEconomyActive(true);
    dateGetAttrId.classList.add("active");
  }

  function flyBusiness(e) {
    const flyDetailBig = document.querySelectorAll(".fly-list-container-box .fly-detail-big")
    const dataGetAttr = e.currentTarget.getAttribute("data-attr");
    const dateGetAttrId = document.getElementById(dataGetAttr)
    const thisTarget = e.currentTarget;
    const selectRadio = thisTarget.querySelector(".fly_business_radio");

    selectRadio.checked = true;

    flyDetailBig.forEach(function(fly) {
        fly.classList.remove("active");
    });
    setEconomyActive(false);
    setBusinessActive(true);
    dateGetAttrId.classList.add("active");
  }
  
  function selectFlight(e) {
    checkInDetail(true);
    const closestDiv = e.target.closest('.card-option');
    const selectTopPrice = closestDiv.querySelector('.fly-detail-card-top .card-price-amo');
    const topPrice = selectTopPrice.innerText;

    setTotalPrice(topPrice);
    setElementPrice(topPrice);
  }

  const onchangeFlexSwitch = (e) => {
    setPromotionCodeActive(e.target.checked);
    if(e.target.checked) {
        localStorage.setItem('promotionCodeActive', true);
        return
    }
    localStorage.removeItem('promotionCodeActive');
  }

  //Local Storage Add Promotion Code
   useEffect(() => {
     const storedCount = localStorage.getItem('promotionCodeActive');
     if (storedCount) {
       setPromotionCodeActive(true);
     } else {
       setPromotionCodeActive(false);
     }
   }, []);

  
  return (
    <div className='fly-list-wrapper'>
        <div className='container'>
            <h5>{TravelStart} - {TravelEnd}, {TravelerLength} Yolcu </h5>
            <div className="promotion-code">
                <span>Promosyon Kodu</span>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={onchangeFlexSwitch} checked={promotionCodeActive} />
                </div>
                
            </div>
            <p style={{ fontSize: '14px', fontWeight: '500' }}>Promosyon kodu secenegi ile tum ekonomy kabini Eco fly paketlerini %50 indirimle satın alabilirsiniz.</p>
            <p style={{ fontSize: '14px', fontWeight: '500' }}>Promosyon kodu secenegi aktifken Eco fly paketi haricinde secim yapamazsınız.</p>
            <div className="fly-list-container">
                <div className="fly-list-container-filter">
                    <span>Sıralama Kriteri</span>
                    <button className={activePriceSort ? 'active btn btn-light border': 'btn btn-light border'} onClick={handleSortPrice}>Ekonomi Ücreti</button>
                    <button className={activeFlightSort ? 'active btn btn-light border': 'btn btn-light border'} onClick={handleSortFlight}>Kalkış Saati</button>
                </div>
                <div className="fly-list-container-box">
                    {dataFlight.map((item, index) => (
                    <div className="fly-list-box row" data-earlytime={item.arrivalDateTimeDisplay} data-price={item.fareCategories.ECONOMY.subcategories[0].price.amount} key={index}>
                        <div className="col-md-6" >
                            <div className="fly-detail container">
                                <div className="row" style={{ width: '100%', alignItems: 'center' }}>
                                    <div className="col-md-9">
                                        <div className="fly-time-box">
                                            <span>{item.arrivalDateTimeDisplay}</span>
                                            <span>{item.originAirport.city.code}</span>
                                            <span>{item.originAirport.city.name}</span>
                                        </div>
                                        <div className="fly-time-box">
                                            <span>{item.departureDateTimeDisplay}</span>
                                            <span>{item.destinationAirport.city.code}</span>
                                            <span>{item.destinationAirport.city.name}</span>
                                        </div>
                                        <div className="fly-time-bg"></div>
                                    </div>
                                    <div className="col-md-3" style={{ textAlign: 'center' }}>
                                        <span>Uçuş süresi</span>
                                        <p style={{ marginBottom: '0px', fontWeight: '600' }}>1s 30d</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="fly-economy" onClick={flyEconomy} data-attr={`box-${index}`}>
                                <div style={{ zIndex: '1' }}>
                                    <input
                                        className="form-check-input fly_economy_radio"
                                        type="radio"
                                        name="options"
                                        value="option1"
                                        //checked={selectedOption === 'option1'}
                                        //onChange={handleOptionChange}
                                        />
                                        <label className="form-check-label">Economy</label>
                                </div>
                                <div style={{ zIndex: '1' }}>
                                    <span>Yolcu Başına</span>
                                    {!promotionCodeActive &&  
                                        <p>{item.fareCategories.ECONOMY.subcategories[0].price.currency} {item.fareCategories.ECONOMY.subcategories[0].price.amount}</p>
                                    }
                                    {promotionCodeActive &&  
                                        <p>{item.fareCategories.ECONOMY.subcategories[0].price.currency} {item.fareCategories.ECONOMY.subcategories[0].price.amount/2}</p>
                                    }
                                    
                                </div>
                                <div className="triangle-up"></div>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="fly-business" onClick={flyBusiness} data-attr={`boxx-${index}`}>
                                <div>
                                    <input
                                        className="form-check-input fly_business_radio"
                                        type="radio"
                                        name="options"
                                        value="option1"
                                        //checked={selectedOption === 'option1'}
                                        //onChange={handleOptionChange}
                                        />
                                        <label className="form-check-label">Business</label>
                                    </div>
                                    <div className="">
                                        <span>Yolcu Başına</span>
                                        {!promotionCodeActive &&  
                                        <p>{item.fareCategories.BUSINESS.subcategories[0].price.currency} {item.fareCategories.BUSINESS.subcategories[0].price.amount}</p>
                                        }
                                        {promotionCodeActive &&  
                                            <p>{item.fareCategories.BUSINESS.subcategories[0].price.currency} {item.fareCategories.BUSINESS.subcategories[0].price.amount/2}</p>
                                        }
                                        
                                    </div>
                            </div>
                        </div>
                            <div className="col-md-12 fly-detail-big" id={`box-${index}`}>
                                <div className="container">
                                    <div className="row">
                                        <div className="fly-detail-big-box">

                                            {item.fareCategories.ECONOMY.subcategories.map((card, index) => (
                                                <div className={`col-md-4 card-option card-box-${index}`} key={index}>
                                                    <div ref={targetRef} className="fly-detail-card">
                                                        <div className="fly-detail-card-top">
                                                            <h5>{card.brandCode}</h5>
                                                            {index === 0 && 
                                                                <p><span className="card-price-cur">{card.price.currency}</span> {promotionCodeActive && <span className="card-price-amo">{card.price.amount / 2}</span>}{!promotionCodeActive && <span className="card-price-amo">{card.price.amount}</span>}</p>
                                                            }
                                                            {index > 0 && 
                                                                <p><span className="card-price-cur">{card.price.currency}</span> <span className="card-price-amo">{card.price.amount}</span></p>
                                                            }
                                                        </div>
                                                        <div className="fly-detail-card-mid">
                                                            {card?.rights[0] && 
                                                                <p>{card.rights[0]}</p>
                                                            }
                                                            {card?.rights[1] && 
                                                                <p>{card.rights[1]}</p>
                                                            }
                                                            {card?.rights[2] && 
                                                                <p>{card.rights[2]}</p>
                                                            }
                                                        </div>
                                                        <div className="fly-detail-card-bot">
                                                            {index === 0 && 
                                                                <button className={promotionCodeActive ? 'btn btn-danger' : 'btn btn-danger'} onClick={selectFlight}>Uçuşu seç</button>
                                                            }
                                                            {index > 0 && 
                                                                <button className={promotionCodeActive ? 'disabled btn btn-danger' : 'btn btn-danger'} onClick={selectFlight}>Uçuşu seç</button>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="col-md-12 fly-detail-big" id={`boxx-${index}`}>
                                <div className="container">
                                    <div className="row">
                                        <div className="fly-detail-big-box">
    
                                            {item.fareCategories.BUSINESS.subcategories.map((card, index) => (
                                                <div className={`col-md-4 card-option card-box-${index}`} key={index}>
                                                    <div ref={targetRef} className="fly-detail-card">
                                                        <div className="fly-detail-card-top">
                                                            <h5>{card.brandCode}</h5>
                                                            {index === 0 && 
                                                                <p><span className="card-price-cur">{card.price.currency}</span> {promotionCodeActive && <span className="card-price-amo">{card.price.amount / 2}</span>}{!promotionCodeActive && <span className="card-price-amo">{card.price.amount}</span>}</p>
                                                            }
                                                            {index > 0 && 
                                                                <p><span className="card-price-cur">{card.price.currency}</span> <span className="card-price-amo">{card.price.amount}</span></p>
                                                            }
                                                        </div>
                                                        <div className="fly-detail-card-mid">
                                                            {card?.rights[0] && 
                                                                <p>{card.rights[0]}</p>
                                                            }
                                                            {card?.rights[1] && 
                                                                <p>{card.rights[1]}</p>
                                                            }
                                                            {card?.rights[2] && 
                                                                <p>{card.rights[2]}</p>
                                                            }
                                                        </div>
                                                        <div className="fly-detail-card-bot">
                                                            {index === 0 && 
                                                                <button className={promotionCodeActive ? 'btn btn-danger' : 'btn btn-danger'} onClick={selectFlight}>Uçuşu seç</button>
                                                            }
                                                            {index > 0 && 
                                                                <button className={promotionCodeActive ? 'disabled btn btn-danger' : 'btn btn-danger'} onClick={selectFlight}>Uçuşu seç</button>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                        
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
