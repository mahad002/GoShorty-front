import React from 'react';
import paymentMethodsIcon from '../assets/payment-methods.svg';

const PaymentMethods: React.FC = () => {
  return (
    <div className="flex justify-center">
      <img 
        src={paymentMethodsIcon}
        alt="Payment Methods" 
        className="w-full max-w-[280px] h-auto object-contain"
      />
    </div>
  );
};

export default PaymentMethods;
