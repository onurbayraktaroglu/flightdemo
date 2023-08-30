import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function ResultPage({ TravelerLength, totalPrice }) {
  console.log(TravelerLength)
  const totalPriceResult = totalPrice * TravelerLength
  return (
    <div className='result-wrapper'>
        <div className='container'>
            <h5><FontAwesomeIcon icon={faCircleCheck} />Kabin Seçiminiz Tamamlandi</h5>
            <div className="result-container">
                <h4>Toplam Tutar</h4>
                <p>TRY {totalPriceResult}</p>
            </div>
        </div>
    </div>
  );
}
