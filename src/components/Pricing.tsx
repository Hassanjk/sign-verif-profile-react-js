import React from 'react';
import { Check, Zap } from 'lucide-react';
import './Pricing.scss';

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    description: 'Perfect to get started',
    price: 0,
    features: ['Unlimited conversations', 'Real-time responses', 'Priority support'],
    buttonText: 'Get Started'
  },
  {
    name: 'Pro',
    description: 'For power users',
    price: 19,
    features: [
      'Unlimited conversations',
      'Real-time responses',
      'Priority support',
      'Advanced features',
      'Custom integrations'
    ],
    buttonText: 'Upgrade Now',
    isPopular: true
  },
  {
    name: 'Enterprise',
    description: 'For large teams',
    price: 99,
    features: [
      'Unlimited conversations',
      'Real-time responses',
      'Priority support',
      'Advanced features',
      'Custom integrations',
      'API access'
    ],
    buttonText: 'Contact Sales'
  }
];

const Pricing = () => {
  return (
    <div className="pricing">
      <div className="pricing__container">
        <div className="pricing__header">
          <h1>Simple, transparent pricing</h1>
          <p>Choose the perfect plan for your needs</p>
        </div>

        <div className="pricing__plans">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing__card ${plan.isPopular ? 'pricing__card--popular' : ''}`}
            >
              {plan.isPopular && (
                <div className="pricing__popular-badge">
                  <Zap size={16} />
                  POPULAR
                </div>
              )}
              
              <div className="pricing__card-header">
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div className="pricing__price">
                  <span>${plan.price}</span>
                  <span>/month</span>
                </div>
              </div>

              <ul className="pricing__features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={20} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="pricing__button">
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing__footer">
          <p>All plans include 24/7 support and a 30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;