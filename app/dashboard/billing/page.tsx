'use client'
import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react';
import axio from 'axios';
import { Loader2Icon } from 'lucide-react';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';

// Define the plan type
interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
}

// Billing Page Component
const billing: React.FC = () => {

  const plans: Plan[] = [
    { id: 1, name: 'Basic', price: '$9.99/month', features: ['50,000 Words/Month', '80+ Content Templates', 'Unlimited Download and Copy', '3 Month of History'] },
    { id: 2, name: 'Standard', price: '$19.99/month', features: ['80,000 Words/Month', '100+ Content Templates', 'Unlimited Download and Copy', '6 Month of History'],},
    { id: 3, name: 'Premium', price: '$29.99/month', features: ['Unlimited Words/Month', '500+ Content Templates', 'Unlimited Download and Copy', '1 Year of History'], },
  ];

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const [loading, setLoading] = useState(false);
  const {user} = useUser();
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext)

  const CreateSubscription = ()=>{
    setLoading(true)
    axio.post('/api/create-subscription', {})
    .then(resp=>{
      OnPayment(resp.data.id);
    }, (error)=>{
      setLoading(false)
    })
  }

  const OnPayment = (subId:string)=>{
    const options={
      "key":process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id":subId,
      "name":'Picky AI Apps',
      "description":'Monthly Subscription',
      handler:async(resp:any)=>{
        if(resp){
          saveSubscription(resp?.razorpay_payment_id)
        }
        setLoading(false)
      }
    }
//@ts-ignore
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const saveSubscription= async(paymentId:string)=>{
    const result = await db.insert(UserSubscription)
    .values({
      email:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName,
      active:true,
      paymentId:paymentId,
      joinData:moment().format('DD/MM/YYYY')
    })

    if(result){
      window.location.reload();
    }
  }

  const handleUpgrade = () => {
    if (selectedPlan) {
      // Handle the upgrade process, e.g., API call to update the subscription
      alert(`Upgrading to ${selectedPlan.name}`);
    }
  };

  // Define the active plan
  const freePlan: Plan = {
    id: 0,
    name: 'Free Plan',
    price: 'Free',
    features: ['30,000 Words/Month', '50+ Content Templates', 'Unlimited Download and Copy', '1 Month of History'],
  };

  return (
    <div className='flex flex-col items-center p-6'>
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className='font-bold text-3xl mb-6'>
        <h1>Upgrade With Monthly Plan</h1>
      </div>
      {/* Display the currently active plan */}
      <div className="p-6 bg-primary border shadow-lg rounded-lg mb-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-2 text-yellow-400">{!userSubscription?'Current Active Plan':'Have a Subsciption!'}</h3>
        <p className="text-2xl font-bold mb-4">{freePlan.name}</p>
        <ul className="list-disc pl-5 space-y-1">
          {freePlan.features.map((feature, index) => (
            <li key={index} className="text-white">{feature}</li>
          ))}
        </ul>
      </div>

      {/* Monthly Plans Section */}
      <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Available Monthly Plans</h2>
      <div className="flex space-x-4 mb-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 border bg-white rounded-lg cursor-pointer transition-transform transform ${selectedPlan?.id === plan.id ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-300'} hover:border-blue-400`}
            onClick={() => handlePlanSelect(plan)}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="list-disc pl-5 space-y-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-black">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Button
        className={`gap-2 items-center w-full py-3 text-white font-semibold rounded-lg transition-colors ${selectedPlan ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
        onClick={()=>CreateSubscription()}
        disabled={!selectedPlan || loading}
      >
       {loading&&<Loader2Icon className='animate-spin'/>} Upgrade to {selectedPlan ? selectedPlan.name : 'Select a Plan'}
      </Button>
    </div>
    </div>
  ); 
}

export default billing;
